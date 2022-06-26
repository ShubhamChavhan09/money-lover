import { createGlobalStyle } from "styled-components";

const GlobalStyle = createGlobalStyle`

*
 {
    box-sizing: border-box;
    margin: 0;
    padding: 0;
}

body{
    background: #e4e4e4;
    width: 100vw;
    height: 100vh;
    font-family: 'Inter', sans-serif;
    color: #303030; 
    font-weight: 300;
    font-size: 15px;
    // background-repeat: no-repeat;
    background-size: cover;
}
`;

export default GlobalStyle;
