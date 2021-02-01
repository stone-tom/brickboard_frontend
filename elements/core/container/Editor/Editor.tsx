import { useRouter } from 'next/router';
import React, { useState } from 'react';
import SunEditor from 'suneditor-react';
import 'suneditor/dist/css/suneditor.min.css';
import { useAuthDispatch } from '../../../../context/auth';
import { MessageType } from '../../../../models/IMessage';
import { answerTopic, createTopic } from '../../../../util/api';
import getRandomInt from '../../../../util/randomizer';
import { EditorContainer, EditorWrapper, TitleInput } from './Editor.styles';

interface EditorProps{
    redirect: string;
    id?: number;
}

const titlePlaceholders = [
  'Wow, mein neues Thema!',
  'Hallo Brickfilmwelt!',
  'Wie macht man eigentlich einen Brickfilm?!',
];
const postPlaceholders = [
  'Ich will euch was beichten...',
  'Ich darf stolz verkünden, dass...',
  'Boah, was wollt ich eigentlich schreiben?',
];

const CustomEditor = ({ redirect, id }:EditorProps) => {
  const [editorContent, setEditorContent] = useState('');
  const [title, setTitle] = useState('');
  const router = useRouter();
  const { setMessage } = useAuthDispatch();

  const handleChange = (content) => {
    setEditorContent(content);
  };
  const changeTitle = (text) => {
    setTitle(text);
  };

  const getTitlePlaceholder = () => titlePlaceholders[getRandomInt(titlePlaceholders.length)];
  const getPostPlaceholder = () => postPlaceholders[getRandomInt(postPlaceholders.length)];

  const outPut = () => {
    console.log(editorContent);
  };
  const submitTopic = async () => {
    const data = {
      topic: {
        title,
        content: editorContent,
      },
    };

    let retrievedContent = null;
    let retrievedError = null;
    if (id) {
      const { content, error } = await answerTopic(redirect, id, data);
      retrievedContent = content;
      retrievedError = error;
    } else {
      const { content, error } = await createTopic(redirect, data);
      retrievedContent = content;
      retrievedError = error;
    }

    if (retrievedError) {
      setMessage({
        content: `Fehler beim absenden: ${retrievedError.message}`,
        type: MessageType.error,
      });
    }

    if (retrievedContent !== null) {
      router.push(`../${redirect}`);
    }
  };

  return (
    <EditorContainer>
      <h2>Der Titel</h2>
      <TitleInput placeholder={`${getTitlePlaceholder()}`} name="title" onChange={(e) => changeTitle(e.target.value)} />
      <h2> Verfasse deinen Beitrag </h2>
      <EditorWrapper>
        <SunEditor
          onChange={handleChange}
          lang="de"
          name="editor"
          placeholder={`${getPostPlaceholder()}`}
          autoFocus
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
          }}
        />
      </EditorWrapper>
      <button type="button" onClick={() => outPut()}>Log Input</button>
      <button type="button" onClick={() => submitTopic()}>Absenden</button>
    </EditorContainer>
  );
};

export default CustomEditor;
