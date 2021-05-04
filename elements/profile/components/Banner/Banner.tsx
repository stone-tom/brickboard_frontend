import { faPencilAlt, faTrash } from '@fortawesome/free-solid-svg-icons';
import Image from 'next/image';
import React from 'react';
import { useStoreState } from '../../../../context/custom_store';
import { backendURL } from '../../../../util/api';
import Icon from '../../../core/components/Icon/Icon';
import { ButtonWrapper } from '../../container/ProfileInformation/ProfileInformation.styles';
import {
  BannerWrapper,
  EditButton,
} from './Banner.styles';

interface BannerProps {
  blocked: boolean,
  image: string | null,
  defaultImage?: string,
  alt_text: string
  userId?: string,
  onEditBanner?: (shouldDelete?: boolean) => void,
}

const BannerComponent = ({
  blocked,
  image,
  defaultImage = '/assets/images/default_banner.jpg',
  alt_text,
  userId,
  onEditBanner,
}: BannerProps) => {
  const { isAuthenticated, user } = useStoreState();
  return (
    <BannerWrapper>
      <Image
        layout="fill"
        objectFit="cover"
        alt={alt_text}
        src={!image || blocked ? defaultImage : `${backendURL}${image}`}
      />
      {isAuthenticated && user.id === userId && (
        <ButtonWrapper>
          <EditButton
            reset
            onClick={() => onEditBanner()}
          >
            <Icon icon={faPencilAlt} />
          </EditButton>
          <EditButton
            reset
            onClick={() => onEditBanner(true)}
          >
            <Icon icon={faTrash} />
          </EditButton>
        </ButtonWrapper>
      )}
    </BannerWrapper>
  );
};

export default BannerComponent;
