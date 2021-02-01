import React, { useState } from 'react';
import { format } from 'date-fns';
import {
  Post, PostContent, PostDate, PostDetails, PostHeading,
} from './Post.styles';
import ProfileAside from '../../components/ProfileAside/ProfileAside';
import { useAuthDispatch, useAuthState } from '../../../../context/auth';
import Editor from '../../../core/container/Editor/Editor';
import updatePost from '../../../../util/api/post/update-post';
import { MessageType } from '../../../../models/IMessage';

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
  postId: number;
  title?: string;
  postContent: string;
  author?: string;
  authorRegistered?: Date;
  authorProfilePic?: string;
  authorBadge?: string;
  created?: Date;
  changed?: Date;
  views?: number;
  topicId: number;
  slug: string,
  comments?: number;
  updated?: boolean;
}

const PostComponent = ({
  title,
  postId,
  postContent,
  author = 'Not defined',
  topicId,
  slug,
  created,
}: PostProps) => {
  const { user } = useAuthState();
  const [isEditing, toggleEditing] = useState(false);
  const [postText, changePostText] = useState(postContent);
  const { setMessage } = useAuthDispatch();
  const submitPost = async (editorContent) => {
    const { content, error } = await updatePost(slug, topicId, postId, editorContent);
    if (error) {
      setMessage({
        content: `Fehler beim absenden: ${error.message}`,
        type: MessageType.error,
      });
    }
    if (content) {
      toggleEditing(false);
      changePostText(editorContent);
    }
  };
  return (
    <Post>
      <PostDetails>
        <PostHeading>{title}</PostHeading>
        {user && (
          <>
            {user.name === author && (
            <button type="button" onClick={() => toggleEditing(!isEditing)}>
              {!isEditing
                ? 'Bearbeiten'
                : 'Abbrechen'}
            </button>
            )}
          </>
        )}
        <PostDate>{format(new Date(created), 'dd.MM.yyyy, HH:mm ')}</PostDate>
        {isEditing
          ? <Editor onEditorSubmit={({editorContent}) => submitPost(editorContent)} answer initialContent={postText} /> 
          : <PostContent dangerouslySetInnerHTML={{ __html: postText }} />}
      </PostDetails>
      <ProfileAside author={author} />
    </Post>
  );
};

export default PostComponent;
