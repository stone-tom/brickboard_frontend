import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import styled, { css } from 'styled-components';

export const Icon = styled(FontAwesomeIcon)<{
  width?: number,
  height?: number,
}>`
  width: 24px;
  height: 24px;

  ${(props) => props.width && css`
    width: ${props.width}px !important;
  `}

  ${(props) => props.height && css`
    height: ${props.height}px !important;
  `}
`;
