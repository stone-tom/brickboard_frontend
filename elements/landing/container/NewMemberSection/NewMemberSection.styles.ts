import styled from 'styled-components';

export const NewMemberWrapper = styled.section`
  background: linear-gradient(
    to right,
    ${(props) => props.theme.lightgray} 0%,
    ${(props) => props.theme.lightgray} 50%,
    ${(props) => props.theme.gray} 50%,
    ${(props) => props.theme.gray} 100%
  );

  @media (max-width: 950px){
    background: ${(props) => props.theme.gray};
  }
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
  flex-wrap: wrap;

  @media (max-width: 950px){
    padding-left: 0;
    padding-right: 0;
  }

`;

export const NewestMemberContent = styled.div`
  display: block;
  padding: 1rem 0 1rem 1rem;

  @media (max-width: 950px){
    margin-left: 0;
  }
`;

export const NewMemberBody = styled.div`
  padding-top: 1rem;
  display: flex;
  flex-wrap: wrap;
  justify-content: center;

`;

export const NewMemberHeading = styled.h2`
  border-bottom: 5px solid ${(props) => props.theme.brickred};
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
  padding-left: 2rem;

`;

export const MemberFact = styled.div`
  margin-bottom: 0.5rem;
  margin-top: 0.5rem;
`;
