import styled from 'styled-components';

export const CommunitySectionWrapper = styled.section`
  background: linear-gradient(
    to right,
    ${(props) => props.theme.gray} 0%,
    ${(props) => props.theme.gray} 50%,
    ${(props) => props.theme.lightgray} 50%,
    ${(props) => props.theme.lightgray} 100%
  );

  @media (max-width: 750px){
    background: ${(props) => props.theme.gray};
  }
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
  padding-top: 2rem;
  padding-bottom: 2rem;
  padding-right: 15px;
  width: 75%;
  background-color: ${(props) => props.theme.gray};

  @media (max-width: 750px){
    width: 100%;
    justify-content: center;
  }
  @media (max-width: 500px){
    justify-content: center;
  }
`;
