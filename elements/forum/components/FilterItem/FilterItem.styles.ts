import styled, { css } from 'styled-components';

export const FilterCard = styled.div<{
  active?: boolean,
}>`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 100px;
  width: 100px;
  cursor: pointer;
  transition: background .5s ease;
  background: ${(props) => props.theme.lightgray};
  border-bottom: 3px solid ${(props) => props.theme.lightgray};
  border-right: 1px solid ${(props) => props.theme.gray};
  
  &:hover {
    background: ${(props) => props.theme.gray};
    img {
      transition: transform .3s;
      transform: scale(1.1);
      transform: rotate(10deg);
    }
  }

  ${(props) => props.active && css`
    border-bottom: 3px solid ${props.theme.brickred};
    background: ${props.theme.white};
    
  `}
`;

export const FilterIcon = styled.div`
  position: relative;
  height: 32px;
  width: 32px;
`;

export const Name = styled.p``;
