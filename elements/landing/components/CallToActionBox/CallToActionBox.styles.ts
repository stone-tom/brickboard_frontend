import styled from 'styled-components';

export const CallToActionHeading = styled.h3`
  margin-bottom: 2rem;
  text-align: center;
`;

export const CallToActionWrapper = styled.div`
  width: 25%;
  display: flex;
  justify-content: flex-end;
  align-items: center;
  padding-left: 1rem;
  padding-top: 2rem;
  padding-bottom: 2rem;
  @media (max-width: 750px){
    width: 100%;
    justify-content: center;
    background-color: ${(props) => props.theme.lightgray};
  }
`;
