import styled from 'styled-components';

export const Card = styled.div`
  position: relative;
  height: 200px;
  width: 300px;
  color: #fff;
  cursor: pointer;
`;
export const Thumbnail = styled.div`
  position: relative;
  height: 100%;
  width: 100%;
`;

export const CreatorInformation = styled.div`
  position: absolute;
  bottom: 0;
  display: flex;
  flex-direction: column;
  padding: 20px 5px 10px 10px;
  width: 100%;
  background: linear-gradient(to top, #000, rgba(0,0,0,0));

`;
export const Creator = styled.p``;

export const CreatedAt = styled.p`
  font-size: 12px;
`;

export const VideoTitle = styled.p`
  position: absolute;
  top: 0;
  padding: 10px 5px 20px 10px;
  width: 100%;
  background: linear-gradient(to bottom, #000, rgba(0,0,0,0));
`;
