import styled, { css } from 'styled-components';
import { Button } from '../../../core/components/Button/Button.styles';

export const Wrapper = styled.div`
  padding: 20px;
  flex: 0 0 50%;
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
  isEditing: boolean,
}>`
  margin: 0 10px;

  ${(props) => props.isEditing && css`
    color: green;
  `}
`;
