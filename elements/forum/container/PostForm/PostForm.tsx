import { faPaperPlane } from '@fortawesome/free-solid-svg-icons';
import React, { useState } from 'react';
import { TopicType } from '../../../../models/ITopic';
import { FlexRight } from '../../../../styles/global.styles';
// import getRandomInt from '../../../../util/randomizer';
import Button from '../../../core/components/Button/Button';
import Editor from '../../../core/container/Editor/Editor';
import {
  EditorContainer,
  EditorWrapper,
  PostFormHeader,
  PostTitleWrapper,
  TitleInput,
  TopicTypeSelect,
  TopicTypeWrapper,
} from './PostForm.styles';

interface EditorProps {
  onEditorSubmit: (content: {
    title: string,
    editorContent: string,
    category?: TopicType,
  }) => void;
  answer?: boolean;
  initialContent?: string;
}

// const titlePlaceholders = [
//   'Wow, mein neues Thema!',
//   'Hallo Brickfilmwelt!',
//   'Wie macht man eigentlich einen Brickfilm?!',
// ];
// const postPlaceholders = [
//   'Ich will euch was beichten...',
//   'Ich darf stolz verkünden, dass...',
//   'Boah, was wollt ich eigentlich schreiben?',
// ];

const PostForm = ({ onEditorSubmit, answer = false, initialContent }: EditorProps) => {
  // const getTitlePlaceholder = () => titlePlaceholders[getRandomInt(titlePlaceholders.length)];
  // const getPostPlaceholder = () => postPlaceholders[getRandomInt(postPlaceholders.length)];
  const [editorContent, setEditorContent] = useState('');
  const [title, setTitle] = useState('');
  const [category, setTopicCategory] = useState(TopicType.general);
  // const titlePlaceholder = getTitlePlaceholder();
  // const postPlaceholder = getPostPlaceholder();

  const handleChange = (content) => {
    setEditorContent(content);
  };
  const changeTitle = (text) => {
    setTitle(text);
  };

  const submitTopic = async () => {
    onEditorSubmit({ title, editorContent, category });
  };

  return (
    <EditorContainer>
      {!answer && (
        <PostFormHeader>
          <PostTitleWrapper>
            <h2>Der Titel</h2>
            <TitleInput autoFocus placeholder="Hallo Brickfilmwelt!" name="title" onChange={(e) => changeTitle(e.target.value)} />
          </PostTitleWrapper>
          <TopicTypeWrapper>
            <h2>Beitragsart</h2>
            <TopicTypeSelect onChange={(e) => setTopicCategory(e.target.value as TopicType)}>
              <option value={TopicType.general}>Allgemein</option>
              <option value={TopicType.question}>Frage</option>
              <option value={TopicType.announcement}>Ankündigung</option>
            </TopicTypeSelect>
          </TopicTypeWrapper>
        </PostFormHeader>
      )}
      {!answer ? <h2> Verfasse deinen Beitrag </h2> : <h2> Verfasse deine Antwort </h2>}
      <EditorWrapper>
        <Editor
          onChange={handleChange}
          content={initialContent}
          placeholder="Ich darf stolz verkünden, dass.."
          name="editor"
        />
      </EditorWrapper>
      <FlexRight>
        <Button icon={faPaperPlane} disabled={(!answer && !title) || !editorContent} type="button" onClick={() => submitTopic()}>Absenden</Button>
      </FlexRight>

    </EditorContainer>
  );
};

export default PostForm;
