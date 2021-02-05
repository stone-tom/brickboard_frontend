import React from 'react';
import {
  Footer,
  FooterWrapper,
} from './Footer.styles';

const FooterComponent = () => (
  <Footer>
    <FooterWrapper>
      <ul>
        <li>© Brickboard 2021</li>
        <li><a target="blank" href="https://www.brickboard.de/">Zum alten Brickboard</a></li>
      </ul>
    </FooterWrapper>
  </Footer>
);

export default FooterComponent;
