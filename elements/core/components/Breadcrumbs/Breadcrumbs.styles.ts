import styled from 'styled-components';

export const BreadcrumbsWrapper = styled.ul`
  display: flex;
  align-items: center;
  margin-bottom: 1rem;
  margin-top: 2rem;
  flex-wrap: wrap;

  @media ${(props) => props.theme.breakpoints.xs}{
     font-size: 0.8rem;
     
    }
`;
