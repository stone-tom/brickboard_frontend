import React, { ReactNode } from 'react';
import { ButtonWrapper, PromptButton } from './Prompt.styles';
import Overlay from '../../../core/components/Overlay/Overlay';
import OverlayBody from '../../../core/components/OverlayBody/OverlayBody';
import { OverlayHeadline } from '../../../core/components/OverlayBody/OverlayBody.styles';
import { useStoreDispatch } from '../../../../context/custom_store';

interface PromptProps {
  onAccept: () => void,
  onDecline?: () => void,
  acceptText?: string,
  declineText?: string,
  children: ReactNode,
  headline?: string,
}

const Prompt = ({
  acceptText = 'Bestätigen',
  declineText = 'Abbrechen',
  children,
  headline,
  onAccept,
  onDecline,
}: PromptProps) => {
  const { removeComponent } = useStoreDispatch();

  const decline = () => {
    if (onDecline) onDecline();
    removeComponent();
  };

  const accept = () => {
    if (onAccept) onAccept();
    removeComponent();
  };

  return (
    <Overlay>
      <OverlayBody>
        <OverlayHeadline>
          {headline}
        </OverlayHeadline>
        <p>{children}</p>
        <ButtonWrapper>
          <PromptButton
            onClick={decline}
            gray
            small
          >
            {declineText}
          </PromptButton>
          <PromptButton
            onClick={accept}
            small
          >
            {acceptText}
          </PromptButton>
        </ButtonWrapper>
      </OverlayBody>
    </Overlay>
  );
};

export default Prompt;
