import styled from 'styled-components';

export const FormWrapper = styled.div`
  z-index: 200;
`;

export const InputWrapper = styled.div`
  flex-basis: 30%;
`;

export const Title = styled.div`
  flex-basis: 40%;
`;

export const VideoInformationWrapper = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  margin: 10px 0;
  
  & > * {
    margin-right: 20px;
  }

  &:first-child {
    flex-basis: 35%;
  }
`;
