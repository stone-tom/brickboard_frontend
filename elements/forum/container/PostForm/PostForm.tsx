import React, { useState } from 'react';
import SunEditor from 'suneditor-react';
import 'suneditor/dist/css/suneditor.min.css';
import { FlexRight } from '../../../../styles/global.styles';
// import getRandomInt from '../../../../util/randomizer';
import Button from '../../../core/components/Button/Button';
import Editor from '../../../core/container/Editor/Editor';
import { EditorContainer, EditorWrapper, TitleInput } from './PostForm.styles';

interface EditorProps {
  onEditorSubmit: (content: {
    title: string,
    editorContent: string,
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
  // const titlePlaceholder = getTitlePlaceholder();
  // const postPlaceholder = getPostPlaceholder();

  const handleChange = (content) => {
    setEditorContent(content);
  };
  const changeTitle = (text) => {
    setTitle(text);
  };

  const submitTopic = async () => {
    onEditorSubmit({ title, editorContent });
  };

  return (
    <EditorContainer>
      {!answer && (
        <>
          <h2>Der Titel</h2>
          <TitleInput autoFocus placeholder="Hallo Brickfilmwelt!" name="title" onChange={(e) => changeTitle(e.target.value)} />
        </>
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
        <Button disabled={(!answer && !title) || !editorContent} type="button" onClick={() => submitTopic()}>Absenden</Button>
      </FlexRight>

    </EditorContainer>
  );
};

export default PostForm;
