import styled from 'styled-components';

export const NewestContentWrapper = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  margin-bottom: 2rem;

  @media ${(props) => props.theme.breakpoints.sm}{
    margin-bottom: 0;
  }
`;

export const NewestContent = styled.div`
  width: 49%;

  @media (max-width: ${(props) => props.theme.burger_break}){
    width: 100%;
  }
`;

export const NewestHeading = styled.h2`
  padding: 2rem 15px 2rem 15px;
  position: relative;
  margin-top: 1rem;

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
    padding: 2rem 0 2rem 0;
    &::before{
    left: 0;
  }
  }
`;

export const ContentLine = styled.div`
  background: ${(props) => props.theme.gray};
  width: 2px;

  @media (max-width: ${(props) => props.theme.burger_break}){
    display: none;
  }
`;

export const NewestContentText = styled.div`
  border-radius: 5px;
  padding: 15px;
  @media ${(props) => props.theme.breakpoints.sm}{
    padding-left: 0;
    padding-right: 0;
  }
`;

export const NewestMemberInfos = styled.div`
  padding-left: 2rem;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: space-between;

  @media ${(props) => props.theme.breakpoints.sm}{
    width: 100%;
    padding-left: 0;
    margin-top: 1rem;
    margin-bottom: 1rem;
  }

`;

export const NewestMemberWrapper = styled.div`
  display: flex;
  flex-wrap: wrap;
`;

export const NewestMemberAvatar = styled.div`
  position: relative;
  width: 210px;
  height: 210px;

  @media ${(props) => props.theme.breakpoints.sm}{
    width: 100%;
    height: 250px;
  }
`;

export const MemberShipDate = styled.span`
  font-size: 0.8rem;
  color: ${(props) => props.theme.grayfont};
`;

export const NewestTopicDate = styled.div`
  margin-top: 1rem;
  margin-bottom: 1rem;
`;

export const NewestTopicItem = styled.div`
  position: relative;
  background: ${(props) => props.theme.darkgray};
  display: flex;
  color: white;
  justify-content: center;
  align-items: center;
  height: 210px;
  width: 210px;

  svg{
    width: auto !important;
    height: auto !important;
    max-width: 60% !important;
    max-height: 60% !important;
  }
  @media ${(props) => props.theme.breakpoints.sm}{
    height: 250px;
    width: 100%;
  }
  
`;

export const NewestTopicMessageboard = styled.div`
  @media ${(props) => props.theme.breakpoints.sm}{
    margin-top: 1rem;
    margin-bottom: 1rem;
  }

`;
