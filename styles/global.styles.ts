import styled, { createGlobalStyle } from "styled-components";
import 'balloon-css';

const GlobalStyles = createGlobalStyle`

    html{
        box-sizing: border-box;
        padding: 0;
        margin: 0;
    }
    *, ::before, ::after{
        box-sizing: inherit;
    }
    ul{
        padding: 0;
        margin: 0;
    }
    h1,h2,h3,h4,p{
        margin: 0;
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
