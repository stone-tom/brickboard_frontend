import styled from 'styled-components';

export const NewsArticleWrapper = styled.article`
  display: flex;
  position: relative;
  box-shadow: 0 0 10px ${(props) => props.theme.gray};
  min-height: 10rem;
  background-color: ${(props) => props.theme.white};
`;

export const NewsArticleContainer = styled.div`
  margin-top: 2rem;
  margin-bottom: 2rem;
`;

export const NewsArticleHeader = styled.header`
  margin-bottom: 2rem;
`;

export const NewsArticleImageWrapper = styled.div`
  width: 25%;
  position: relative;
`;

export const NewsArticleInfos = styled.div`
  width: 75%;
  padding: 1rem;
  position: relative;
`;

export const NewsArticleHeading = styled.h2`

`;

export const NewsArticleButtonFloat = styled.div`
  position: absolute;
  right: 1rem;
  bottom: 1rem;
`;
