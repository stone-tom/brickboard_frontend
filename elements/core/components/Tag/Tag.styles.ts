import styled from 'styled-components';

export const TagWrapper = styled.div`
  margin: 5px 0;
  display: inline-flex;
  flex-directiom: row;
  justify-content: center;
  align-items: center;
  flex-wrap: wrap;
  border-radius: 2px;
  background: ${(props) => props.theme.brickred};
  color: ${(props) => props.theme.white};
  font-size: 12px;
  padding: 2px;
  margin-right: 5px;
`;
