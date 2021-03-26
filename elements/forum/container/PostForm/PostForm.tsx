import React, { useState } from 'react';
import SunEditor from 'suneditor-react';
import 'suneditor/dist/css/suneditor.min.css';
import { FlexRight } from '../../../../styles/global.styles';
// import getRandomInt from '../../../../util/randomizer';
import Button from '../../../core/components/Button/Button';
import { EditorContainer, EditorWrapper, TitleInput } from './PostForm.styles';

interface EditorProps {
  onEditorSubmit: (content: any) => void;
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
          <TitleInput placeholder="Hallo Brickfilmwelt!" name="title" onChange={(e) => changeTitle(e.target.value)} />
        </>
      )}
      {!answer ? <h2> Verfasse deinen Beitrag </h2> : <h2> Verfasse deine Antwort </h2>}
      <EditorWrapper>
        <SunEditor
          onChange={handleChange}
          lang="de"
          name="editor"
          placeholder="Ich darf stolz verkünden, dass..."
          setContents={initialContent}
          setOptions={{
            buttonList: [
              ['undo', 'redo'],
              ['bold', 'underline', 'italic', 'strike'],
              ['fontColor', 'hiliteColor'],
              ['outdent', 'indent', 'align', 'list'],
              ['link', 'image', 'video'],
            ],
            imageFileInput: false,
            minHeight: '300px',
            height: 'auto',
          }}
        />
      </EditorWrapper>
      <FlexRight>
        <Button type="button" onClick={() => submitTopic()}>Absenden</Button>
      </FlexRight>

    </EditorContainer>
  );
};

export default PostForm;
