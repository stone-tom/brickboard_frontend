import styled from 'styled-components';

export const VideoMargin = styled.div`
  margin-left: 2rem;
  margin-right: 2rem;
`;

export const VideoShowCaseHeading = styled.h2`
  margin-bottom: 1rem;
`;

export const VideoShowCaseText = styled.p`
  margin-bottom: 2rem;
  padding-bottom: 2rem;
  border-bottom: 2px solid ${(props) => props.theme.gray};
`;

export const VideoShowCaseWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
`;

export const VideoColumnsWrapper = styled.div`
  display: flex;
  width: 75%;
`;

export const VideoList = styled.div`
  display: flex;
  flex-direction: column;
`;
