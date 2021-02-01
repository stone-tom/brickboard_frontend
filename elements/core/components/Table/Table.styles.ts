import styled, { css } from 'styled-components';
import Icon from '../Icon/Icon';

export const TableWrapper = styled.div`
  overflow-x: scroll;
`;

export const Table = styled.table`
  background: #fff;
  width: 100%;
  border: 1px solid ${(props) => props.theme.gray};
`;
export const TableHeaderItem = styled.th`
  padding: 0 20px;
  border-bottom: 1px solid ${(props) => props.theme.gray};
`;

export const TableRow = styled.tr<{
  inactive?: boolean,
}>`

  ${(props) => props.inactive && css`
    opacity: .5;
   
  `}

  height: 50px;
`;

export const TableData = styled.td<{
  fullWidth?: boolean,
}>`
  text-align: center;
  color: ${(props) => props.theme.black};
  font-weight: 300;
  padding: 0 20px;

  ${(props) => props.fullWidth && css`
    width: 100%; 
  `}
`;

export const TableSortButton = styled.button`
  background: none;
  padding: 0;
  border: 0;
  cursor: pointer;
  font-weight: 700;
  display: flex;
  align-items: center;
  margin: auto;

  &:focus {
    outline: none;
  }
`;

export const TableSortButtonArrow = styled(Icon)<{
  dir?: string
}>`
  transition: all .3s ease 0s;
  display: flex;
  color: ${(props) => props.theme.brickred};
  transform: rotate(${(props) => (props.dir === 'desc' ? '0deg' : '180deg')})
`;

export const EmptyFont = styled.td`
  font-size: 16px;
  font-weight: 700;
  padding: 20px 0;
  text-align: center;
  width: 100%;
`;
