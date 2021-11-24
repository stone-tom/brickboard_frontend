import styled from 'styled-components';

export const MoviePresentationWrapper = styled.div`
  display: grid;
  grid-template-columns: repeat(4, auto);
  grid-template-rows: repeat(auto, 5);
  margin: 20px 0;
  text-align: center;
  width: 100%;

  @media screen and (max-width: 1280px){
    grid-template-columns: repeat(3, auto);
  }

  @media screen and (max-width: 975px){
    grid-template-columns: repeat(2, auto);
  }

  @media screen and (max-width: 665px){
    grid-template-columns: repeat(1, auto);
  }
`;

export const Empty = styled.p`
`;

export const MoviePresentationsHeading = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  background-color: ${(props) => props.theme.gray};
  padding: 1rem;
  width: 100%;
`;
