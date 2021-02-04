import { faFacebook, faTwitter, faYoutube } from '@fortawesome/free-brands-svg-icons';
import {
  faCamera, faGlobe, faLaptop, faLightbulb, faMapMarkedAlt, faMusic,
} from '@fortawesome/free-solid-svg-icons';
import React, { useMemo, useState } from 'react';
import IMapping from '../../../../models/IMapping';
import IUser from '../../../../models/IUser';
import IUserDetail from '../../../../models/IUserDetail';
import { PersonalInformationWrapper } from './PersonalInformation.styles';
import ProfileMapper from '../ProfileMapper/ProfileMapper';

const personal_data_mapping: IMapping[] = [
  {
    occupation: {
      type: 'text',
      title: 'Tätigkeit',
      editable: true,
    },
    created_at: {
      editable: true,
      type: 'text',
      title: 'Mitglied seit:',
    },
    location: {
      editable: true,
      type: 'text',
      icon: faMapMarkedAlt,
    },
  },
];

const links_mapping: IMapping[] = [
  {
    website_url: {
      type: 'link',
      icon: faGlobe,
    },
    youtube_url: {
      type: 'link',
      icon: faYoutube,
    },
    facebook_url: {
      type: 'link',
      icon: faFacebook,
    },
    twitter_url: {
      type: 'link',
      icon: faTwitter,
    },
  },
];

const technology_mapping: IMapping[] = [
  {
    camera: {
      type: 'text',
      icon: faCamera,
    },
    cutting_program: {
      type: 'text',
      icon: faLaptop,
    },
    sound: {
      type: 'text',
      icon: faMusic,
    },
    light: {
      type: 'text',
      icon: faLightbulb,
    },
  },
];

interface PersonInformationProps {
  user: IUser,
  userDetail: IUserDetail,
  onUpdateUserDetail: (newUserDetail: IUserDetail) => void,
}

const PersonalInformation = ({
  user,
  userDetail,
  onUpdateUserDetail,
}: PersonInformationProps) => {
  const [newContent, setNewContent] = useState<IUserDetail>(userDetail);
  const content = useMemo(() => ({
    ...user.attributes,
    ...newContent.attributes,
  }), [user, newContent]);

  const handleChange = (newValue: string, key: string) => {
    setNewContent({
      ...newContent,
      attributes: {
        ...newContent.attributes,
        [key]: newValue,
      },
    });
  };

  return (
    <PersonalInformationWrapper>
      <ProfileMapper
        onSubmit={() => onUpdateUserDetail(newContent)}
        onValueChange={(newValue, key) => handleChange(newValue, key)}
        userId={user.id}
        content={content}
        headline="Persönliche Daten"
        mapping={personal_data_mapping}
      />
      <ProfileMapper
        onSubmit={() => onUpdateUserDetail(newContent)}
        onValueChange={(newValue, key) => handleChange(newValue, key)}
        userId={user.id}
        content={content}
        headline=" Technologien"
        mapping={technology_mapping}
      />
      <ProfileMapper
        onSubmit={() => onUpdateUserDetail(newContent)}
        onValueChange={(newValue, key) => handleChange(newValue, key)}
        userId={user.id}
        content={content}
        headline=" Links"
        mapping={links_mapping}
      />
    </PersonalInformationWrapper>
  );
};

export default PersonalInformation;
