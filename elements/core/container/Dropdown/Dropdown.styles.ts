import Link from 'next/link';
import styled, { css } from 'styled-components';

export const DropdownWrapper = styled.div`
  position: relative;

  @media(max-width: ${(props) => props.theme.burger_break}){
    display: none;
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
  border: none;
  font-size: inherit;
  font-family: inherit;
  padding-right: 15px;

  @media(max-width: ${(props) => props.theme.burger_break}){
    justify-content: center;
  }

`;

export const Avatar = styled.div``;

export const Name = styled.p`
  margin: 0 10px;
  font-size: 16px;
`;

export const DropItem = styled.a`
  z-index: 9000;
  padding: 20px 30px;
  width: 100%;
  cursor: pointer;
  background: ${(props) => props.theme.white};
  display: flex;
  align-items: center;
  
  &:hover {
    background: ${(props) => props.theme.lightgray}
  }

  @media(max-width: ${(props) => props.theme.burger_break}){
    background-color: ${(props) => props.theme.gray};
    text-align: center;
  }
`;

export const DropItemIcon = styled.div`
  margin-right: 15px;
`;

export const Dropdown = styled.div`
  z-index: 8000;
  border-radius: 5px;
  display: flex;
  flex-direction: column;
  width: 250px;
  background: transparent;
  box-shadow: ${(props) => props.theme.boxShadow};

  @media(max-width: ${(props) => props.theme.burger_break}){
    position: static;
    width: 100%;
    background-color: ${(props) => props.theme.gray};
    box-shadow: none;
  }

`;

export const Wrapper = styled.div<{
  open?: boolean,
  adminNav?: boolean,
}>`
  position: absolute;
  top: 3rem;
  right: 0;
  display: flex;
  flex-direction: column;
  width: 250px;
  background-color: transparent;
  transition: all 0.3s; 


  @media(max-width: ${(props) => props.theme.burger_break}){
    position: static;
    width: 100%;
    background-color: ${(props) => props.theme.lightgray};
    font-size: 1rem;
    height: 0;
    overflow: hidden;
    
    ${(props) => props.open && css`
      height: ${props.adminNav ? '420px' : '180px'}
    `}
  }

`;

export const Transparent = styled.div`
  box-shadow: 0;
  z-index: 8001;
  opacity: 0.1;
  background-color: transparent;
  height: 50px;
  width: 70%;
  position: absolute;
  right: 0;
  top: -3rem;
  cursor: pointer;

  @media(max-width: ${(props) => props.theme.burger_break}){
    display: none;
  }

`;

export const NavLink = styled(Link)`
  width: 100%;
`;
