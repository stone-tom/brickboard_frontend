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
import IPost from '../../../../models/IPost';

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
  // type: IconType;
  // postId: number;
  // title?: string;
  // postContent: string;
  // author?: string;
  // authorRegistered?: Date;
  // authorProfilePic?: string;
  // authorBadge?: string;
  // created?: Date;
  // changed?: Date;
  // views?: number;
  // topicId: number;
  // comments?: number;
  post: IPost,
  messageBoardSlug?: string,
  topicId?: number,
  topicTitle?: string,
  author: string,
}

const PostComponent = ({
  post,
  messageBoardSlug,
  // title,
  // postId,
  // postContent,
  author = 'Not defined',
  topicId,
  topicTitle,
  // created,
}: PostProps) => {
  const { user } = useStoreState();
  const [isEditing, toggleEditing] = useState(false);
  const [postContent, setPostContent] = useState(post.attributes.content || null);
  const { setMessage } = useStoreDispatch();

  const submitPost = async (editorContent) => {
    if (messageBoardSlug && topicId) {
      const { content, error } = await updatePost(
        messageBoardSlug,
        topicId,
        parseInt(post.id, 10),
        editorContent,
      );
      if (error) {
        setMessage({
          content: `Fehler beim absenden: ${error.message}`,
          type: MessageType.error,
        });
      }
      if (content) {
        toggleEditing(false);
        setPostContent(editorContent);
      }
    }
  };

  return (
    <Post role="article">
      <PostDetails>
        <PostHeader>
          <PostHeading>{topicTitle}</PostHeading>
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
        <PostDate>{format(new Date(post.attributes.created_at), 'dd.MM.yyyy, HH:mm ')}</PostDate>
        {isEditing
          ? (
            <Editor
              onEditorSubmit={({ editorContent }) => submitPost(editorContent)}
              answer
              initialContent={postContent}
            />
          )
          : <PostContent dangerouslySetInnerHTML={{ __html: postContent }} />}
      </PostDetails>
      <ProfileAside author={author} />
    </Post>
  );
};

export default PostComponent;
