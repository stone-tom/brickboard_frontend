import { faDiscord, faFacebookF } from '@fortawesome/free-brands-svg-icons';
import Image from 'next/image';
import Link from 'next/link';
import React from 'react';
import { useStoreState } from '../../../../context/custom_store';
import Icon from '../../components/Icon/Icon';
import {
  Footer,
  FooterCopyRightBar,
  FooterIconsWrapper,
  FooterImageWrapper,
  FooterInformation,
  FooterLink,
  FooterList,
  FooterListHeading,
  FooterWrapper,
} from './Footer.styles';

const FooterComponent = () => {
  const { isAuthenticated } = useStoreState();
  return (
    <Footer>
      <FooterWrapper>
        <FooterInformation>
          <FooterImageWrapper>
            <Image
              src="/assets/images/bb_font_weiss.png"
              alt="Brickboard 2.0"
              width={61}
              height={41}
            />
          </FooterImageWrapper>
          <p>
            Die deutschsprachige Brickfilm-Community
          </p>
          <p>Seit 2004!</p>
          <div>
            <FooterImageWrapper><p>Besuche uns auf</p></FooterImageWrapper>
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
        </FooterInformation>
        <div>
          <FooterListHeading>Navigation</FooterListHeading>
          <FooterList>
            <li><Link href="/forum" passHref><FooterLink>Forum</FooterLink></Link></li>
            <li><Link href="/forum/filmvorstellungen" passHref><FooterLink>Brickfilme</FooterLink></Link></li>
            <li><Link href="/benutzer" passHref><FooterLink>Mitglieder</FooterLink></Link></li>
            <li><FooterLink target="blank" href="https://www.brickboard.de/">Archiv</FooterLink></li>
          </FooterList>
        </div>
        <div>
          <FooterListHeading>Inhalte</FooterListHeading>
          <FooterList>
            <li><Link href="/news" passHref><FooterLink>Neuigkeiten</FooterLink></Link></li>
            <li><Link href="/events" passHref><FooterLink>Events</FooterLink></Link></li>
            <li><Link href="/forum/steinerei-und-wettbewerbe" passHref><FooterLink>Wettbewerbe</FooterLink></Link></li>
          </FooterList>
        </div>
        <div>
          <FooterListHeading>Hinweise</FooterListHeading>
          <FooterList>
            <li><Link href="/impressum" passHref><FooterLink>Impressum</FooterLink></Link></li>
            <li><Link href="/datenschutz" passHref><FooterLink>Datenschutz</FooterLink></Link></li>
          </FooterList>
        </div>
      </FooterWrapper>
      <FooterCopyRightBar>
        © Brickboard 2021
      </FooterCopyRightBar>
    </Footer>
  );
};

export default FooterComponent;
