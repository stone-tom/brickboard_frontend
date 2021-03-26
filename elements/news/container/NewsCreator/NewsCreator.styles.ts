import styled from 'styled-components';

export const CreatorContainer = styled.div`
  margin-bottom: 2rem;
`;

export const NewsCreatorWrapper = styled.div`
  display: flex;
  position: relative;
  box-shadow: 0 0 10px ${(props) => props.theme.gray};
  min-height: 10rem;
  margin-bottom: 1rem;
  background-color: ${(props) => props.theme.white};
  margin-top: 2rem;
  margin-bottom: 2rem;
`;

export const UrlWrapper = styled.div`
  display: flex;
  justify-content: space-between;
`;

export const UrlInfo = styled.div`
  width: 45%;
`;

export const WideArea = styled.textarea`
  width: 100%;
`;

export const BtnCancelWrapper = styled.div`
  margin-left: 1rem;
`;
