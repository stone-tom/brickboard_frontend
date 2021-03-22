import { IconProp } from '@fortawesome/fontawesome-svg-core';
import {
  faCheck, faPen, faTimes,
} from '@fortawesome/free-solid-svg-icons';
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
import getFormatter from './formatter';

interface ProfileMapperProps {
  headline: string,
  mapping: IMapping[],
  content: {
    [key: string]: any,
  },
  userId: string,
  onValueChange: (newValue: string, key: string) => void,
  onSubmit: () => void,
  hasChanged: boolean,
}

export interface MappingComponentProps {
  title?: string,
  href?: string,
  value: any,
  placeholder?: string,
  icon?: IconProp,
  formatter?: (value: string) => string,
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
  hasChanged,
}: ProfileMapperProps) => {
  const { isAuthenticated, user } = useStoreState();
  const [isEditing, setIsEditing] = useState<boolean>(false);
  const handleEditClick = () => {
    if (!isEditing) {
      setIsEditing(true);
    } else if (isEditing && hasChanged) {
      onSubmit();
      setIsEditing(false);
    } else {
      setIsEditing(false);
    }
  };

  const getIcon = () => {
    if (!isEditing) return faPen;
    if (isEditing && hasChanged) return faCheck;
    return faTimes;
  };

  const getColor = () => {
    if (!isEditing) return 'black';
    if (isEditing && hasChanged) return 'green';
    return 'brickred';
  };

  return (
    <Wrapper>
      <MapperHeadline>
        {headline}
        {isAuthenticated && user.id === userId && (
          <EditMapping
            color={getColor()}
            small
            reset
            onClick={() => handleEditClick()}
          >
            <Icon icon={getIcon()} />
          </EditMapping>
        )}
      </MapperHeadline>
      {mapping.map((section, index) => (
        <ProfileMapperLine
          key={index}
        >
          {Object.keys(section).map((key) => {
            const mapInfo = section[key];
            const value = content[key] || '-';
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
                formatter={mapInfo.format ? getFormatter(mapInfo.format) : undefined}
                placeholder={mapInfo.placeholder}
              />
            );
          })}
        </ProfileMapperLine>
      ))}
    </Wrapper>
  );
};

export default ProfileMapper;
