import React from 'react';
import Image from 'next/image';
import { format } from 'date-fns';
import Link from 'next/link';
import {
  Card,
  VideoTitle,
  Creator,
  CreatedAt,
  CreatorInformation,
} from './VideoCard.styles';

interface VideoCardProps {
  title: string,
  videoURL?: string,
  creator: string,
  created_at: string,
}

const VideoCard = ({
  title,
  videoURL,
  creator,
  created_at,
}: VideoCardProps) => {
  const getYouTubeId = (url: string) => {
    const result = url.split(/(vi\/|v=|\/v\/|youtu\.be\/|\/embed\/)/);
    return (result[2] !== undefined) ? result[2].split(/[^0-9a-z_-]/i)[0] : result[0];
  };

  return (
    <Link href="/">
      <Card>
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
        </CreatorInformation>
      </Card>
    </Link>
  );
};

export default VideoCard;
