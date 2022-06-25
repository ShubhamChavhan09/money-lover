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
      </Router>
    </Container>
  );
}

export default App;

const Container = styled.div`
  display: flex;
  max-width: 1600px;
  align-items: start;
  height: 100vh;
  overflow: hidden;
  padding-bottom: 10px;
  margin: 0 auto;

  @media (max-width: 768px) {
    padding-bottom: 3.8rem;
  }
`;
