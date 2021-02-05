import styled from 'styled-components';

export const ProfileAside = styled.aside`
  background-color: ${(props) => props.theme.gray};
`;

export const ImageWrapper = styled.div``;

export const ProfileAsideHeading = styled.a`
  transition: all 0.3s;
  background-color: ${(props) => props.theme.brickred};
  color: white;
  padding: .5rem;
  text-align: center;
  display: block;

  &:hover{
    background-color: ${(props) => props.theme.brickredDark};
  }
`;
export const ProfileCondensedInfo = styled.div`
  display: grid;
  height: 200px;
`;

export const ProfileImageWrapper = styled.div`
  position: relative;
  max-height: 200px;
  max-width: 200px;
`;

export const ProfileAsideFact = styled.div`
  display: flex;
  justify-content: center;
  padding: 0.5rem;
`;
