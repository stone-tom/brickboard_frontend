import React from 'react';
import Link from 'next/link';
import { ColoredLink } from './ColoredNextLink.styles';

interface ColoredNextLinkProps {
  href: string;
  text?: any;
  strong?: boolean;
}

const ColoredNextLink = ({ href, text, strong }: ColoredNextLinkProps) => (
  <Link href={href} passHref>
    <ColoredLink>
      {strong ? <strong>{text}</strong> : text}
    </ColoredLink>
  </Link>
);

export default ColoredNextLink;
