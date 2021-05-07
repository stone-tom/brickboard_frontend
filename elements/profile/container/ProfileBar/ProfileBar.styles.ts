import styled, { css } from 'styled-components';
import Button from '../../../core/components/Button/Button';

export const ProfileBarWrapper = styled.div`
  background: ${(props) => props.theme.lightgray};
  min-height: 80px;
  width: 100%;
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: space-between;
  align-items: center;
  padding: 0 20px;
  border-bottom: 1px solid ${(props) => props.theme.gray};

  @media ${(props) => props.theme.breakpoints.sm} {
    justify-content: center;
  }
`;

export const Username = styled.p`
  font-size: 24px;
  font-weight: 700;

  @media ${(props) => props.theme.breakpoints.sm} {
    justify-content: center;
    margin: 20px 0 10px 0;
  }
`;

export const Statistics = styled.div`
  display: flex;
  flex-direction: row;
`;

export const ButtonWrapper = styled.div`
  display: flex;
  flex-direction: row;

  @media ${(props) => props.theme.breakpoints.sm} {
    margin: 10px 0;
  }
`;

export const StatusChangeButton = styled(Button) <{
  color: string,
}>`
  margin: 0 10px;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  color: #fff;
  padding: 10px;

  ${(props) => props.color && css`
    background: ${(props.theme[props.color])};
  `}

  svg {
    margin-right: 10px;
  }
`;
