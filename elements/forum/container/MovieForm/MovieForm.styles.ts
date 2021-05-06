import styled from 'styled-components';

export const FormWrapper = styled.div`
  position: relative;
  z-index: 200;
  width: 100%;
`;

export const PreviewWrapper = styled.div`
  margin: 20px 0;
`;

export const InputWrapper = styled.div`
  flex-basis: 30%;

  @media ${(props) => props.theme.breakpoints.xs} {
    flex-basis: 100%;
    margin-bottom: 20px;
  }
`;

export const VideoInformationWrapper = styled.div`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: flex-start;
  margin: 20px 0;
  color: ${(props) => props.theme.darkgray};
  
  & > * {
    margin-right: 20px;
  }

  &:first-child {
    flex-basis: 35%;
  }
`;

export const PreviewHeadline = styled.h2`
  margin: 20px 0;
`;
