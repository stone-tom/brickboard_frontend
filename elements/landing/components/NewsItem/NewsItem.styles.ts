import styled from 'styled-components';

export const NewsItemWrapper = styled.li`
  position: relative;
  width: 100%;
  height: 10rem;
`;

export const NewsInfos = styled.div`
  position: absolute;
  bottom: 0;
  left:0;
  background-color: ${(props) => props.theme.lightgray}
`;
