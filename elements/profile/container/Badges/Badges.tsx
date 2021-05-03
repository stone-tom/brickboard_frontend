import React from 'react';
import useSWR from 'swr';
import { useStoreDispatch, useStoreState } from '../../../../context/custom_store';
import IBadge from '../../../../models/IBadge';
import { MessageType } from '../../../../models/IMessage';
import { backendURL } from '../../../../util/api';
import chooseMainBadge from '../../../../util/api/user/choose-main-badge';
import { get } from '../../../../util/methods';
import LoaderComponent from '../../../core/components/Loader/Loader';
import Prompt from '../../../core/container/Prompt/Prompt';
import Badge from '../../components/Badge/Badge';
import {
  BadgesWrapper,
} from './Badges.styles';

const Badges = () => {
  const { data } = useSWR(`${backendURL}/badges`, get);
  const { addComponent, setMessage, updateMainBadge } = useStoreDispatch();
  const { user } = useStoreState();

  const handleSetMainBadge = async (badgeId: string) => {
    addComponent((
      <Prompt
        headline="Badge auswählen?"
        onAccept={async () => {
          try {
            const { content } = await chooseMainBadge(badgeId);
            if (content) {
              updateMainBadge(content.data.id);
              setMessage({
                content: 'Anzeigebadge erfolgreich geändert',
                type: MessageType.success,
              });
            }
          } catch (e) {
            setMessage({
              content: 'Es ist ein Fehler aufgetreten',
              type: MessageType.error,
            });
          }
        }}
      >
        <div>
          <p>Wollen Sie dieses Badge wirklich als Anzeigebadge verwenden?</p>
        </div>
      </Prompt>));
  };
  return (
    <LoaderComponent isLoading={!data}>
      {data && (
        <BadgesWrapper>
          {data.data.map((badge: IBadge) => (
            <Badge
              onClick={() => handleSetMainBadge(badge.id)}
              key={badge.id}
              badge={badge}
              active={user.relationships.thredded_main_badge.data
                && user.relationships.thredded_main_badge.data.id === badge.id}
              unowned={badge.relationships.users.data.some((owner) => owner.id === user.id)}
            />
          ))}
        </BadgesWrapper>
      )}
    </LoaderComponent>
  );
};

export default Badges;
