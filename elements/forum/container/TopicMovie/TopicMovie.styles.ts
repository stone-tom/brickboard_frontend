import styled from 'styled-components';
import ButtonComponent from '../../../core/components/Button/Button';

export const TopicMovieWrapper = styled.div`
  width: 100%;
  display: flex;
  flex-direction: row;
  margin-top: 10px;
  position: relative;

  @media ${(props) => props.theme.breakpoints.sm} {
    flex-wrap: wrap;
  }
`;

export const Key = styled.div`
  margin-right: 10px;
  font-weight: 700;
`;

export const Values = styled.div`
  display: flex;
  flex-direction: row;
`;

export const VideoWrapper = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  width: 80%;

  @media ${(props) => props.theme.breakpoints.sm}{
    width: 100%;
  }
`;

export const InformationWrapper = styled.div`
  display: flex;
  flex-direction: column;
  flex-wrap: wrap;
  justify-content: flex-start;
  margin: 0 0 20px 0;
`;

export const Element = styled.div`
  margin: 10px 10px 10px 0;
  display: flex;
  flex-direction: column;
`;

export const EditButton = styled(ButtonComponent)`
  position: absolute;
  right: 0;
  top: 0;
`;
