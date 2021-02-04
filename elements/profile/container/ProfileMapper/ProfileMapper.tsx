import { IconProp } from '@fortawesome/fontawesome-svg-core';
import { faCheck, faEdit } from '@fortawesome/free-solid-svg-icons';
import React, { useState } from 'react';
import { useStoreState } from '../../../../context/custom_store';
import IMapping from '../../../../models/IMapping';
import Icon from '../../../core/components/Icon/Icon';
import LinkComponent from '../../components/LinkComponent/LinkComponent';
import TextComponent from '../../components/TextComponent/TextComponent';
import {
  Wrapper,
  MapperHeadline,
  ProfileMapperLine,
  EditMapping,
} from './ProfileMapper.styles';

interface ProfileMapperProps {
  headline: string,
  mapping: IMapping[],
  content: {
    [key: string]: any,
  },
  userId: string,
  onValueChange: (newValue: string, key: string) => void,
  onSubmit: () => void,
}

export interface MappingComponentProps {
  title?: string,
  href?: string,
  value: any,
  icon?: IconProp,
  onChange: (newValue: string) => void,
  isEditing: boolean,
}

const ProfileMapper = ({
  headline,
  mapping,
  content,
  userId,
  onValueChange,
  onSubmit,
}: ProfileMapperProps) => {
  const { isAuthenticated, user } = useStoreState();
  const [isEditing, setIsEditing] = useState<boolean>(false);
  const handleEditClick = () => {
    if (!isEditing) {
      setIsEditing(true);
    } else {
      onSubmit();
      setIsEditing(false);
    }
  };
  return (
    <Wrapper>
      <MapperHeadline>
        {headline}
        {isAuthenticated && user.id === userId && (
          <EditMapping
            isEditing={isEditing}
            small
            reset
            onClick={() => handleEditClick()}
          >
            <Icon icon={!isEditing ? faEdit : faCheck} />
          </EditMapping>
        )}
      </MapperHeadline>
      {mapping.map((section, index) => (
        <ProfileMapperLine
          key={index}
        >
          {Object.keys(section).map((key) => {
            const mapInfo = section[key];
            const value = content[key];
            if (value === null || value === undefined) return null;
            let Component = null;

            if (mapInfo.type === 'text') {
              Component = TextComponent;
            } else if (mapInfo.type === 'link') {
              Component = LinkComponent;
            }
            if (!Component) return null;

            return (
              <Component
                onChange={(newValue) => onValueChange(newValue, key)}
                isEditing={mapInfo.editable && isEditing}
                key={key}
                title={mapInfo.title}
                value={value}
                icon={mapInfo.icon}
              />
            );
          })}
        </ProfileMapperLine>
      ))}
    </Wrapper>
  );
};

export default ProfileMapper;
