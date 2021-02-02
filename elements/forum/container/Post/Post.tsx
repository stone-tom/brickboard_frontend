import React, { useState } from 'react';
import { format } from 'date-fns';
import { faEdit, faTimes } from '@fortawesome/free-solid-svg-icons';
import {
  Post, PostContent, PostDate, PostDetails, PostHeader, PostHeading, PostSettings,
} from './Post.styles';
import ProfileAside from '../../components/ProfileAside/ProfileAside';
import { useStoreDispatch, useStoreState } from '../../../../context/custom_store';
import Editor from '../../../core/container/Editor/Editor';
import updatePost from '../../../../util/api/post/update-post';
import { MessageType } from '../../../../models/IMessage';
import Icon from '../../../core/components/Icon/Icon';
import { Button } from '../../../core/components/Button/Button.styles';
import Hint from '../../../core/components/Hint/Hint';

// enum IconType {
//   Standard,
//   Question,
//   Announcement,
// }

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
  // type: number;
  postId: number;
  title?: string;
  postContent: string;
  author?: string;
  // authorRegistered?: Date;
  // authorProfilePic?: string;
  // authorBadge?: string;
  created?: Date;
  // changed?: Date;
  // views?: number;
  topicId: number;
  slug: string,
  // comments?: number;
  // updated?: boolean;
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
  const { user } = useStoreState();
  const [isEditing, toggleEditing] = useState(false);
  const [postText, changePostText] = useState(postContent);
  const { setMessage } = useStoreDispatch();
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
        <PostHeader>
          <PostHeading>{title}</PostHeading>
          <PostSettings>
            {user && (
              <>
                {user.name === author && (
                  <Button reset gray type="button" onClick={() => toggleEditing(!isEditing)}>
                    {!isEditing
                      ? <Hint direction="down" hint="Bearbeiten"><Icon icon={faEdit} /></Hint>
                      : <Hint direction="down" hint="Abbrechen"><Icon icon={faTimes} /></Hint>}
                  </Button>
                )}
              </>
            )}
          </PostSettings>
        </PostHeader>
        <PostDate>{format(new Date(created), 'dd.MM.yyyy, HH:mm ')}</PostDate>
        {isEditing
          ? (
            <Editor
              onEditorSubmit={({ editorContent }) => submitPost(editorContent)}
              answer
              initialContent={postText}
            />
          )
          : <PostContent dangerouslySetInnerHTML={{ __html: postText }} />}
      </PostDetails>
      <ProfileAside author={author} />
    </Post>
  );
};

export default PostComponent;
