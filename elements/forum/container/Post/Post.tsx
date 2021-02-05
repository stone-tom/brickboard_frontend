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
import IUser from '../../../../models/IUser';

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
  first?: boolean,
  post: IPost,
  messageBoardSlug?: string,
  topicTitle?: string,
  author: IUser,
  onPostUpdated?: any;
}

const PostComponent = ({
  post,
  messageBoardSlug,
  first,
  author,
  topicTitle,
  onPostUpdated,
}: PostProps) => {
  const { user, moderation_state } = useStoreState();
  const [isEditing, toggleEditing] = useState(false);
  const postContent = post.attributes.content;
  const { setMessage } = useStoreDispatch();

  const submitPost = async (editorContent) => {
    if (messageBoardSlug && post.relationships.postable.data.id) {
      const { content, error } = await updatePost(
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
        onPostUpdated(content.data);
      }
    }
  };

  return (
    <Post role="article">
      <ProfileAside author={author} />
      <PostDetails>
        <PostHeader>
          <PostHeading>
            {!first && `Re: ${topicTitle}`}
          </PostHeading>

          <PostSettings>
            {user && (
              <>
                {user.attributes.display_name === author.attributes.display_name
                && moderation_state === 'approved' && (
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
    </Post>
  );
};

export default PostComponent;
