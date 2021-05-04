import styled, { css } from 'styled-components';

export const BadgeWrapper = styled.div<{
  active?: boolean,
  owned?: boolean,
  onClick?: () => void,
}>`
  opacity: 0.3;
  margin-bottom: 10px;
  cursor: not-allowed;
  
  ${(props) => !props.onClick && css`
    cursor: default;
  `};

  border: 2px solid ${(props) => props.theme.white};

  ${(props) => props.active && css`
    border: 2px solid ${props.theme.brickred};
  `};
  ${(props) => props.owned && css`
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
