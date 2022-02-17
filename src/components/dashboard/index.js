import React, { useState } from "react";
import styled from "styled-components";
import BudgetCard from "../budget-card";
import BudgetModal from "../budget-modal";

const Dashboard = () => {
  const [budgetModal, setBudgetModal] = useState(false);

  const handleBudget = () => {
    setBudgetModal(!budgetModal);
  };

  return (
    <>
      <Container>
        <h1>Money Lover</h1>
        <div>
          <button onClick={handleBudget}>Add Budget</button>
          <button>Add Expense</button>
        </div>
        <div className="budget">
          <BudgetCard />
        </div>
      </Container>
      <BudgetModal handleBudget={handleBudget} budgetModal={budgetModal} />
    </>
  );
};

export default Dashboard;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  border: 1px solid black;
  width: 60%;
  min-height: 100vh;
  position: relative;

  button {
    margin: 0 10px;
    padding: 5px 10px;
    outline: none;
    cursor: pointer;
  }

  div.budget {
    width: 100%;
  }
`;
