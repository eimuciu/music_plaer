import { createGlobalStyle } from "styled-components";

export const GlobalStyle = createGlobalStyle`
  body {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
    margin-bottom: 20px;
    
  }
  * {
    box-sizing: border-box;
  }
  
  html, body{
    height: 100%;
  }
`;
