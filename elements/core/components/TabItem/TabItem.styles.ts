import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import styled, { css } from 'styled-components';

export const TabItem = styled.div<{
  active?: boolean,
}>`
  font-size: 18px;
  min-width: 170px;
  height: 50px;
  display: flex;
  justify-content: center;
  align-items: center;
  border: 1px solid ${(props) => props.theme.gray};
  margin-top: 5px;
  margin-right: 5px;
  cursor: pointer;
  transition: all .25s ease;
  background: ${(props) => props.theme.white};

  ${(props) => props.active && css`
    border-bottom: 0;
    color: red;
    height: 55px;
    transition: .35s ease;
`}
`;

export const TabIcon = styled(FontAwesomeIcon)`
  height: 14px;
  width: 14px;
  margin-right: 5px;
`;
