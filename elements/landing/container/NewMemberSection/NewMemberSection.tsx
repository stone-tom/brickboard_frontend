import { format } from 'date-fns';
import Image from 'next/image';
import Link from 'next/link';
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
  NewMemberInfos,
  NewMemberProfile,
  NewMemberWrapper,
} from './NewMemberSection.styles';

interface NewMemberProps {
  member: IUser,
  memberdetails?: IUserDetail,
  badge: IBadge,
}

const NewMemberSectionWide = ({ member, memberdetails, badge }: NewMemberProps) => (
  <NewMemberWrapper>
    <NewMemberContentContainer>
      <Link href={`/profil/${member.id}`} passHref>
        <NewestMemberContent>
          <NewMemberHeading>Neuestes Mitglied</NewMemberHeading>
          <NewMemberBody>
            <NewMemberProfile>
              <Image
                src={member.attributes.avatar ? `${backendURL}${member.attributes.avatar}` : '/assets/images/default_profile.svg'}
                width="200px"
                height="200px"
              />
            </NewMemberProfile>
            <NewMemberInfos>
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
            </NewMemberInfos>
          </NewMemberBody>
        </NewestMemberContent>
      </Link>
    </NewMemberContentContainer>

  </NewMemberWrapper>
);

export default NewMemberSectionWide;
