import React, { useState } from 'react';
import { useStoreDispatch, useStoreState } from '../../../../context/custom_store';
import ICategory from '../../../../models/ICategory';
import { MessageType } from '../../../../models/IMessage';
import { TopicType } from '../../../../models/ITopic';
import { FlexRight } from '../../../../styles/global.styles';
import filter from '../../../../util/filter';
import Button from '../../../core/components/Button/Button';
import FormInput from '../../../core/components/FormInput/FormInput';
import MultiSelectComponent from '../../../core/components/MultiSelect/MultiSelect';
import Editor from '../../../core/container/Editor/Editor';
import Post from '../Post/Post';
// import PostComponent from '../Post/Post';
import TopicMovie from '../TopicMovie/TopicMovie';
import {
  FormWrapper,
  VideoInformationWrapper,
  InputWrapper,
  Title,
  PreviewWrapper,
  PreviewHeadline,
} from './MovieForm.styles';

export interface ICreateTopic {
  title?: string,
  content: string,
  video_url?: string,
  category_ids?: string[],
  movie_created_at?: string,
  category?: TopicType,
  type?: 'Thredded::TopicMovie' | 'Thredded::TopicDefault',
}

interface PresentMovieFormProps {
  categories: ICategory[],
  onSubmit: (body: ICreateTopic) => void,
  defaultValues?: any;
}

const MovieForm = ({
  categories,
  onSubmit,
  defaultValues,
}: PresentMovieFormProps) => {
  const { setMessage } = useStoreDispatch();
  const [selectedCategories, setSelectedCategories] = useState<{
    label: string,
    value: string,
  }[]>(defaultValues && defaultValues.categories.map((category: ICategory) => ({
    label: category.attributes.name,
    value: category.id,
  })));

  const [url, setURL] = useState<string>(defaultValues && defaultValues.video_url);
  const [content, setContent] = useState<string>(defaultValues && defaultValues.content);
  const [title, setTitle] = useState<string>(defaultValues && defaultValues.title);
  const [createdAt, setCreatedAt] = useState<string>(
    defaultValues && defaultValues.movie_created_at,
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
    const body: ICreateTopic = {
      title,
      content,
      video_url: url,
      movie_created_at: createdAt,
      category_ids: selectedCategories.map((category) => category.value, 10),
      type: 'Thredded::TopicMovie',
    };

    onSubmit(body);
  };

  console.log(badge);
  return (
    <>
      <FormWrapper>
        {!defaultValues && <h2>Neuen Film erstellen:</h2>}
        <VideoInformationWrapper>
          <Title>
            <FormInput
              autoFocus={!defaultValues}
              disabled={defaultValues}
              type="text"
              value={title}
              onChange={(newValue) => setTitle(newValue)}
            >
              Titel
            </FormInput>
          </Title>
          <InputWrapper>
            <FormInput
              disabled={defaultValues}
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
              disabled={defaultValues}
              type="date"
              value={createdAt}
              onChange={(newValue) => setCreatedAt(newValue)}
            >
              Erscheinungsdatum
            </FormInput>
          </InputWrapper>
          <InputWrapper>
            <MultiSelectComponent
              disabled={defaultValues}
              isMulti
              options={categories.map((category) => ({
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
        <Editor
          content={content}
          onChange={(newContent) => setContent(newContent)}
        />
        <FlexRight>
          <Button
            disabled={!content || !title || !url || !createdAt}
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
