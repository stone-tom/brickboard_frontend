import styled, { css } from 'styled-components';
import { Button } from '../Button/Button.styles';
import { Icon } from '../Icon/Icon.styled';

export const AccordionWrapper = styled.div`
  width: 100%;
  border: 1px solid ${(props) => props.theme.black};
  margin-bottom: 10px;
  overflow: hidden;
`;

export const AccordionHeader = styled.button<{
  open: boolean,
  icon: boolean,
}>`
  font-size: 16px;
  width: 100%;
  background: none;
  border: 0;
  cursor: pointer;
  padding: 15px 25px;

  ${(props) => props.open && css`
    border-bottom: 1px solid ${props.theme.black};
  `}

  ${(props) => props.icon && css`
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items:center;
    padding-right: 0px;
    cursor: auto;
  `}

  &:focus {
    outline: none;
  }
`;

export const AccordionBody = styled.div<{
  open: boolean
}>`
  padding: 0 25px;
  height: 0;
  opacity: 0;
  transition: height .4s ease 0s, padding .4s ease 0s;

  ${(props) => props.open && css`
    padding: 15px 25px;
    height: auto;
    opacity: 1;
    transition: height .4s ease 0s, padding .4s ease 0s, opacity .2s ease .2s;
  `}
`;

export const ToggleIcon = styled(Icon)`
  margin: 0 15px;
`;

export const ToggleButton = styled(Button)<{
  open?: boolean,
}>`
  transform: rotate(${(props) => (props.open ? '180deg' : '0deg')})
`;
