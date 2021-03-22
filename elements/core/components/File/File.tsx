import React, { InputHTMLAttributes } from 'react';
import { useStoreDispatch } from '../../../../context/custom_store';
import { MessageType } from '../../../../models/IMessage';
import { FileWrapper } from './File.styles';

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  name?: string,
  label?: string,
  required?: boolean,
  file: string | number | readonly string [],
  onChange?: () => void,
  onFileUpload?: (file: File) => void,
}

const File = ({
  onChange,
  onFileUpload,
  label = '',
  name,
  required,
  file,
  ...rest
}: InputProps) => {
  const { setMessage } = useStoreDispatch();

  const onUpload = async (e: any) => {
    if (e.target.files[0]) {
      onFileUpload(e.target.files[0]);
    } else {
      setMessage({
        content: 'Es konnte keine Datei gefunden werden',
        type: MessageType.error,
      });
    }
  };

  return (
    <FileWrapper>
      <input
        type="file"
        name={name}
        required={required}
        onChange={onChange || onUpload}
        value={file}
        {...rest}
      />
      <label htmlFor={name}>{label}</label>
    </FileWrapper>
  );
};

export default File;
