import styled from 'styled-components';
import { Button } from '../../../core/components/Button/Button.styles';
import { Icon } from '../../../core/components/Icon/Icon.styled';
import Indicator from '../../../core/components/Indicator/Indicator';

export const Spoiler = styled.div`
  width: 100%;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
`;

export const SpoilerWrapper = styled.div`
  width: 100%;
  background: ${(props) => props.theme.lightgray};
  margin: 5px 0;
`;

export const Name = styled.p`
  padding: 15px 15px;
`;

export const Status = styled(Indicator)``;

export const ToggleIcon = styled(Icon)`
  margin: 0 15px;
`;

export const ToggleButton = styled(Button)<{
  openToggle?: boolean,
}>`
  transform: rotate(${(props) => (props.openToggle ? '180deg' : '0deg')})
`;

export const PostList = styled.div`
  width: 100%;
  padding: 15px;
`;

export const UserWrapper = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  width: 30%;
`;
