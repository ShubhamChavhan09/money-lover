import { createGlobalStyle } from "styled-components";

const GlobalStyle = createGlobalStyle`

*
 {
    box-sizing: border-box;
    margin: 0;
    padding: 0;
}

body, html{
    // background-image: linear-gradient(to right, #141e30, #243b55);
    background: linear-gradient(to right , #434343 0%, black 100% );
    width: 100vw;
    height: 100vh;
    font-family: 'Inter', sans-serif;
    color: rgba(189, 195, 199,1); 
    font-size: 15px;
}
`;

export default GlobalStyle;
