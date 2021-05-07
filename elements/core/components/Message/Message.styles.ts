import styled, { css } from 'styled-components';
import { MessageType } from '../../../../models/IMessage';

export const Message = styled.div < {
  timeout: string,
  type: MessageType,
  active: boolean,
} >`
  position: fixed;
  transform: translateY(-500px);
  opacity: 0;
  right: 20px;
  top: 20px;
  z-index: 9999;
  background: ${(props) => props.theme.message[props.type]};
  color: #fff;
  transition: all ${(props) => props.timeout} ease 0s;
  width: 400px;
  height: 80px;
  font-weight: 300;
  font-size: 18px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 20px;

  ${(props) => props.active && css`
    transform: translateY(0);
    opacity: 1;
  `}

  @media ${(props) => props.theme.breakpoints.sm} {
    right: 0px;
    top: 0px;
    width: 100%;
  }
`;

export const MessageWrapper = styled.div`
  display: flex;
  align-items: center;

  div {
    margin-right: 8px;
  }
`;

export const CloseMessage = styled.button`
  background: none;
  border: 0;
  margin: 0;
  padding: 0;
  color: #fff;
  cursor: pointer;

  &:focus {
    outline: none;
  }
`;
