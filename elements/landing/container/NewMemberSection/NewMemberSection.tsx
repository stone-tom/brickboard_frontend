import { format } from 'date-fns';
import Image from 'next/image';
import Link from 'next/link';
import React from 'react';
import IUser from '../../../../models/IUser';
import IUserDetail from '../../../../models/IUserDetail';
import { FlexLeft } from '../../../../styles/global.styles';
import { backendURL } from '../../../../util/api';
import { ProfileAsideHeading } from '../../../forum/components/ProfileAside/ProfileAside.style';
import {
  MemberFact,
  NewestMemberContent,
  NewMemberBody,
  NewMemberContentContainer,
  NewMemberHeading,
  NewMemberInfos,
  NewMemberLeftHalf,
  NewMemberProfile,
  NewMemberWrapper,
} from './NewMemberSection.styles';

interface NewMemberProps {
  member: IUser;
  memberdetails?: IUserDetail;
}

const NewMemberSection = ({ member, memberdetails }: NewMemberProps) => (
  <NewMemberWrapper>
    <NewMemberContentContainer>
      <NewMemberLeftHalf />
      <NewestMemberContent>
        <FlexLeft>
          <NewMemberHeading>Neuestes Mitglied</NewMemberHeading>
        </FlexLeft>
        <NewMemberBody>
          <NewMemberProfile>
            <Image
              src={member.attributes.avatar ? `${backendURL}${member.attributes.avatar}` : '/assets/images/default_profile.svg'}
              height="300"
              width="300"
            />
            <Link href={`/profil/${member.id}`} passHref>
              <ProfileAsideHeading>
                {member.attributes.display_name}
              </ProfileAsideHeading>
            </Link>
          </NewMemberProfile>
          <NewMemberInfos>
            <MemberFact>
              <strong>Mitglied seit: </strong>
              {format(new Date(member.attributes.created_at), 'dd.MM.yyyy')}
            </MemberFact>
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
          </NewMemberInfos>
        </NewMemberBody>
      </NewestMemberContent>
    </NewMemberContentContainer>

  </NewMemberWrapper>
);

export default NewMemberSection;