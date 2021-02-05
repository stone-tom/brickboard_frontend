import styled, { css } from 'styled-components';

export const LinkComponentWrapper = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  height: 40px;
  margin: 3px 0;
`;

export const Title = styled.p`
  padding: 0;
  marging: 0;
`;

export const Link = styled.a<{
  empty: boolean,
}>`
  padding: 0 11px;
  text-decoration: underline;
  ${(props) => props.empty && css`
    text-decoration: none;
    cursor: auto;
  `}
`;

export const IconWrapper = styled.div`
  margin-right: 8px;
`;
