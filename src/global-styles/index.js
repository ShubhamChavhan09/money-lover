import { createGlobalStyle } from "styled-components";

const GlobalStyle = createGlobalStyle`

*
 {
    box-sizing: border-box;
    margin: 0;
    padding: 0;
}

body{
    // background: #222222;
    background: linear-gradient(to right  , #111111 ,#222222 );
    width: 100vw;
    height: 100vh;
    font-family: 'Inter', sans-serif;
    color: #FDFDFD; 
    font-weight: 300;
    font-size: 15px;
    // background-repeat: no-repeat;
    background-size: cover;
}
`;

export default GlobalStyle;
