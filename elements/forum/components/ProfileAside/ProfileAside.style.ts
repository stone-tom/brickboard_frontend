import styled, { css } from 'styled-components';

export const ProfileAside = styled.aside`
  background-color: ${(props) => props.theme.gray};

  @media ${(props) => props.theme.breakpoints.sm}{
    display: grid;
    grid-template-columns: 100px 100px auto;
    grid-template-rows: 100px 35px;
  }

`;

export const ImageWrapper = styled.div``;

export const ProfileAsideHeading = styled.a`
  transition: all 0.3s;
  background-color: ${(props) => props.theme.brickred};
  color: white;
  padding: .5rem;
  text-align: center;
  display: block;

  &:hover{
    background-color: ${(props) => props.theme.brickredDark};
  }
  @media ${(props) => props.theme.breakpoints.sm}{
    grid-row-start: 2;
    grid-row-end: 3;
    grid-column-start: 1;
    grid-column-end: 4;
  }
`;
export const ProfileCondensedInfo = styled.div`
  display: grid;
  height: 200px;

  @media ${(props) => props.theme.breakpoints.sm}{
    height: 100px;
    grid-row-start: 1;
    grid-row-end: 2;
    grid-column-start: 1;
    grid-column-end: 2;
  }
`;

export const ProfileImageWrapper = styled.div`
  position: relative;
  max-height: 200px;
  max-width: 200px;


`;

export const BadgeInfoWrapper = styled.div`
  @media ${(props) => props.theme.breakpoints.sm}{
      grid-row-start: 1;
      grid-row-end: 2;
      grid-column-start: 2;
      grid-column-end: 4;

      display: flex;
      align-items: center;
    }
`;

export const ProfileAsideFact = styled.div<{
  hideOnMobile?: boolean,
}>`
  display: flex;
  justify-content: center;
  padding: 0.5rem;

  @media ${(props) => props.theme.breakpoints.sm}{
    padding: 0;
    ${(props) => props.hideOnMobile && css`
      display: none;
    `}
    > div > div {
      flex-direction: row;
      p{
        display: none;
      }
      >div {
        margin-bottom: 0;
      }
    }
  }
  
`;
