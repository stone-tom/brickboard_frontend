import { format } from 'date-fns';
import React, { useState } from 'react';
import { faEdit, faTimes } from '@fortawesome/free-solid-svg-icons';
import { useStoreDispatch, useStoreState } from '../../../../context/custom_store';
import ICategory from '../../../../models/ICategory';
import { MessageType } from '../../../../models/IMessage';
import { TopicType } from '../../../../models/ITopic';
import { FlexRight } from '../../../../styles/global.styles';
import Button from '../../../core/components/Button/Button';
import Icon from '../../../core/components/Icon/Icon';
import Hint from '../../../core/components/Hint/Hint';
import FormInput from '../../../core/components/FormInput/FormInput';
import MultiSelectComponent from '../../../core/components/MultiSelect/MultiSelect';
import Editor from '../../../core/container/Editor/Editor';
import Post from '../Post/Post';
import TopicMovie from '../TopicMovie/TopicMovie';
import {
  FormWrapper,
  VideoInformationWrapper,
  InputWrapper,
  PreviewWrapper,
  PreviewHeadline,
} from './MovieForm.styles';
import { EditButton } from '../TopicMovie/TopicMovie.styles';

export interface ICreateTopic {
  title?: string,
  content: string,
  video_url?: string,
  category_ids?: string[],
  movie_created_at?: string,
  category?: TopicType,
  type?: 'Thredded::TopicMovie' | 'Thredded::TopicDefault',
}

export interface IUpdateTopic {
  video_url?: string,
  category_ids?: string[],
  movie_created_at?: string,
  category?: TopicType,
}

interface PresentMovieFormProps {
  categories: ICategory[],
  onSubmit?: (body: ICreateTopic) => void,
  onUpdate?: (topicBody: IUpdateTopic) => void,
  defaultValues?: any;
  setIsEditing?: (status: boolean) => void,
  isEditing?: boolean,
}

const MovieForm = ({
  categories,
  onSubmit,
  defaultValues,
  onUpdate,
  setIsEditing,
  isEditing,
}: PresentMovieFormProps) => {
  const { setMessage } = useStoreDispatch();
  const [selectedCategories, setSelectedCategories] = useState<{
    label: string,
    value: string,
  }[]>(defaultValues && defaultValues.selectedCategories.map((category: ICategory) => ({
    label: category.attributes.name,
    value: category.id,
  })));

  const [url, setURL] = useState<string>(defaultValues && defaultValues.video_url);
  const [content, setContent] = useState<string>(defaultValues && defaultValues.content);
  const [title, setTitle] = useState<string>(defaultValues && defaultValues.title);
  const [createdAt, setCreatedAt] = useState<string>(
    defaultValues && format(new Date(defaultValues.movie_created_at), 'yyyy-MM-dd'),
  );

  const { user, badge } = useStoreState();

  const handleCategorySelect = (newItems: {
    label: string,
    value: string,
  }[]) => {
    if (newItems.length > 3) {
      setMessage({
        content: 'Es dürfen max. 3 Kategorien ausgewählt werden!',
        type: MessageType.warning,
      });
    } else {
      setSelectedCategories(newItems);
    }
  };

  const handleSubmit = () => {
    const topicBody: IUpdateTopic = {
      video_url: url,
      category_ids: selectedCategories.map((category) => category.value, 10),
      movie_created_at: createdAt,
    };
    const body: ICreateTopic = {
      title,
      content,
      video_url: url,
      movie_created_at: createdAt,
      category_ids: selectedCategories.map((category) => category.value, 10),
      type: 'Thredded::TopicMovie',
    };

    if (!defaultValues && onSubmit) onSubmit(body);
    if (defaultValues && onUpdate) onUpdate(topicBody);
  };

  return (
    <>
      <FormWrapper>
        {!defaultValues && <h2>Neuen Film erstellen:</h2>}
        {defaultValues && setIsEditing && (
          <EditButton reset gray type="button" onClick={() => setIsEditing(isEditing && !isEditing)}>
            {!isEditing
              ? <Hint place="bottom" hint="Bearbeiten"><Icon icon={faEdit} /></Hint>
              : <Hint place="bottom" hint="Abbrechen"><Icon icon={faTimes} /></Hint>}
          </EditButton>
        )}
        <VideoInformationWrapper>
          <InputWrapper>
            <FormInput
              autoFocus={!defaultValues}
              disabled={defaultValues}
              type="text"
              value={title}
              onChange={(newValue) => setTitle(newValue)}
            >
              Titel
            </FormInput>
          </InputWrapper>
          <InputWrapper>
            <FormInput
              type="text"
              value={url}
              onChange={(newValue) => setURL(newValue)}
            >
              Youtube Video-URL
            </FormInput>
          </InputWrapper>
        </VideoInformationWrapper>
        <VideoInformationWrapper>
          <InputWrapper>
            <FormInput
              type="date"
              value={createdAt}
              defaultValue={createdAt}
              onChange={(newValue) => setCreatedAt(newValue)}
            >
              Erscheinungsdatum
            </FormInput>
          </InputWrapper>
          <InputWrapper>
            <MultiSelectComponent
              isMulti
              options={categories && categories.map((category) => ({
                label: category.attributes.name,
                value: category.id,
              }))}
              onChange={(newCategories) => handleCategorySelect(newCategories)}
              value={selectedCategories}
            >
              Kategorien (max. 3)
            </MultiSelectComponent>
          </InputWrapper>
        </VideoInformationWrapper>
        {!defaultValues && (
          <Editor
            options={{
              buttonList: [
                ['undo', 'redo'],
                ['bold', 'underline', 'italic', 'strike'],
                ['fontColor', 'hiliteColor'],
                ['outdent', 'indent', 'align', 'list'],
                ['link', 'image'],
              ],
              imageFileInput: false,
              minHeight: '300px',
              height: 'auto',
            }}
            content={content}
            onChange={(newContent) => setContent(newContent)}
          />
        )}
        <FlexRight>
          <Button
            disabled={(defaultValues ? false : !content)
              || (defaultValues ? false : !title)
              || !url
              || !createdAt}
            type="submit"
            onClick={handleSubmit}
          >
            Absenden
          </Button>
        </FlexRight>
      </FormWrapper>
      <PreviewWrapper>
        <PreviewHeadline>Preview - So wird deine Präsentation aussehen</PreviewHeadline>
        <h1>{title || 'Dein Filmtitel'}</h1>
        <TopicMovie
          videoURL={url || ' '}
          author={user}
          createdAt={createdAt || new Date().toDateString()}
          previewCategories={selectedCategories || []}
        />
        <Post
          preview
          post={{
            id: 'test_post',
            type: 'thredded_post',
            attributes: {
              content,
              source: 'web',
              moderation_state: 'approved',
              created_at: new Date().toDateString(),
              updated_at: new Date().toDateString(),
            },
            relationships: {
              postable: {
                data: [{
                  id: 'test',
                  type: 'test',
                }],
              },
            },
          }}
          topicTitle={title}
          first
          author={user}
          allBadges={[badge]}
        />
      </PreviewWrapper>
    </>
  );
};

export default MovieForm;
