import React from 'react';
import SunEditor from 'suneditor-react';
import 'suneditor/dist/css/suneditor.min.css';
import {
  EditorContainer,
} from './Editor.styles';

interface EditorProps {
  onChange: (content: string) => void;
  content: string,
  placeholder?: string,
  name?: string,
}

const Editor = ({
  onChange,
  content,
  placeholder = 'Ich darf stolz verkünden, dass...',
  name = 'editor',
}: EditorProps) => (
  <EditorContainer>
    <SunEditor
      onChange={(newContent) => onChange(newContent)}
      lang="de"
      name={name}
      placeholder={placeholder}
      setContents={content}
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
  </EditorContainer>
);

export default Editor;
