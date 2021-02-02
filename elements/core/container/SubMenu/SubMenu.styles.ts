import styled from 'styled-components';

export const SubMenuWrapper = styled.div`
  display: flex;
  align-items: center;
  background-color: ${(props) => props.theme.lightgray};
  padding-left: 1rem;
  cursor: pointer;
`;

export const SubMenuImageWrapper = styled.div`
  margin-left: 1rem;
  display: flex;
  align-items: center;
`;

export const SubMenuContainer = styled.div`
  position: absolute;
  top: 100%;
  right: 0;
  display: flex;
  width: 150px;
  flex-direction: column;
  align-items: flex-end;
  background-color: ${(props) => props.theme.lightgray};
  color: ${(props) => props.theme.darkgray};
`;

export const SubMenuList = styled.ul`
  padding: 1rem;
`;

export const SubMenuListItem = styled.li`
  text-align: right;
  margin: 1rem 0;
`;
