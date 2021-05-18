import React, { useEffect, useState } from 'react';
import useSWR from 'swr';
import { useStoreDispatch } from '../../../../context/custom_store';
import { MessageType } from '../../../../models/IMessage';
import { backendURL } from '../../../../util/api';
import updateGlobalPreferences from '../../../../util/api/user/update-global-preferences';
import { get } from '../../../../util/methods';
import SwitchComponent from '../../../core/components/Switch/Switch';
import Prompt from '../../../core/container/Prompt/Prompt';
import { PersonalInformationWrapper } from '../PersonalInformation/PersonalInformation.styles';
import {
  SettingsWrapper,
} from './Settings.styles';

const Settings = () => {
  const { addComponent, setMessage } = useStoreDispatch();
  const [checked, setChecked] = useState<boolean>();
  const { data } = useSWR(`${backendURL}/preferences`, get);

  useEffect(() => {
    if (data && data.data) setChecked(data.data.attributes.auto_follow_topics);
  }, [data]);

  const handleGlobalPreferencesChange = async (newChecked: boolean, preference: 'auto_follow_topics' | 'follow_topics_on_mention') => {
    addComponent((
      <Prompt
        headline={`Email-Benauchrichtigungen ${checked ? 'deaktivieren' : 'aktivieren'}?`}
        acceptText={`${checked ? 'Deaktivieren' : 'Aktivieren'}`}
        onAccept={async () => {
          try {
            const { content } = await updateGlobalPreferences(newChecked, preference);
            if (content) {
              setChecked(newChecked);
              setMessage({
                content: 'Email-Benachrichtigungen erfolgreich geändert',
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
          <p>{`Wollen Sie die Email-Benachrichtigungen wirklich ${checked ? 'deaktivieren' : 'aktivieren'}?`}</p>
        </div>
      </Prompt>));
  };

  return (
    <PersonalInformationWrapper>
      <SettingsWrapper>
        <SwitchComponent
          checked={checked}
          onChange={(newValue) => handleGlobalPreferencesChange(newValue, 'auto_follow_topics')}
        >
          Email-Benachrichtigungen für Themen
        </SwitchComponent>
      </SettingsWrapper>
    </PersonalInformationWrapper>

  );
};

export default Settings;
