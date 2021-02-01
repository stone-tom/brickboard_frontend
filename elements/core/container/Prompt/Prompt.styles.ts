import styled, { css } from 'styled-components';
import Button from '../../../core/components/Button/Button';

export const PromptButton = styled(Button)<{
  small?: boolean,
  gray?: boolean,
}>`
  margin-left: 20px;

  ${(props) => props.gray && css`
    margin-left: 20px;

    &:hover {
      background: ${props.theme.gray};
      transition: .3s;
    }
  `}
`;

export const ButtonWrapper = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: flex-end;
  margin-top: 30px;
`;
