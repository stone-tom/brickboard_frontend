import styled, { css } from 'styled-components';

export const LikeWrapper = styled.div<{ isAuthenticated }>`
  position: relative;
  border-radius: 5px;
  padding: 1rem;
  display: flex;
  justify-content: flex-start;
  align-items: center;

  ${(props) => props.isAuthenticated && css`
    cursor: pointer;
  `}
`;

export const LikeImage = styled.button<{ isAuthenticated? }>`

  border: none;
  background-color: inherit;
  width: 80px;
  height: 60px;
  z-index: 10;
  background-position: center;
  background-repeat: no-repeat;
  background-size: contain;
  background-image: url('/upnoppen_off.png');
  transition: all 0.3s;
  ${(props) => !props.isAuthenticated && css`
    background-image: url('/upnoppen.png');
  `}

  ${(props) => props.isAuthenticated && css`
    &:hover{
      background-image: url('/upnoppen.png');
      transform: scale(1.1);
      cursor: pointer;
    }
  `}
`;

export const LikeCounter = styled.p`
  font-size: 2rem;
  font-weight: bold;
  margin-left: 1rem;
`;
