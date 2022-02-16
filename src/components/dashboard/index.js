import styled from "styled-components";

const Dashboard = () => {
  return (
    <Container>
      <h1>Money Lover</h1>
      <div>
        <button>Add Budget</button>
        <button>Add Expense</button>
      </div>
    </Container>
  );
};

export default Dashboard;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  border: 1px solid black;
  width: 50%;
  min-height: 100vh;

  button {
    margin: 0 10px;
    padding: 5px 10px;
    outline: none;
    cursor: pointer;
  }
`;
