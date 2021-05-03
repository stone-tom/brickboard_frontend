import styled, { css } from 'styled-components';

export const NewsArticleWrapper = styled.article<{
  isActive?: boolean,
}>`
  display: flex;
  position: relative;
  box-shadow: 0 0 10px ${(props) => props.theme.gray};
  min-height: 10rem;
  margin-bottom: 1rem;
  background-color: ${(props) => props.theme.white};

  ${(props) => !props.isActive && css`
    img {
      filter: grayscale(100%);
    }
    opacity: 0.6;
  `}

`;

export const NewsDeleteButtonWrapper = styled.div`
  margin-left: 1rem;
`;

export const NewsButtonWrapper = styled.div`
  display: flex;
`;

export const NewsArticleContainer = styled.div`
  margin-top: 2rem;
  margin-bottom: 2rem;
`;

export const NewsArticleHeader = styled.header`
  margin-bottom: 2rem;
  display: flex;
  justify-content: space-between;
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

export const NewsArticleContent = styled.div`
  width: 80%;
`;
