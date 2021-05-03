import styled from 'styled-components';

export const UserCardWrapper = styled.div`
  position: relative;
  height: 250px;
  width: 250px;
  transition: transform .3s;
  cursor: pointer;

  &:hover {
    z-index: 100;
    transform: scale(1.1);
    transition: transform .3s;
  }
`;
export const Name = styled.p`
  position: absolute;
  bottom: 0;
  display: flex;
  flex-direction: column;
  padding: 10px 5px 10px 10px;
  width: 100%;
  background: linear-gradient(to top, #000, rgba(0,0,0,0));
  color: ${(props) => props.theme.white};
`;
