import styled from 'styled-components';

export const UserShowCaseWrapper = styled.a`
   display: flex;
   margin-top: 1rem;
   transition: all 0.3s;
   margin-right: 15px;
   box-shadow: ${(props) => props.theme.boxShadow};

   &:hover{
     box-shadow: 0px 3px 10px 0px rgba(0, 0, 0, 0.5);
   }
`;

export const UserShowCaseImageWrapper = styled.div`
  width: 210px;
  height: 240px;
  position: relative;
`;

export const UserDetails = styled.div`
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  flex-direction: column;
  background-color: ${(props) => props.theme.white};
  padding: 2rem;
  padding-left: 2rem;
`;

export const UserNameWrapper = styled.div`
  margin-bottom: 0.2rem;
  font-size: 1.2rem;
`;

export const MemberShipTimer = styled.div`
  font-size: 0.8rem;
  color: ${(props) => props.theme.grayfont};
`;

export const UserDetailsInfos = styled.div`
  
`;
