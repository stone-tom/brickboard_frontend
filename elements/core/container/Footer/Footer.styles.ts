import styled from 'styled-components';

export const Footer = styled.footer`
    background-color: ${(props) => props.theme.darkgray}; 
    color: ${(props) => props.theme.white};
    width: 100vw;
`;

export const FooterWrapper = styled.div`
    max-width: 1170px;
    margin: 0 auto;
    padding: 20px 0;
`;
