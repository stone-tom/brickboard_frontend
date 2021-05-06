import styled from 'styled-components';
import Button from '../../../core/components/Button/Button';
import Indicator from '../../../core/components/Indicator/Indicator';

export const Name = styled.p``;

export const DataWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  width: 200px;
`;

export const Status = styled(Indicator)``;

export const Header = styled.div`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: space-between;
  align-items: center;
  width: 90%;
`;

export const DeclineButton = styled(Button)`
  color: red; 
`;

export const AcceptButton = styled(Button)`
  color: green;
  margin-right: 20px;
`;

export const ButtonWrapper = styled.div`
  display: flex;
  justify-content: flex-end;

  @media ${(props) => props.theme.breakpoints.xs} {
    margin-top: 10px;
  }
`;
