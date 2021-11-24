import styled from 'styled-components';

export const NewMemberWrapper = styled.section`
  max-width: ${(props) => props.theme.max_container_width};
  margin: 0 auto;
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
  padding-top: 2rem;
  padding-bottom: 2rem;
  max-width: ${(props) => props.theme.max_container_width};
  margin: 0 auto;
  display: flex;
  justify-content: flex-end;
  flex-wrap: wrap;

  @media (max-width: 950px){
    padding-left: 0;
    padding-right: 0;
  }

`;

export const NewestMemberContent = styled.a`
  background: ${(props) => props.theme.brickredDark};
  width: 80%;
  padding: 8rem 0 8rem 0;
  border-radius: 10px;
  box-shadow: ${(props) => props.theme.boxShadow};
  color: ${(props) => props.theme.white};
  transition: all 0.3s;
  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;

  @media (max-width: 950px){
    margin-left: 0;
  }
`;

export const MemberShipDate = styled.span`
  font-size: 0.8rem;
`;

export const NewMemberBody = styled.div`
`;

export const NewMemberHeading = styled.h2`
  font-size: 2.5rem;
  margin-bottom: 2rem;
`;

export const NewMemberProfileImage = styled.div`
  display: block;
  width: 350px;
  height: 350px;
  position: absolute;
  top: 5rem;
  left: -150px;
  box-shadow: ${(props) => props.theme.boxShadow};
  border-radius: 10px;
  overflow: hidden;
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
  font-size: 1.5rem;
  margin-bottom: 0.2rem;
`;
