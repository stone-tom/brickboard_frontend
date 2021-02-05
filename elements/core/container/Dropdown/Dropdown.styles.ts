import styled from 'styled-components';

export const DropdownWrapper = styled.nav`
  position: relative;
`;

export const UserWrapper = styled.li`
  display: flex;
  align-items: center;
  flex-direction: row;
  padding: 0 25px;
  cursor: pointer;
`;

export const Avatar = styled.div``;

export const Name = styled.p`
  margin: 0 10px;
`;

export const DropItem = styled.div`
  z-index: 9000;
  padding: 20px 30px;
  width: 100%;
  cursor: pointer;
  background: #fff;
  
  &:hover {
    background: ${(props) => props.theme.lightgray}
  }
`;

export const Dropdown = styled.div`
  z-index: 8000;
  border-radius: 5px;
  display: flex;
  flex-direction: column;
  width: 250px;
  background: transparent;
  box-shadow: ${(props) => props.theme.boxShadow};
`;

export const Wrapper = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  display: flex;
  flex-direction: column;
  width: 250px;
  background-color: transparent;
`;

export const Transparent = styled.div`
  box-shadow: 0;
  z-index: 8001;
  opacity: 0.1;
  background-color: transparent;
  height: 50px;
  cursor: pointer;
`;
