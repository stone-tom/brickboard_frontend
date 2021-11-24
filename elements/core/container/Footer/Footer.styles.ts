import styled from 'styled-components';

export const Footer = styled.footer`
  background-color: ${(props) => props.theme.darkgray}; 
  color: ${(props) => props.theme.white};
`;

export const FooterWrapper = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  max-width: ${(props) => props.theme.max_container_width};
  margin: 0 auto;
  padding: 50px 15px;

  @media ${(props) => props.theme.breakpoints.sm}{
   >div{
     width: 100%;
     padding-bottom: 2rem; 
   }
  }
`;

export const FooterBar = styled.div`
  height: 2px;
  width: 100%;
  border-radius: 3px;
  margin-bottom: 10px;
  display: block;
  background-color: ${(props) => props.theme.white};

  @media ${(props) => props.theme.breakpoints.sm}{
    margin-bottom: 2rem;
  }
`;

export const FooterRightList = styled.ul`
  display: flex;
  flex-direction: column;
  align-items: flex-end;

  @media ${(props) => props.theme.breakpoints.sm}{
    align-items: center;
  }
`;

export const LinksInformation = styled.p`
    @media ${(props) => props.theme.breakpoints.sm}{
    text-align: center;
  }
`;

export const FooterListItem = styled.li`
  margin: 5px 0;

  @media ${(props) => props.theme.breakpoints.sm}{
    text-align: center;
  }
`;

export const FooterIconsWrapper = styled.ul`
  display: flex;
  justify-content: flex-start;
  align-items: center;
  margin: 10px 0;

  a{
    display: block;
    margin-right: 20px;
  }
`;

export const FooterImageWrapper = styled.div`
  margin-bottom: 1rem;
`;

export const FooterCopyRightBar = styled.p`
  text-align: center;
  background-color: #222;
  padding: 1rem;
`;

export const FooterListHeading = styled.p`
  font-weight: bold;
  letter-spacing: 1.5px;
  margin-bottom: 1rem;
`;

export const FooterList = styled.ul`
  li{
    margin-bottom: 1rem;
  }
`;

export const FooterLink = styled.a`
  transition: all 0.3s;
  padding-bottom: 3px;
  &:hover{
    border-bottom: 1px solid ${(props) => props.theme.white};
  }
`;

export const FooterInformation = styled.div`

  @media ${(props) => props.theme.breakpoints.md} {
    width: 100%;
    margin-bottom: 50px;
  }
`;
