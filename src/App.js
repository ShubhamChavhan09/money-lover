import styled from "styled-components";
import Dashboard from "./components/dashboard";
import GlobalStyle from "./global-styles";

function App() {
  return (
    <Container>
      <GlobalStyle />
      <Dashboard />
    </Container>
  );
}

export default App;

const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`;
