import styled from 'styled-components';
import Button from '../../../core/components/Button/Button';

export const BannerWrapper = styled.div`
  position: relative;
  width: 100%;
  height: 250px;
`;

export const EditButton = styled(Button)`
  position: absolute;
  top: 20px;
  right: 20px;
  color: ${(props) => props.theme.black};
`;
