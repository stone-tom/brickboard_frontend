import { faPencilAlt } from '@fortawesome/free-solid-svg-icons';
import Image from 'next/image';
import React from 'react';
import { useStoreState } from '../../../../context/custom_store';
import { backendURL } from '../../../../util/api';
import Icon from '../../../core/components/Icon/Icon';
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
  onEditBanner?: () => void,
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
        <EditButton
          reset
          onClick={() => onEditBanner()}
        >
          <Icon icon={faPencilAlt} />
        </EditButton>
      )}
    </BannerWrapper>
  );
};

export default BannerComponent;
