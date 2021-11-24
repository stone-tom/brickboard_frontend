import { format } from 'date-fns';
import Image from 'next/image';
import React from 'react';
import IBadge from '../../../../models/IBadge';
import IUser from '../../../../models/IUser';
import IUserDetail from '../../../../models/IUserDetail';
import { backendURL } from '../../../../util/api';
import Badge from '../../../profile/components/Badge/Badge';
import {
  MemberFact,
  MemberName,
  MemberShipDate,
  NewestMemberContent,
  NewMemberBody,
  NewMemberContentContainer,
  NewMemberHeading,
  NewMemberProfileImage,
} from './NewMemberSectionWide.styles';

interface NewMemberProps {
  member: IUser,
  memberdetails?: IUserDetail,
  badge: IBadge,
}

const NewMemberSection = ({ member, memberdetails, badge }: NewMemberProps) => (
  <NewMemberContentContainer>
    <NewestMemberContent>
      <NewMemberProfileImage>
        <Image
          src={member.attributes.avatar ? `${backendURL}${member.attributes.avatar}` : '/assets/images/default_profile.svg'}
          objectFit="cover"
          layout="fill"
        />
      </NewMemberProfileImage>
      <NewMemberBody>
        <NewMemberHeading>Neuestes Mitglied</NewMemberHeading>
        <div>
          <MemberName>
            {member.attributes.display_name}
          </MemberName>
          <MemberShipDate>
            Mitglied seit:&nbsp;
            {format(new Date(member.attributes.created_at), 'dd.MM.yyyy')}
          </MemberShipDate>
          {memberdetails && (
            <>
              {memberdetails.attributes.profile_description && (
                <MemberFact>
                  {memberdetails.attributes.profile_description}
                </MemberFact>
              )}
              {memberdetails.attributes.location && (
                <MemberFact>
                  <strong>Aus: </strong>
                  {memberdetails.attributes.location}
                </MemberFact>
              )}
              {memberdetails.attributes.occupation && (
                <MemberFact>
                  <strong>Beschäftigung: </strong>
                  {memberdetails.attributes.occupation}
                </MemberFact>
              )}
            </>
          )}
        </div>
        <Badge small badge={badge} />
      </NewMemberBody>
    </NewestMemberContent>
  </NewMemberContentContainer>
);

export default NewMemberSection;
