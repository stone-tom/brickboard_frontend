import styled from 'styled-components';
import Button from '../../../core/components/Button/Button';

export const BannerWrapper = styled.div`
  position: relative;
  width: 100%;
  height: 250px;
`;

export const EditButton = styled(Button)`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 40px;
  width: 40px;
  background: #fff;
  border-radius: 50%;
  margin: 5px;
  
  color: ${(props) => props.theme.black};
  background: rgba(255,255,255,0.80);

  &:hover {
    background: #fff;
  }
`;
