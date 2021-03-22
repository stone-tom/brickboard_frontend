import styled from 'styled-components';

export const NavigationBar = styled.div`
  box-shadow: 3.716px 3.346px 40px 0px rgb(43 43 43 / 10%);
  border: 1px solid #e4e7eb;
  position: relative;
  z-index: 1000;
`;

export const NavigationWrapper = styled.nav`
  max-width: ${(props) => props.theme.max_container_width};
  margin: 0 auto;
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 80px;
`;

export const MenuImageContainer = styled.div`
  position: relative;
`;

export const FontImageWrapper = styled.div`
  margin-left: 145px;
  cursor: pointer;
`;

export const MenuImageWrapper = styled.div`
  width: 140px;
  height: 100px;
  position: absolute;
  top: -17px;
  cursor: pointer;
`;

export const NavigationList = styled.ul`
  display: flex;
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
`;

export const Seperator = styled.div`
  height: 20px;
  margin: 0 15px;
  width: 3px;
  background: ${(props) => props.theme.brickred};
`;

export const UnauthorizedWrapper = styled.div`
  display: flex;
  align-items: center;
  margin-left: 30px;
`;
