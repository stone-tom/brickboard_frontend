import styled from 'styled-components';

export const Overlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  height: 100vh;
  width: 100vw;
  background: rgba(0,0,0,.6);
  z-index: 9000;
  display: flex;
  align-items: center;
  justify-content: center;
`;
