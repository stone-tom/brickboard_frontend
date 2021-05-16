import styled from 'styled-components';

export const ImpressumContainer = styled.section`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-wrap: wrap;
`;

export const ImpressumTextWrapper = styled.div`
  width: 50%;
  display: flex;
  justify-content: center;
  align-items: center;

  @media ${(props) => props.theme.breakpoints.sm}{
    width: 100%;
  }
`;

export const ImpressumHeading = styled.h1`
 margin-bottom: 2rem;
`;

export const ImpressumImageWrapper = styled.div`
  width: 50%;
  min-height: 400px;
  display: block;
  position: relative;
  @media ${(props) => props.theme.breakpoints.sm}{
    width: 100%;
  }
`;
