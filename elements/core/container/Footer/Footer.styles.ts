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
  padding: 20px 15px;

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
  justify-content: space-evenly;
  align-items: center;
  margin: 10px 0;
`;
