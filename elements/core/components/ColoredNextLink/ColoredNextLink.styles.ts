import styled from 'styled-components';

export const ColoredLink = styled.a`
  display: inline-block;
  padding: 10px 0;
  &:hover{
    color: ${(props) => props.theme.brickredDark};
  }
`;
