import styled from 'styled-components';

export const Dot = styled.div<{
  color: string,
}>`
  background-color: ${(props) => props.color};

  border-radius: 50%;
  height: 8px;
  width: 8px;
  margin-right: 10px;
  text-align: center;
`;

export const Wrapper = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
`;
