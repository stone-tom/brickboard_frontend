import styled, { createGlobalStyle } from "styled-components";
import 'balloon-css';

const GlobalStyles = createGlobalStyle`

    @font-face {
        font-family: 'Nunito';
        font-style: 'normal';
        font-weight: 400;
        src: url(/fonts/nunito-regular-webfont.woff2) format('woff2'),
        url(/fonts/nunito-regular-webfont.woff) format('woff');
    }
    @font-face {
        font-family: 'Nunito';
        font-style: 'normal';
        font-weight: 300;
        src: url(/fonts/nunito-light-webfont.woff2) format('woff2'),
        url(/fonts/nunito-light-webfont.woff) format('woff');
    }
    @font-face {
        font-family: 'Nunito';
        font-style: 'normal';
        font-weight: 200;
        src: url(/fonts/nunito-extralight-webfont.woff2) format('woff2'),
        url(/fonts/nunito-extralight-webfont.woff) format('woff');
    }
    @font-face {
        font-family: 'Nunito';
        font-style: 'normal';
        font-weight: 500;
        src: url(/fonts/nunito-bold-webfont.woff2) format('woff2'),
        url(/fonts/nunito-bold-webfont.woff) format('woff');
    }
    @font-face {
        font-family: 'Poppins';
        font-style: 'normal';
        font-weight: 400;
        src: url(/fonts/poppins-regular-webfont.woff2) format('woff2'),
        url(/fonts/poppins-regular-webfont.woff) format('woff');
    }
    @font-face {
        font-family: 'Poppins';
        font-style: 'normal';
        font-weight: 400;
        src: url(/fonts/poppins-regular-webfont.woff2) format('woff2'),
        url(/fonts/poppins-regular-webfont.woff) format('woff');
    }
    @font-face {
        font-family: 'Poppins';
        font-style: 'norsmal';
        font-weight: 400;
        src: url(/fonts/poppins-regular-webfont.woff2) format('woff2'),
        url(/fonts/poppins-regular-webfont.woff) format('woff');
    }
    @font-face {
        font-family: 'Poppins';
        font-style: 'normal';
        font-weight: 600;
        src: url(/fonts/poppins-bold-webfont.woff2) format('woff2'),
        url(/fonts/poppins-bold-webfont.woff) format('woff');
    }
    @font-face {
        font-family: 'Poppins';
        font-style: 'normal';
        font-weight: 200;
        src: url(/fonts/poppins-extralight-webfont.woff2) format('woff2'),
        url(/fonts/poppins-extralight-webfont.woff) format('woff');
    }
    
    html{
        box-sizing: border-box;
        padding: 0;
        margin: 0;
        font-family: 'Nunito',-apple-system, BlinkMacSystemFont, Segoe UI, Roboto, Oxygen,
    Ubuntu, Cantarell, Fira Sans, Droid Sans, Helvetica Neue, sans-serif;
    }
    *, ::before, ::after{
        box-sizing: inherit;
    }
    ul{
        padding: 0;
        margin: 0;
        list-style-type: none;
    }
    h1,h2,h3,h4,p{
        margin: 0;
    }
    h1,h2,h3{
        font-family: 'Nunito',-apple-system, BlinkMacSystemFont, Segoe UI, Roboto, Oxygen,
    Ubuntu, Cantarell, Fira Sans, Droid Sans, Helvetica Neue, sans-serif;
        font-weight: 500;
    }
    a{
        color: inherit;
        text-decoration: none;
    }
    img{
        max-width: 100%;
    }
`;

export default GlobalStyles;