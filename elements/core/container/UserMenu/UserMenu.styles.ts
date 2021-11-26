import styled from 'styled-components';

export const UserMenuWrapper = styled.div`
  position: relative;
  display: none;
  width: 250px;

  @media(max-width: ${(props) => props.theme.burger_break}){
   display: block;
   margin-top: 2rem;
  }
`;

export const UserWrapper = styled.button`
  display: flex;
  align-items: center;
  flex-direction: row;
  cursor: pointer;
  background: none;
  padding: 0;
  margin: 0;
  margin-bottom: 1rem;
  border: none;
  font-size: inherit;
  font-family: inherit;
  padding-right: 15px;

  @media(max-width: ${(props) => props.theme.burger_break}){
    justify-content: center;
  }

`;

export const Avatar = styled.div`

`;

export const Name = styled.p`
  margin: 0 10px;
  font-size: 16px;
  @media(max-width: ${(props) => props.theme.burger_break}){
    font-size: 1.3rem;
  }
`;

export const UserMenuList = styled.ul`

`;

export const UserMenuListItem = styled.li`
      margin: 7px 0;
      font-size: 1.3rem;
`;

export const UserMenuLink = styled.a`
  display: flex;
  align-items: center;
`;

export const UserMenuFlex = styled.div`
  display: flex;
  align-items: center;
`;

export const MenuLine = styled.div`
  display: block;
  background: ${(props) => props.theme.grayfont};
  height: 2px;
  width: 100%;
  margin-top: 1rem;
  margin-bottom: 1rem;
`;
