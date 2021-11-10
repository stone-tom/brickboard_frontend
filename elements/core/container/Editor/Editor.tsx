import React from 'react';
import SunEditor from 'suneditor-react';
import 'suneditor/dist/css/suneditor.min.css';
import mergeTag from './Plugins/test_plugin';
import commandEmoji from './Plugins/command_emoji';
import goettlichEmoji from './Plugins/goettlich';
import {
  EditorContainer,
} from './Editor.styles';

interface EditorProps {
  onChange: (content: string) => void;
  content: string,
  placeholder?: string,
  name?: string,
  options?: { [key: string]: any },
}

const Editor = ({
  onChange,
  content,
  placeholder = 'Ich darf stolz verkünden, dass...',
  name = 'editor',
  options = {
    buttonList: [
      ['undo', 'redo'],
      ['bold', 'underline', 'italic', 'strike'],
      ['fontColor', 'hiliteColor'],
      ['outdent', 'indent', 'align', 'list'],
      ['link', 'image', 'video'],
      ['customCommand', 'goettlich_emoji'],
    ],
    imageFileInput: false,
    minHeight: '300px',
    height: 'auto',
    plugins: [
      mergeTag,
      commandEmoji,
      goettlichEmoji,
    ],
  },
}: EditorProps) => (
  <EditorContainer>
    <SunEditor
      onChange={(newContent) => onChange(newContent)}
      lang="de"
      name={name}
      placeholder={placeholder}
      setContents={content}
      setOptions={options}
      showToolbar
    />
  </EditorContainer>
);

export default Editor;
