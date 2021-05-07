import styled, { css } from 'styled-components';

export const NavigationBar = styled.div`
  box-shadow: 3.716px 3.346px 40px 0px rgb(43 43 43 / 10%);
  border: 1px solid #e4e7eb;
  position: fixed;
  top: 0;
  z-index: 1000;
  width: 100%;
  background-color: ${(props) => props.theme.white};
`;

export const NavigationWrapper = styled.nav`
  max-width: ${(props) => props.theme.max_container_width};
  margin: 0 auto;
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: ${(props) => props.theme.nav_height};
`;

export const MenuImageContainer = styled.div`
  position: relative;
`;

export const FontImageWrapper = styled.div<{
  enlargeLogo?: boolean,
}>`
  margin-left: 95px;
  cursor: pointer;
  transition: all 0.3s ease-in-out;
  position: relative;
  z-index: 5;

  @media(min-width: ${(props) => props.theme.burger_break}){
    margin-left: 145px;

    ${(props) => !props.enlargeLogo && css`
      margin-left: 95px;
    `}

  }
`;

export const MenuImageWrapper = styled.div<{
  enlargeLogo?: boolean,
}>`
  width: 140px;
  height: 100px;
  position: absolute;
  top: -17px;
  cursor: pointer;
  z-index: 5;

  ${(props) => !props.enlargeLogo && css`
      
  `}

`;

export const NavigationList = styled.ul<{
  open?: boolean,
}>`
  display: flex;
  transition: all 0.5s ease-in-out;
  align-items: center;

  @media (max-width: ${(props) => props.theme.burger_break}){
    position: absolute;
    flex-direction: column;
    width: 100vw;
    top: 0;
    padding-top: ${(props) => props.theme.nav_height};
    height: 100vh;
    background-color: ${(props) => props.theme.white};
    transform: translateX(100%);
    opacity: 0;

    ${(props) => props.open && css`
      transform: translateX(0);
      opacity: 0.98;
    `};
  }
`;

export const NavigationItem = styled.li`
  display: flex;
  align-items: center;
  margin: 0;
  position: relative;
  padding: 8px 20px;

  &:hover {
    background: ${(props) => props.theme.lightgray};
  }
  @media (max-width: ${(props) => props.theme.burger_break}){
    font-size: 1.5rem;
    padding: 1.5rem;
    justify-content: center;

    button{
      font-size: 1.5rem;
    }
  }
`;

export const Seperator = styled.div`
  height: 20px;
  width: 3px;
  background: ${(props) => props.theme.brickred};

  @media (max-width: ${(props) => props.theme.burger_break}){
    height: 3px;
    width: 100px;
  }
`;

export const UnauthorizedWrapper = styled.div`
  display: flex;
  align-items: center;
  margin-left: 30px;
  margin-right: 15px;
`;
