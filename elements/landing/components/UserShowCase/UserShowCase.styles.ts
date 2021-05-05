import styled from 'styled-components';

export const UserShowCaseWrapper = styled.div`
   margin-top: 1rem;
   margin-right: 15px;
`;

export const UserShowCaseImageWrapper = styled.div`
  width: 210px;
  height: 210px;
  position: relative;
`;

export const UserDetails = styled.div`
  background-color: ${(props) => props.theme.white};
  padding: 0.5rem;
`;

export const UserNameWrapper = styled.div`
  margin-bottom: 1rem;
  font-size: 1.2rem;
  text-align: center;
`;

export const UserDetailsInfos = styled.div`
  margin-bottom: 1rem;
`;
