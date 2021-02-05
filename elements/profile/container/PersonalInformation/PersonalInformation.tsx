import React, { useMemo, useState } from 'react';
import { faFacebook, faTwitter, faYoutube } from '@fortawesome/free-brands-svg-icons';
import { isEqual } from 'lodash';
import {
  faCamera, faGlobe, faLaptop, faLightbulb, faMapMarkedAlt, faMusic,
} from '@fortawesome/free-solid-svg-icons';
import IMapping from '../../../../models/IMapping';
import IUser from '../../../../models/IUser';
import IUserDetail from '../../../../models/IUserDetail';
import { PersonalInformationWrapper } from './PersonalInformation.styles';
import ProfileMapper from '../ProfileMapper/ProfileMapper';

const personal_data_mapping: IMapping[] = [
  {
    occupation: {
      type: 'text',
      title: 'Tätigkeit:',
      editable: true,
    },
    created_at: {
      type: 'text',
      title: 'Mitglied seit:',
      format: 'date',
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
      editable: true,
      type: 'link',
      icon: faGlobe,
    },
    youtube_url: {
      editable: true,
      type: 'link',
      icon: faYoutube,
    },
    facebook_url: {
      editable: true,
      type: 'link',
      icon: faFacebook,
    },
    twitter_url: {
      editable: true,
      type: 'link',
      icon: faTwitter,
    },
  },
];

const technology_mapping: IMapping[] = [
  {
    camera: {
      type: 'text',
      editable: true,
      icon: faCamera,
    },
    cutting_program: {
      type: 'text',
      editable: true,
      icon: faLaptop,
    },
    sound: {
      type: 'text',
      editable: true,
      icon: faMusic,
    },
    light: {
      type: 'text',
      editable: true,
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

  const hasChanged = () => {
    const oldData = {
      ...user.attributes,
      ...userDetail.attributes,
    };
    if (!isEqual(oldData, content)) return true;
    return false;
  };

  return (
    <PersonalInformationWrapper>
      <ProfileMapper
        hasChanged={hasChanged()}
        onSubmit={hasChanged() ? (() => onUpdateUserDetail(newContent)) : null}
        onValueChange={(newValue, key) => handleChange(newValue, key)}
        userId={user.id}
        content={content}
        headline="Persönliche Daten"
        mapping={personal_data_mapping}
      />
      <ProfileMapper
        hasChanged={hasChanged()}
        onSubmit={() => onUpdateUserDetail(newContent)}
        onValueChange={(newValue, key) => handleChange(newValue, key)}
        userId={user.id}
        content={content}
        headline=" Technologien"
        mapping={technology_mapping}
      />
      <ProfileMapper
        hasChanged={hasChanged()}
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
