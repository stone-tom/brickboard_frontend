import styled from 'styled-components';

export const PersonalInformationWrapper = styled.div`
  display: flex;
  flex-wrap: wrap;
  background: ${(props) => props.theme.lightgray};
  
  @media ${(props) => props.theme.breakpoints.sm} {
    width: 100%;
  }
  
`;

export const Wrapper = styled.div`
  background: ${(props) => props.theme.white};
  display: flex;
  flex-wrap: wrap;
  margin: 0 15px 15px 15px;
  width: 100%;
  border: 1px solid ${(props) => props.theme.gray};
  border-top: 0;
  
  @media ${(props) => props.theme.breakpoints.sm} {
    margin: 0 10px 10px 10px;
  }
`;
