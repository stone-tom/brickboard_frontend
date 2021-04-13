import React from 'react';
import IUser from '../../../../models/IUser';
import IUserDetail from '../../../../models/IUserDetail';
import findObject from '../../../../util/finder';
import CallToActionBox from '../../components/CallToActionBox/CallToActionBox';
import UserShowCase from '../../components/UserShowCase/UserShowCase';
import { EventCalendarHeading } from '../EventCalendar/EventCalendar.styles';
import {
  CommunityHeadingWrapper,
  CommunitySectionContainer,
  CommunitySectionWrapper,
  UserShowCaseBody,
} from './CommunitySection.styles';

interface CommunitySectionProps {
  users: IUser[];
  userDetails: IUserDetail[];
}

const CommunitySection = ({ users, userDetails }: CommunitySectionProps) => {
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
            <EventCalendarHeading>
              Kennst du schon?
            </EventCalendarHeading>
          </CommunityHeadingWrapper>
          {users.length > 0 && (
            <>
              {users.map((user) => (
                <UserShowCase key={`user_${user.id}`} user={user} userDetails={findUserDetail(user)} />
              ))}
            </>
          )}
        </UserShowCaseBody>
        <CallToActionBox />
      </CommunitySectionContainer>
    </CommunitySectionWrapper>
  );
};

export default CommunitySection;
