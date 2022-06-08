import styled from "styled-components";
import GlobalStyle from "./global-styles";
import { BrowserRouter as Router } from "react-router-dom";
import RouterFiles from "./router-files";
import Navbar from "./components/navbar";

function App() {
  return (
    <Container>
      <Router>
        <GlobalStyle />
        <Navbar />
        <RouterFiles />
        {/* <Dashboard /> */}
      </Router>
    </Container>
  );
}

export default App;

const Container = styled.div`
  display: flex;
  width: 100%;
  align-items: start;
  height: 100vh;
`;
