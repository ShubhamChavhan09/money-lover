import styled from "styled-components";
import Dashboard from "./components/dashboard";
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
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;
