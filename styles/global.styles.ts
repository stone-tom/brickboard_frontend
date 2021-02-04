import styled, { createGlobalStyle, css } from 'styled-components';
import 'balloon-css';

const GlobalStyles = createGlobalStyle`
  font-size: 16px;

  @font-face {
    font-family: "Nunito";
    font-style: "normal";
    font-weight: 400;
    src: url(/fonts/nunito-regular-webfont.woff2) format("woff2"),
      url(/fonts/nunito-regular-webfont.woff) format("woff");
  }

  @font-face {
    font-family: "Nunito";
    font-style: "normal";
    font-weight: 300;
    src: url(/fonts/nunito-light-webfont.woff2) format("woff2"),
      url(/fonts/nunito-light-webfont.woff) format("woff");
  }

  @font-face {
    font-family: "Nunito";
    font-style: "normal";
    font-weight: 200;
    src: url(/fonts/nunito-extralight-webfont.woff2) format("woff2"),
      url(/fonts/nunito-extralight-webfont.woff) format("woff");
  }

  @font-face {
    font-family: "Nunito";
    font-style: "normal";
    font-weight: 500;
    src: url(/fonts/nunito-bold-webfont.woff2) format("woff2"),
      url(/fonts/nunito-bold-webfont.woff) format("woff");
  }

  @font-face {
    font-family: "Poppins";
    font-style: "normal";
    font-weight: 400;
    src: url(/fonts/poppins-regular-webfont.woff2) format("woff2"),
      url(/fonts/poppins-regular-webfont.woff) format("woff");
  }

  @font-face {
    font-family: "Poppins";
    font-style: "normal";
    font-weight: 400;
    src: url(/fonts/poppins-regular-webfont.woff2) format("woff2"),
      url(/fonts/poppins-regular-webfont.woff) format("woff");
  }

  @font-face {
    font-family: "Poppins";
    font-style: "norsmal";
    font-weight: 400;
    src: url(/fonts/poppins-regular-webfont.woff2) format("woff2"),
      url(/fonts/poppins-regular-webfont.woff) format("woff");
  }

  @font-face {
    font-family: "Poppins";
    font-style: "normal";
    font-weight: 600;
    src: url(/fonts/poppins-bold-webfont.woff2) format("woff2"),
      url(/fonts/poppins-bold-webfont.woff) format("woff");
  }

  @font-face {
    font-family: "Poppins";
    font-style: "normal";
    font-weight: 200;
    src: url(/fonts/poppins-extralight-webfont.woff2) format("woff2"),
      url(/fonts/poppins-extralight-webfont.woff) format("woff");
  }
  
  html {
    box-sizing: border-box;
    padding: 0;
    margin: 0;
    font-family: "Nunito",-apple-system, BlinkMacSystemFont, Segoe UI, Roboto, Oxygen,
      Ubuntu, Cantarell, Fira Sans, Droid Sans, Helvetica Neue, sans-serif;
  }

  *,
  ::before,
  ::after {
    box-sizing: inherit;
  }

  body {
    margin: 0;
  }

  ul {
    padding: 0;
    margin: 0;
    list-style-type: none;
  }

  h1,
  h2,
  h3,
  h4,
  p {
    margin: 0;
  }

  h1,
  h2,
  h3 {
    font-family: "Nunito",-apple-system, BlinkMacSystemFont, Segoe UI, Roboto, Oxygen,
      Ubuntu, Cantarell, Fira Sans, Droid Sans, Helvetica Neue, sans-serif;
    font-weight: 500;
  }

  a {
    color: inherit;
    text-decoration: none;
  }

  img {
    max-width: 100%;
  }
`;

export default GlobalStyles;

export const ViewWrapper = styled.div <{
  center?: boolean,
}>`
  
  ${(props) => props.center && css`
    display: flex;
    justify-content: center;
    align-items: center;
  `}

  min-height: calc(100vh - 80px);
  padding: 15px;
  max-width: ${(props) => props.theme.max_container_width};
  margin: 0 auto;
`;

export const Hint = styled.p`
  background-color: ${(props) => props.theme.warning};
  width: 100%;
  padding: .5rem;
`;

export const FlexRight = styled.div`
  display: flex;
  justify-content: flex-end;
`;

export const FlexBetween = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

export const Wrapper = styled.div`
  margin: 20px 0;
`;

export const FlexEvenly = styled.div`
  display: flex;
  justify-content: space-evenly;
  align-items: center;
  flex-wrap: wrap;
`;
