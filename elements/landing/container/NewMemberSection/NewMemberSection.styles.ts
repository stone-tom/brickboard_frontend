import styled from 'styled-components';

export const NewMemberWrapper = styled.section`
  background: linear-gradient(
    to bottom,
    ${(props) => props.theme.white} 0%,
    ${(props) => props.theme.white} 20%,
    ${(props) => props.theme.brickredDark} 20%,
    ${(props) => props.theme.brickredDark} 80%,
    ${(props) => props.theme.lightgray} 80%,
    ${(props) => props.theme.lightgray} 100%
  );

`;

export const NewMemberRightHalf = styled.div`
  display: block;
  width: 50%;
  background-color: ${(props) => props.theme.gray};

  @media (max-width: 950px){
    width: 100%;
  }
`;

export const NewMemberLeftHalf = styled.div`
  display: block;
  width: 50%;
  background-image: url(/assets/images/construction.webp);
  background-size: contain;
  background-repeat: no-repeat;
  background-position: center;

  @media (max-width: 950px){
    width: 100%;
    min-height: 15rem;
    background-color: ${(props) => props.theme.white};
  }
`;

export const NewMemberContentContainer = styled.div`
  padding-left: 15px;
  padding-right: 15px;
  max-width: ${(props) => props.theme.max_container_width};
  margin: 0 auto;
  display: flex;
  justify-content: center;
  flex-wrap: wrap;

  @media (max-width: 950px){
    padding-left: 0;
    padding-right: 0;
  }

`;

export const NewestMemberContent = styled.a`
  display: block;
  background: ${(props) => props.theme.brickredDark};
  padding: 1rem 0 1rem 1rem;
  border-radius: 10px;
  box-shadow: ${(props) => props.theme.boxShadow};
  color: ${(props) => props.theme.white};
  transition: all 0.3s;
  
  &:hover{
    box-shadow: 0px 3px 10px 0px rgba(0, 0, 0, 0.5);
  }

  @media (max-width: 950px){
    margin-left: 0;
  }
`;

export const MemberShipDate = styled.span`
  font-size: 0.8rem;
`;

export const NewMemberBody = styled.div`
  padding-top: 1rem;
  display: flex;
  flex-wrap: wrap;
  justify-content: center;

`;

export const NewMemberHeading = styled.h2`
  
`;

export const NewMemberProfile = styled.div`
  display: block;
  width: 200px;
`;

export const ImageWrapper = styled.div`
  position: relative;
  width: 200px;
  height: 200px;
`;

export const NewMemberImageWrapper = styled.div`
  width: 200px;
  height: 200px;
  position: relative;
`;

export const NewMemberImage = styled.div`
  position: relative;
`;

export const NewMemberInfos = styled.div`
  padding: 0 2rem;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
`;

export const MemberFact = styled.p`
  margin-bottom: 0.5rem;
  margin-top: 0.5rem;
`;

export const MemberName = styled.p`
  font-weight: bold;
  margin-bottom: 0.2rem;
`;
