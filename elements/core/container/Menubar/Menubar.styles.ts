import styled from 'styled-components';

export const MenuBackground=styled.div`
    box-shadow: 0 0 10px ${(props)=>props.theme.darkgray}; 
    background-color: ${(props)=>props.theme.white};
`;

export const MenuWrapper=styled.div`
    max-width: 1170px;
    margin: 0 auto;
    padding-left: 15px;
    padding-right: 15px;

    display: flex;
    justify-content: space-between;
    align-items: center;

`;

export const MenuImageWrapper=styled.div`
    width: 240px;
    height: 100px;
    position: relative;
    cursor: pointer;
`;
export const NavigationWrapper=styled.nav`

`;
export const NavigationList=styled.ul`
    display: flex;
`;
export const NavigationItem=styled.li`
    margin: 0 1rem;
`;