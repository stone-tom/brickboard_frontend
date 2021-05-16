import Image from 'next/image';
import React from 'react';
import {
  ImpressumContainer,
  ImpressumHeading,
  ImpressumImageWrapper,
  ImpressumTextWrapper,
} from './ImpressumWrapper.styles';

const ImpressumWrapper = () => (
  <ImpressumContainer>
    <ImpressumTextWrapper>
      <div>
        <ImpressumHeading>Impressum</ImpressumHeading>
        <p>Andreas Bitzan</p>
        <address>
          <p>Luegerstraße 17</p>
          <p>9020 Klagenfurt</p>
          <p>Österreich</p>
        </address>
        <a href="mailto:andreas.bitzan@gmail.com">andreas.bitzan@gmail.com</a>
      </div>
    </ImpressumTextWrapper>
    <ImpressumImageWrapper>
      <Image src="/assets/images/signup.webp" objectFit="contain" layout="fill" />
    </ImpressumImageWrapper>
  </ImpressumContainer>
);

export default ImpressumWrapper;
