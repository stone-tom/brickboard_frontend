import React, { useState } from 'react';
import ICategory from '../../../../models/ICategory';
import FormInput from '../../../core/components/FormInput/FormInput';
import MultiSelectComponent from '../../../core/components/MultiSelect/MultiSelect';
import Editor from '../../../core/container/Editor/Editor';
import {
  FormWrapper,
  VideoInformationWrapper,
} from './PresentMovieForm.styles';

interface PresentMovieFormProps {
  categories: ICategory[],
}

const PresentMovieForm = ({
  categories,
}: PresentMovieFormProps) => {
  const [selectedCategories, setSelectedCategories] = useState<{
    label: string,
    value: string,
  }[]>([]);

  const [url, setURL] = useState<string>('');

  return (
    <FormWrapper>
      <Editor onEditorSubmit={({ title, editorContent }) => console.log(title, editorContent)} />
      <VideoInformationWrapper>
        <FormInput
          type="text"
          value={url}
          onChange={(newValue) => setURL(newValue)}
        >
          Youtube Video-URL
        </FormInput>
      </VideoInformationWrapper>
      <MultiSelectComponent
        isMulti
        options={categories.map((category) => ({
          label: category.attributes.name,
          value: category.id,
        }))}
        onChange={(newCategories) => setSelectedCategories(newCategories)}
        value={selectedCategories}
      >
        Test
      </MultiSelectComponent>

    </FormWrapper>
  );
};

export default PresentMovieForm;
