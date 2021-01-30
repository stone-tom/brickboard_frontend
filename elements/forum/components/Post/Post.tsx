import React from 'react';
import { format } from 'date-fns';
import {
  Post, PostContent, PostDate, PostDetails, PostHeading,
} from './Post.styles';
import ProfileAside from '../ProfileAside/ProfileAside';

enum IconType {
  Standard,
  Question,
  Announcement,
}

// function whichIcon(type: IconType): IconProp {
//   switch (type) {
//     case IconType.Standard:
//       return faAlignJustify;
//     case IconType.Question:
//       return faQuestion;
//     case IconType.Announcement:
//       return faExclamation;
//   }
// }

interface PostProps {
  type: IconType;
  title?: string;
  content: string;
  author?: string;
  authorRegistered?: Date;
  authorProfilePic?: string;
  authorBadge?: string;
  created?: Date;
  changed?: Date;
  views?: number;
  comments?: number;
  updated?: boolean;
}

const PostComponent = ({
  title,
  content,
  author = 'Not defined',
  created,
}: PostProps) => (

  <Post>
    <PostDetails>
      <PostHeading>{title}</PostHeading>
      <PostDate>{format(new Date(created), 'dd.MM.yyyy, HH:mm ')}</PostDate>
      <PostContent dangerouslySetInnerHTML={{ __html: content }} />
    </PostDetails>
    <ProfileAside author={author} />
  </Post>
);

export default PostComponent;
