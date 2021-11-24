import React from 'react';
import Image from 'next/image';
import { format } from 'date-fns';
import { useRouter } from 'next/router';
import {
  Card,
  VideoTitle,
  Creator,
  CreatedAt,
  CreatorInformation,
  CategoryWrapper,
  LinkButton,
  HotMark,
} from './MovieCard.styles';
import Tag from '../../components/Tag/Tag';
import ICategory from '../../../../models/ICategory';
import Hint from '../../components/Hint/Hint';

export const getYouTubeId = (url: string) => {
  const result = url.split(/(vi\/|v=|\/v\/|youtu\.be\/|\/embed\/)/);
  return (result[2] !== undefined) ? result[2].split(/[^0-9a-z_-]/i)[0] : result[0];
};

interface MovieCardProps {
  title: string,
  videoURL?: string,
  creator: string,
  created_at: string,
  categories: ICategory[]
  id: string,
  unread?: boolean,
  disabled?: boolean,
  hot?: boolean,
}

const MovieCard = ({
  title,
  videoURL,
  creator,
  created_at,
  categories,
  id,
  unread,
  disabled,
  hot = false,
}: MovieCardProps) => {
  const router = useRouter();
  return (
    <LinkButton
      reset
      disabled={disabled}
      onClick={() => router.push(`/forum/filmvorstellungen/${id}`)}
    >
      <Card
        data-testid="movie_card"
        unread={unread}
        disabled={disabled}
      >
        <Image
          layout="fill"
          objectFit="cover"
          src={videoURL ? `https://img.youtube.com/vi/${getYouTubeId(videoURL)}/0.jpg` : '/assets/images/default_thumbnail.png'}
        />
        <VideoTitle>
          {title}
        </VideoTitle>
        <CreatorInformation>
          <Creator>
            {creator}
          </Creator>
          <CreatedAt>
            {format(new Date(created_at), 'dd.MM.yyyy')}
          </CreatedAt>
          <CategoryWrapper>
            {categories.map((category) => (
              <Tag
                key={category.attributes.name}
                name={category.attributes.name}
                icon={category.attributes.category_icon}
              />
            ))}
          </CategoryWrapper>
        </CreatorInformation>
        {hot && <Hint hint="Angesagt"><HotMark /></Hint>}
      </Card>
    </LinkButton>
  );
};

export default MovieCard;
