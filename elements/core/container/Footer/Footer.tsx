import { faDiscord, faFacebookF } from '@fortawesome/free-brands-svg-icons';
import Link from 'next/link';
import React from 'react';
import { useStoreState } from '../../../../context/custom_store';
import Icon from '../../components/Icon/Icon';
import {
  Footer,
  FooterBar,
  FooterIconsWrapper,
  FooterListItem,
  FooterRightList,
  FooterWrapper,
} from './Footer.styles';

const FooterComponent = () => {
  const { isAuthenticated } = useStoreState();
  return (
    <Footer>
      <FooterWrapper>
        <div>
          <FooterBar />
          <ul>
            <FooterListItem>© Brickboard 2021</FooterListItem>
            <FooterListItem><a target="blank" href="https://www.brickboard.de/">Zum alten Brickboard</a></FooterListItem>
          </ul>
        </div>
        <div>
          <FooterBar />
          <p>Besuche uns auf</p>
          <FooterIconsWrapper>
            <a target="blank" href="https://www.facebook.com/Brickboard.Community">
              <Icon width={30} height={30} icon={faFacebookF} />
            </a>
            {isAuthenticated
            && (
            <a target="blank" href="https://discord.gg/eQxbuZs">
              <Icon width={30} height={30} icon={faDiscord} />
            </a>
            )}
          </FooterIconsWrapper>
        </div>
        <div>
          <FooterBar />
          <FooterRightList>
            <FooterListItem><Link href="/impressum">Impressum</Link></FooterListItem>
            <FooterListItem><Link href="/datenschutz">Datenschutz</Link></FooterListItem>
            <FooterListItem><Link href="/Nutzungsbedingungen">Nutzungsbedingungen</Link></FooterListItem>
          </FooterRightList>
        </div>
      </FooterWrapper>
    </Footer>
  );
};

export default FooterComponent;
