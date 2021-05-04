import React, { useState } from 'react';
import { useStoreDispatch } from '../../../../context/custom_store';
import File from '../../../core/components/File/File';
import { Overlay } from '../../../core/components/Overlay/Overlay.styles';
import { OverlayBody, OverlayHeadline } from '../../../core/components/OverlayBody/OverlayBody.styles';
import { ButtonWrapper, PromptButton } from '../../../core/container/Prompt/Prompt.styles';
import { MessageType } from '../../../../models/IMessage';

interface UploadOverlayProps {
  headline: string,
  onDecline?: () => void,
  onAccept: (file: File) => void,
  maxSize: number,
  allowedTypes: string[],
  shouldDelete?: boolean,
  deleteMessage?: string,
}

const UploadOverlay = ({
  headline,
  onDecline,
  onAccept,
  allowedTypes,
  maxSize,
  shouldDelete,
  deleteMessage,
}: UploadOverlayProps) => {
  const [file, setFile] = useState<File | null>();
  const { removeComponent, setMessage } = useStoreDispatch();

  const accept = () => {
    if (file || shouldDelete) {
      onAccept(file);
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
        content: `Das Bild muss einen der folgenden Dateitypen haben: ${allowedTypes.join(' ')}`,
        type: MessageType.error,
      });
    } else if (newFile.size > maxSize) {
      setMessage({
        content: `Das Bild darf die Maximalgröße von ${maxSize / 1000}KB nicht übersteigen`,
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
        {shouldDelete ? (
          <>
            {deleteMessage}
          </>
        ) : (
          <>
            {`Erlaubte Dateiformate: ${allowedTypes.join(' ')}`}
            <br />
            {`maximale Dateigröße: ${maxSize / 1000}KB`}
            <File
              onFileUpload={(newFile) => handleFileUpload(newFile)}
            />
          </>
        )}
        <ButtonWrapper>
          <PromptButton
            onClick={decline}
            gray
            small
          >
            Abbrechen
          </PromptButton>
          <PromptButton
            disabled={!file && !shouldDelete}
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
