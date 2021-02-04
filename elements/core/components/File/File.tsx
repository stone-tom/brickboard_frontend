import React, { InputHTMLAttributes } from 'react';
import { useStoreDispatch } from '../../../../context/custom_store';
import { MessageType } from '../../../../models/IMessage';
import { FileWrapper } from './File.styles';

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  name?: string,
  label?: string,
  required?: boolean,
  onChange?: () => void,
  onFileUpload?: (file: File) => void,
}

const File = ({
  onChange,
  onFileUpload,
  label = '',
  name,
  required,
  ...rest
}: InputProps) => {
  const { setMessage } = useStoreDispatch();

  const onUpload = async (e: any) => {
    const allowed = ['jpg', 'jpeg', 'image/jpeg'];
    if (e.target.files[0]) {
      if (allowed.includes(e.target.files[0].type)) {
        onFileUpload(e.target.files[0]);
      }
    } else {
      setMessage({
        content: 'Der Dateityp ist nicht erlaubt! Möglich sind nur Dateien mit der Endung .jpg',
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
        {...rest}
      />
      <label htmlFor={name}>{label}</label>
    </FileWrapper>
  );
};

export default File;
