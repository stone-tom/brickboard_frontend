import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { IconProp } from '@fortawesome/fontawesome-svg-core';
import { faQuestion } from '@fortawesome/free-solid-svg-icons';
import { SmallInfo } from './SmallInfo.styles';

interface SmallInfoProps {
  title: string;
  value: any;
  icon?: IconProp;
  direction?: string;
}

const SmallInfoComponent = ({
  title = 'Titel leer',
  value = 1,
  icon = faQuestion,
  direction = 'down',
}: SmallInfoProps) => (
  <SmallInfo>
    <span aria-label={title} data-balloon-pos={direction}>
      <FontAwesomeIcon icon={icon} />
    </span>
    <p>
      {value}
    </p>

  </SmallInfo>
);

export default SmallInfoComponent;
