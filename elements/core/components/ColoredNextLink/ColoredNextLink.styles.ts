import styled from 'styled-components';

export const ColoredLink = styled.a`
  display: inline-block;
  &:hover{
    color: ${(props) => props.theme.brickredDark};
  }
`;
