import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import styled, { css } from 'styled-components';

export const NavItem = styled.div<{
  active?: boolean,
}>`
  font-size: 18px;
  min-width: 170px;
  height: 50px;
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 5px;
  margin-right: 5px;
  cursor: pointer;
  transition: all .25s ease;

  ${(props) => props.active && css`
    color: ${props.theme.brickred};
    height: 50px;
    transition: .35s ease;
  `}
`;

export const NavIcon = styled(FontAwesomeIcon)`
  height: 14px;
  width: 14px;
  margin-right: 5px;
`;
