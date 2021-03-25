import React, { useState } from 'react';
import { useStoreDispatch } from '../../../../context/custom_store';
import ICategory from '../../../../models/ICategory';
import { MessageType } from '../../../../models/IMessage';
import { FlexRight } from '../../../../styles/global.styles';
import Button from '../../../core/components/Button/Button';
import FormInput from '../../../core/components/FormInput/FormInput';
import MultiSelectComponent from '../../../core/components/MultiSelect/MultiSelect';
import Editor from '../../../core/container/Editor/Editor';
import {
  FormWrapper,
  VideoInformationWrapper,
  InputWrapper,
  Title,
} from './PresentMovieForm.styles';

export interface ICreateTopic {
  title: string,
  content: string,
  video_url?: string,
  category_ids?: string[]
  type?: 'Thredded::TopicMovie' | 'Thredded::TopicDefault',
}

interface PresentMovieFormProps {
  categories: ICategory[],
  onSubmit: (body: ICreateTopic) => void,
}

const PresentMovieForm = ({
  categories,
  onSubmit,
}: PresentMovieFormProps) => {
  const { setMessage } = useStoreDispatch();
  const [selectedCategories, setSelectedCategories] = useState<{
    label: string,
    value: string,
  }[]>([]);

  const [url, setURL] = useState<string>();
  const [content, setContent] = useState<string>();
  const [title, setTitle] = useState<string>();

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
      category_ids: selectedCategories.map((category) => category.value, 10),
      type: 'Thredded::TopicMovie',
    };

    onSubmit(body);
  };

  return (
    <FormWrapper>
      <h2>Neuen Film erstellen:</h2>
      <VideoInformationWrapper>
        <Title>
          <FormInput
            type="text"
            value={title}
            onChange={(newValue) => setTitle(newValue)}
          >
            Title
          </FormInput>
        </Title>
        <InputWrapper>
          <FormInput
            type="text"
            value={url}
            onChange={(newValue) => setURL(newValue)}
          >
            Youtube Video-URL
          </FormInput>
        </InputWrapper>
        <InputWrapper>
          <MultiSelectComponent
            isMulti
            options={categories.map((category) => ({
              label: category.attributes.name,
              value: category.id,
            }))}
            onChange={(newCategories) => handleCategorySelect(newCategories)}
            value={selectedCategories}
          >
            Test
          </MultiSelectComponent>
        </InputWrapper>
      </VideoInformationWrapper>
      <Editor
        content={content}
        onChange={(newContent) => setContent(newContent)}
      />
      <FlexRight>
        <Button
          disabled={!content || !title || !url}
          type="submit"
          onClick={handleSubmit}
        >
          Absenden
        </Button>
      </FlexRight>
    </FormWrapper>
  );
};

export default PresentMovieForm;
