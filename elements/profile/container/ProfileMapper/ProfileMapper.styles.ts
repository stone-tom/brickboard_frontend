import styled, { css } from 'styled-components';
import { Button } from '../../../core/components/Button/Button.styles';

export const Wrapper = styled.div`
  padding: 60px;
  flex: 0 0 40%;
`;

export const MapperHeadline = styled.h3`
  border-bottom: 4px solid ${(props) => props.theme.brickred};
  margin-bottom: 10px;
  font-size: 24px;
  display: flex;
  justify-content: space-between;
`;

export const ProfileMapperLine = styled.div`
  display: flex;
  flex-direction: column;
`;

export const EditMapping = styled(Button)<{
  color: string,
}>`
  margin: 0 10px;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;

  ${(props) => props.color && css`
    color: ${(props.theme[props.color])};
  `}

  svg {
    margin-right: 10px;
  }
`;
