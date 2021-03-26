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
  margin: 20px 0;
  color: ${(props) => props.theme.darkgray};
  
  & > * {
    margin-right: 20px;
  }

  &:first-child {
    flex-basis: 35%;
  }
`;
