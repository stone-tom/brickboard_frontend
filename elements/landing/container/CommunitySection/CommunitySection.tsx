import React from 'react';
import IBadge from '../../../../models/IBadge';
import IUser from '../../../../models/IUser';
import IUserDetail from '../../../../models/IUserDetail';
import findObject from '../../../../util/finder';
import UserShowCase from '../../components/UserShowCase/UserShowCase';
import { VideoShowCaseHeading } from '../VideoShowcase/VideoShowcase.styles';
import {
  CommunityHeadingWrapper,
  CommunitySectionContainer,
  CommunitySectionWrapper,
  SubText,
  UserShowCaseBody,
} from './CommunitySection.styles';

interface CommunitySectionProps {
  users: IUser[],
  userDetails: IUserDetail[],
  badges: IBadge[],
}

const CommunitySection = ({ users, userDetails, badges }: CommunitySectionProps) => {
  const findUserDetail = (user: IUser) => {
    if (user.relationships.thredded_user_detail.data) {
      findObject(userDetails, user.relationships.thredded_user_detail.data.id);
    }
    return null;
  };

  return (
    <CommunitySectionWrapper>
      <CommunitySectionContainer>
        <UserShowCaseBody>
          <CommunityHeadingWrapper>
            <VideoShowCaseHeading>
              Kennst du schon?
            </VideoShowCaseHeading>
            <SubText>
              {`Hier sind immer verschiedene Mitglieder unserer Community gelistet. 
              Kennst du sie schon alle? Schau doch am besten auf ihren Profilen vorbei!`}
            </SubText>
          </CommunityHeadingWrapper>
          {users.length > 0 && (
            <>
              {users.map((user) => {
                let badge = null;
                if (user.relationships.thredded_main_badge.data) {
                  badge = findObject(badges, user.relationships.thredded_main_badge.data.id);
                }
                return (
                  <UserShowCase key={`user_${user.id}`} user={user} badge={badge} userDetails={findUserDetail(user)} />
                );
              })}
            </>
          )}
        </UserShowCaseBody>
      </CommunitySectionContainer>
    </CommunitySectionWrapper>
  );
};

export default CommunitySection;
