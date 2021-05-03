import styled, { css } from 'styled-components';

export const BadgeWrapper = styled.div<{
  active?: boolean,
  unowned?: boolean,
}>`
  opacity: 0.3;
  margin-bottom: 10px;
  cursor: not-allowed;
  border: 2px solid ${(props) => props.theme.white};

  ${(props) => props.active && css`
    border: 2px solid ${props.theme.brickred};
  `};
  ${(props) => props.unowned && css`
    opacity: 1;
    cursor: pointer;
  `};
`;

export const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin: 10px;
`;
