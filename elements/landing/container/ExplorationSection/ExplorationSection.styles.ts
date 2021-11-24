import styled from 'styled-components';

export const ExplorationSectionWrapper = styled.section`
  max-width: ${(props) => props.theme.max_container_width};
  display: flex;
  flex-wrap: wrap;
  margin: 0 auto;
`;

export const ExplorationTextContainer = styled.div`
  background: ${(props) => props.theme.gray};
  border-radius: 5px;
  width: 45%;
  padding-left: 15px;
  padding-right: 15px;
  padding-bottom: 4rem;

  @media (max-width: ${(props) => props.theme.burger_break}){
    width: 100%;
  }
  @media ${(props) => props.theme.breakpoints.sm}{
    padding-bottom: 2rem;
  }
`;

export const ExplorationContent = styled.div`
  width: 55%;
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  grid-template-rows: 200px 200px 200px;
  grid-template-areas: 
  "avatar1 video1 video1"
  "video2 video2 avatar2"
  "avatar3 video3 video3";
  grid-gap: 15px;
  padding-left: 15px;
  padding-right: 15px;

  @media (max-width: ${(props) => props.theme.burger_break}){
    width: 100%;
  }

  @media ${(props) => props.theme.breakpoints.sm}{
    display: flex;
    flex-wrap: wrap;
    padding-top: 1rem;
  }
`;

export const ExplorationText = styled.p`
  padding-left: 15px;
  padding-right: 5rem;
  font-size: 1rem;
`;

export const ExplorationAvatar = styled.a`
  position: relative;
  box-shadow: ${(props) => props.theme.boxShadow};
  overflow: hidden;

  &:hover{
    >div{
      transform: translateY(0);
    }
  }
  @media ${(props) => props.theme.breakpoints.sm}{
    height: 300px;
    width: 100%;
  }
`;

export const ExplorationVideoInfos = styled.div`
  transition: all 0.3s ease-in-out;
  transform: translateY(100%);
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(51,51,51,0.9);
  color: ${(props) => props.theme.white};
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const ExplorationAvatarInfos = styled.div`
  transition: all 0.3s ease-in-out;
  transform: translateY(100%);
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(51,51,51,0.9);
  color: ${(props) => props.theme.white};
  display: flex;
  justify-content: center;
  flex-direction: column;
  align-items: center;
`;

export const ExplorationVideo = styled.a`
  position: relative;
  box-shadow: ${(props) => props.theme.boxShadow};
  overflow: hidden;

  &:hover{
    >div{
      transform: translateY(0);
    }
  }
  @media ${(props) => props.theme.breakpoints.sm}{
    height: 200px;
    width: 100%;
  }
`;

export const Video1 = styled(ExplorationVideo)`
  grid-area: video1;
`;

export const Video2 = styled(ExplorationVideo)`
  grid-area: video2;
`;

export const Video3 = styled(ExplorationVideo)`
  grid-area: video3;
`;

export const ExplorationHeading = styled.h2`
  padding: 2rem 15px 1rem 15px;
  position: relative;
  margin-top: 4rem;

  &::before{
    content: '';
    width: 50px;
    height: 5px;
    background: ${(props) => props.theme.grayfont};
    position: absolute;
    top: 0;
    left: 1rem;
  }

  @media ${(props) => props.theme.breakpoints.sm}{
    width: auto;
    padding: 2rem 0 1rem 0;
    margin-top: 2rem;
    &::before{
    left: 0;
  }
  }
`;

export const ExplorationVideoPlay = styled.div`
  margin-left: 2rem;
`;

export const ExplorationVideoContent = styled.div`
  max-width: 70%;
`;
