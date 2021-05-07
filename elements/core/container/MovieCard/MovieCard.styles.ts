import styled, { css } from 'styled-components';
import ButtonComponent from '../../components/Button/Button';

export const Card = styled.div<{
  unread?: boolean;
  disabled?: boolean;
}>`
  position: relative;
  height: 169px;
  width: 300px;
  color: #fff;
  cursor: pointer;

  ${(props) => props.unread && css`
   
    &::before{
      position: absolute;
      display: block;
      content: "";
      width: 60px;
      height: 60px;
      right: -5px;
      top: -2px;
      background-image: url('/assets/images/bookmark.png');
      background-repeat: no-repeat;
      background-size: contain;
      z-index: 10;
    }
  `}

  ${(props) => props.disabled && css`
    cursor: not-allowed;
  `};

`;
export const Thumbnail = styled.div`
  position: relative;
  height: 100%;
  width: 100%;
`;

export const CreatorInformation = styled.div`
  position: absolute;
  bottom: 0;
  text-align: left;
  display: flex;
  flex-direction: column;
  padding: 10px 5px 10px 10px;
  width: 100%;
  background: linear-gradient(to top, #000, rgba(0, 0, 0, 0));
`;
export const Creator = styled.p``;

export const CreatedAt = styled.p`
  font-size: 12px;
`;

export const VideoTitle = styled.p`
  position: absolute;
  text-align: left;
  top: 0;
  left: 0;
  padding: 10px 5px 10px 10px;
  width: 100%;
  background: linear-gradient(to bottom, #000, rgba(0, 0, 0, 0));
`;

export const CategoryWrapper = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
`;

export const LinkButton = styled(ButtonComponent)`
  z-index: 100;
  background: red;
`;
