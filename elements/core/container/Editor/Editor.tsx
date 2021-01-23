import { useRouter } from 'next/router';
import React, { useRef, useState } from 'react';
import SunEditor from 'suneditor-react';
import 'suneditor/dist/css/suneditor.min.css';
import { TitleInput } from './Editor.styles';

interface EditorProps{
    redirect: string;
}

const CustomEditor = ({ redirect }:EditorProps) => {
  const editorRef = useRef();
  const [editorContent, setEditorContent] = useState('');
  const [title, setTitle] = useState('');
  const [message, setMessage] = useState('');
  const router = useRouter();

  const handleChange = (content) => {
    setEditorContent(content);
  };
  const changeTitle = (text) => {
    setTitle(text);
  };

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
    const result = await fetch(
      `https://brickboard.herokuapp.com/${redirect}/topics/`,
      {
        method: 'POST',
        credentials: 'include',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      },
    ).then((response) => {
      if (!response.ok) {
        return null;
      }
      return response.json();
    });

    if (result === null) {
      setMessage('Das hat leider nicht funktioniert');
    } else {
      router.push(`../${redirect}`);
    }
  };

  return (
    <div>
      <h2>Der Titel</h2>
      <TitleInput placeholder="Wow, mein neues Thema!" name="title" onChange={(e) => changeTitle(e.target.value)} />
      <h2> Verfasse deinen Beitrag </h2>
      <SunEditor
        ref={editorRef}
        onChange={handleChange}
        lang="de"
        name="editor"
        placeholder="Ich will euch was sagen..."
        autoFocus
        setOptions={{
          buttonList: [
            ['undo', 'redo'],
            ['bold', 'underline', 'italic', 'strike', 'fontColor'],
            ['outdent', 'indent'],
            ['link', 'image', 'video'],
          ],
          imageFileInput: false,
        }}
      />
      {message && <p>{message}</p>}
      <button type="button" onClick={() => outPut()}>Log Input</button>
      <button type="button" onClick={() => submitTopic()}>Absenden</button>
    </div>
  );
};

export default CustomEditor;
