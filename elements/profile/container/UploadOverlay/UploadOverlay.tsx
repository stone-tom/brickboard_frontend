import React, { useState } from 'react';
import { useStoreDispatch } from '../../../../context/custom_store';
// import { useStoreDispatch } from '../../../../context/custom_store';
// import { MessageType } from '../../../../models/IMessage';
// import updateUserDetail from '../../../../util/api/user/update-user-detail';
import File from '../../../core/components/File/File';
import { Overlay } from '../../../core/components/Overlay/Overlay.styles';
import { OverlayBody, OverlayHeadline } from '../../../core/components/OverlayBody/OverlayBody.styles';
import { ButtonWrapper, PromptButton } from '../../../core/container/Prompt/Prompt.styles';

interface UploadOverlayProps {
  headline: string,
  onDecline?: () => void,
  onAccept: (file: File) => void,
}

const UploadOverlay = ({
  headline,
  onDecline,
  onAccept,
}: UploadOverlayProps) => {
  const [file, setFile] = useState<File>();
  const { removeComponent } = useStoreDispatch();

  const accept = () => {
    if (file) {
      onAccept(file);
    }
    removeComponent();
  };

  const decline = () => {
    if (onDecline) onDecline();
    removeComponent();
  };

  return (
    <Overlay>
      <OverlayBody>
        <OverlayHeadline>
          {headline}
        </OverlayHeadline>
        <File onFileUpload={(newFile) => setFile(newFile)} />
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
