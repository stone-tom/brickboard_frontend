import React, { useState } from 'react';
import { format } from 'date-fns';
import { faEdit, faTimes, faTrash } from '@fortawesome/free-solid-svg-icons';
import {
  Post, PostContent, PostDate, PostDetails, PostHeader, PostHeading, PostSettings, CategoryLabel,
} from './Post.styles';
import ProfileAside from '../../components/ProfileAside/ProfileAside';
import { useStoreDispatch, useStoreState } from '../../../../context/custom_store';
import updatePost from '../../../../util/api/post/update-post';
import { MessageType } from '../../../../models/IMessage';
import Icon from '../../../core/components/Icon/Icon';
import { Button } from '../../../core/components/Button/Button.styles';
import Hint from '../../../core/components/Hint/Hint';
import IPost from '../../../../models/IPost';
import IUser from '../../../../models/IUser';
import { getYouTubeId } from '../../../core/container/MovieCard/MovieCard';
import PostForm from '../../container/PostForm/PostForm';
import MovieForm, { ICreateTopic } from '../MovieForm/MovieForm';
import ICategory from '../../../../models/ICategory';
import Tag from '../../../core/components/Tag/Tag';
import { CategoryWrapper } from '../../../core/container/MovieCard/MovieCard.styles';
import { deletePost } from '../../../../util/api';
import Prompt from '../../../core/container/Prompt/Prompt';
import { MarginLeft } from '../../../../styles/global.styles';
import IBadge from '../../../../models/IBadge';
import findObject from '../../../../util/finder';

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
  onPostUpdated?: any,
  slug?: string,
  videoURL?: string,
  categories?: ICategory[],
  allCategories?: ICategory[],
  allBadges?: IBadge[],
  onPostDeleted?: (postId: number) => void,
}

const PostComponent = ({
  post,
  messageBoardSlug,
  first,
  author,
  topicTitle,
  onPostUpdated,
  slug,
  videoURL,
  categories,
  allCategories,
  allBadges,
  onPostDeleted,
}: PostProps) => {
  const { user, moderation_state } = useStoreState();
  const [isEditing, toggleEditing] = useState(false);
  const postContent = post.attributes.content;
  const { setMessage, addComponent } = useStoreDispatch();
  let badge = null;
  if (author.relationships.thredded_main_badge.data) {
    badge = findObject(allBadges, author.relationships.thredded_main_badge.data.id);
  }
  const submitPost = async (values: ICreateTopic) => {
    if (messageBoardSlug && post.relationships.postable.data.id) {
      const { content, error } = await updatePost(
        parseInt(post.id, 10),
        values,
      );
      if (error) {
        setMessage({
          content: `Fehler beim absenden: ${error.message}`,
          type: MessageType.error,
        });
      }
      if (content) {
        setMessage({
          content: 'Post erfolgreich bearbeitet!',
          type: MessageType.success,
        });
        toggleEditing(false);
        onPostUpdated(content.data);
      }
    }
  };
  const deletePostWithId = async (postId) => {
    const { error } = await deletePost(postId);
    if (!error) {
      setMessage({
        content: 'Post wurde gelöscht',
        type: MessageType.success,
      });
      onPostDeleted(postId);
    } else {
      setMessage({
        content: `Fehler beim absenden: ${error.message}`,
        type: MessageType.error,
      });
    }
  };

  const onTryDeleting = (postId) => {
    addComponent((
      <Prompt
        headline="Löschen bestätigen?"
        onAccept={() => deletePostWithId(postId)}
      >
        <div>
          <p>Dieser Vorgang kann nicht rückgängig gemacht werden!</p>
        </div>
      </Prompt>));
  };

  return (
    <Post role="article">
      <ProfileAside author={author} badge={badge} />
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
                        ? <Hint place="bottom" hint="Bearbeiten"><Icon icon={faEdit} /></Hint>
                        : <Hint place="bottom" hint="Abbrechen"><Icon icon={faTimes} /></Hint>}
                    </Button>
                )}
                {user.attributes.admin && !first && (
                  <MarginLeft>
                    <Button reset gray type="button" onClick={() => onTryDeleting(post.id)}>
                      <Hint place="bottom" hint="Post löschen"><Icon icon={faTrash} /></Hint>
                    </Button>
                  </MarginLeft>
                )}
              </>
            )}
          </PostSettings>
        </PostHeader>
        <PostDate>
          {post.attributes.created_at !== post.attributes.updated_at ? (
            <span>
              {`Bearbeitet am ${format(new Date(post.attributes.updated_at), 'dd.MM.yyyy, HH:mm ')}`}
            </span>
          ) : (
            <span>
              {format(new Date(post.attributes.created_at), 'dd.MM.yyyy, HH:mm ')}
            </span>
          )}
        </PostDate>
        {isEditing
          ? (
            <>
              {slug === 'filmvorstellungen' && first ? (
                <MovieForm
                  categories={allCategories}
                  onSubmit={(movieValues) => submitPost(movieValues)}
                  defaultValues={{
                    video_url: videoURL,
                    title: topicTitle,
                    content: post.attributes.content,
                    categories,
                  }}
                />
              ) : (
                <PostForm
                  onEditorSubmit={(editorContent) => submitPost(
                    {
                      content: editorContent.editorContent,
                    },
                  )}
                  answer
                  initialContent={postContent}
                />
              )}
            </>
          )
          : (
            <>
              <PostContent dangerouslySetInnerHTML={{ __html: postContent }} />
            </>
          )}
        {slug === 'filmvorstellungen' && !isEditing && first && (
          <>
            <iframe
              title="Youtube Video"
              id="ytplayer"
              width="640"
              height="360"
              src={`https://www.youtube.com/embed/${getYouTubeId(videoURL)}`}
              frameBorder="0"
            />
            <CategoryWrapper>
              <CategoryLabel>Kategorien:</CategoryLabel>
              {categories.map((category) => (
                <>
                  <Tag name={category.attributes.name} />
                </>
              ))}
            </CategoryWrapper>
          </>
        )}
      </PostDetails>
    </Post>
  );
};

export default PostComponent;
