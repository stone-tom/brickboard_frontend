import styled from 'styled-components';

export const CommunitySectionWrapper = styled.section`
    background: linear-gradient(
    to bottom,
    ${(props) => props.theme.lightgray} 0%,
    ${(props) => props.theme.lightgray} 70%,
    ${(props) => props.theme.gray} 70%,
    ${(props) => props.theme.gray} 100%
  );
  padding-top: 8rem;
  padding-bottom: 8rem;
`;

export const CommunityHeadingWrapper = styled.div`
  width: 100%;
  margin-bottom: 2rem;
`;

export const CommunitySectionContainer = styled.div`
  max-width: ${(props) => props.theme.max_container_width};
  padding-left: 15px;
  padding-right: 15px;
  margin: 0 auto;
  display: flex;
  flex-wrap: wrap;
`;

export const UserShowCaseBody = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  align-items: center;
  padding-right: 15px;
  width: 100%;
  @media (max-width: 750px){
    width: 100%;
    justify-content: center;
  }
  @media (max-width: 500px){
    justify-content: center;
  }
`;

export const SubText = styled.p`

  color: ${(props) => props.theme.grayfont};
  margin-bottom: 5rem;

`;
