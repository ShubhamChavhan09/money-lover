import React, { useState } from "react";
import styled from "styled-components";
import BudgetCard from "../budget-card";
import BudgetModal from "../budget-modal";
import ExpenseModal from "../expense-modal";

const Dashboard = () => {
  const [budgetModal, setBudgetModal] = useState(false);
  const [expenseModal, setExpenseModal] = useState(false);
  const [expenseBudgetId, setExpenseBudgetId] = useState();

  const handleBudget = () => {
    setBudgetModal(!budgetModal);
  };

  const handleExpense = (budgetId) => {
    setExpenseModal(!expenseModal);
    setExpenseBudgetId(budgetId);
    console.log(budgetId);
  };

  return (
    <>
      <Container budgetModal={budgetModal} expenseModal={expenseModal}>
        <h1>Money Lover</h1>
        <div>
          <button onClick={handleBudget}>Add Budget</button>
          <button onClick={handleExpense}>Add Expense</button>
        </div>
        <div className="budget">
          <BudgetCard handleExpense={handleExpense} />
        </div>
      </Container>
      <BudgetModal handleBudget={handleBudget} budgetModal={budgetModal} />
      <ExpenseModal
        handleExpense={handleExpense}
        expenseModal={expenseModal}
        expenseBudgetId={expenseBudgetId}
      />
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
  width: 100vw;
  min-height: 100vh;
  position: relative;
  filter: ${(props) => (props.budgetModal ? `blur(2px)` : null)};
  filter: ${(props) => (props.expenseModal ? `blur(2px)` : null)};
  transition: all 0.3s ease;

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
