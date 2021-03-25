import Link from 'next/link';
import React from 'react';
import { useStoreState } from '../../../../context/custom_store';
import { FlexCenter } from '../../../../styles/global.styles';
import Button from '../../../core/components/Button/Button';
import { CallToActionHeading, CallToActionWrapper } from './CallToActionBox.styles';

const CallToActionBox = () => {
  const { isAuthenticated } = useStoreState();
  return (
    <CallToActionWrapper>
      {isAuthenticated ? (
        <div>
          <CallToActionHeading>Kennst du schon alle?</CallToActionHeading>
          <p>Schau doch mal am Profil vorbei!</p>
        </div>
      ) : (
        <div>
          <CallToActionHeading>Werde jetzt Teil unserer Community!</CallToActionHeading>
          <FlexCenter>
            <Link href="./registrieren"><Button>Registrieren</Button></Link>
          </FlexCenter>
        </div>
      )}
    </CallToActionWrapper>
  );
};

export default CallToActionBox;
