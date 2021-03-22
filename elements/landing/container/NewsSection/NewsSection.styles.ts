import styled from 'styled-components';

export const NewsSectionWrapper = styled.section`
  display: flex;
  min-height: 80vh;

  @media (max-width: 880px){
    flex-wrap: wrap;
    min-height: auto;
  }
`;

export const ShowCase = styled.div`
  width: 75%;

  @media (max-width: 880px){
    width: 100%;
  }

`;

export const NewsListing = styled.ul`
  width: 25%;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  padding: 0.5rem;
  background-color: ${(props) => props.theme.gray};

  @media (max-width: 880px){
    width: 100%;
    flex-direction: row;
    flex-wrap: wrap;
  }

`;

export const AllNewsItem = styled.li`
  text-align: center;
  margin-bottom: 0.5rem;

  @media (max-width: 880px){
    width: 100%;
  }

`;
