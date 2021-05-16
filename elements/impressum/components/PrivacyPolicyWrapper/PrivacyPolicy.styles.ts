import styled from 'styled-components';

export const PrivacyPolicyContainer = styled.section`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-wrap: wrap;
`;

export const PrivacyPolicyTextWrapper = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;

  h2,h3{
    margin-bottom: 1rem;
  }
  p{
    margin-bottom: 0.5rem;
  }

  @media ${(props) => props.theme.breakpoints.sm}{
    width: 100%;
  }
`;

export const PrivacyPolicyHeading = styled.h1`
 margin-bottom: 2rem;
`;

export const PrivacyPolicyImageWrapper = styled.div`
  width: 50%;
  min-height: 400px;
  display: block;
  position: relative;
  @media ${(props) => props.theme.breakpoints.sm}{
    width: 100%;
  }
`;
