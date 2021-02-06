import React, { useState } from 'react';
import { useStoreDispatch } from '../../../../context/custom_store';
import File from '../../../core/components/File/File';
import FormInput from '../../../core/components/FormInput/FormInput';
import { Overlay } from '../../../core/components/Overlay/Overlay.styles';
import { OverlayBody, OverlayHeadline } from '../../../core/components/OverlayBody/OverlayBody.styles';
import { ButtonWrapper, PromptButton } from '../../../core/container/Prompt/Prompt.styles';
import { MessageType } from '../../../../models/IMessage';

interface UploadOverlayProps {
  headline: string,
  onDecline?: () => void,
  onAccept: (file: File, password?: string) => void,
  withPassword?: boolean,
  maxSize: number,
  allowedTypes: string[],
}

const UploadOverlay = ({
  headline,
  onDecline,
  onAccept,
  withPassword,
  allowedTypes,
  maxSize,
}: UploadOverlayProps) => {
  const [file, setFile] = useState<File>();
  const [password, setPassword] = useState<string>();
  const { removeComponent, setMessage } = useStoreDispatch();

  const accept = () => {
    if (file) {
      onAccept(file, password);
    }
    removeComponent();
  };

  const decline = () => {
    if (onDecline) onDecline();
    removeComponent();
  };

  const handleFileUpload = (newFile: File) => {
    if (!allowedTypes.includes(newFile.type)) {
      setMessage({
        content: 'Das Bild hat einen nicht erlaubten Dateityp',
        type: MessageType.error,
      });
      setFile(newFile);
    } else if (newFile.size > maxSize) {
      setMessage({
        content: 'Das Bild ist zu groß',
        type: MessageType.error,
      });
    } else {
      setFile(newFile);
    }
  };

  return (
    <Overlay>
      <OverlayBody>
        <OverlayHeadline>
          {headline}
        </OverlayHeadline>
        {withPassword && (
          <FormInput
            type="password"
            onChange={(value) => setPassword(value)}
          >
            Passwort
          </FormInput>
        )}
        <File
          onFileUpload={(newFile) => handleFileUpload(newFile)}
        />
        <ButtonWrapper>
          <PromptButton
            onClick={decline}
            gray
            small
          >
            Abbrechen
          </PromptButton>
          <PromptButton
            disabled={!file}
            onClick={accept}
            small
          >
            Bestätigen
          </PromptButton>
        </ButtonWrapper>
      </OverlayBody>
    </Overlay>
  );
};

export default UploadOverlay;
