import styled from 'styled-components';

export const PaginationWrapper = styled.div`
  display: flex;
  align-items: center;

  @media ${(props) => props.theme.breakpoints.sm} {
    margin: 20px 0;
  }
`;
