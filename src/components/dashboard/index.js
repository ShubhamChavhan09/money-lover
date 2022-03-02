import React, { useState } from "react";
import styled from "styled-components";
import BudgetCard from "../budget-card";
import BudgetModal from "../budget-modal";
import ExpenseModal from "../expense-modal";
import MiscellaneousCard from "../miscellaneous-card";
import ViewExpenseModal from "../view-expense-modal";
import { useBudgets } from "../../context";
import TotalCard from "../total-card";

const Dashboard = () => {
  const [budgetModal, setBudgetModal] = useState(false);
  const [expenseModal, setExpenseModal] = useState(false);
  const [expenseBudgetId, setExpenseBudgetId] = useState();
  const [viewExpenses, setViewExpenses] = useState(false);
  const [expensedId, setExpensedId] = useState();

  const { budgets, getBudgetExpenses } = useBudgets();

  const handleBudget = () => {
    setBudgetModal(!budgetModal);
  };

  const handleExpense = (budgetId) => {
    setExpenseModal(!expenseModal);
    setExpenseBudgetId(budgetId);
  };

  const handleViewExpense = (id) => {
    setViewExpenses(!viewExpenses);
    setExpensedId(id);
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
          {budgets.map((budget) => {
            const amount = getBudgetExpenses(budget.id).reduce(
              (total, expense) => total + expense.amount,
              0
            );
            return (
              <BudgetCard
                key={budget.id}
                handleExpense={handleExpense}
                handleViewExpense={handleViewExpense}
                amount={amount}
                name={budget.name}
                max={budget.max}
                id={budget.id}
              />
            );
          })}

          <MiscellaneousCard
            handleViewExpense={handleViewExpense}
            handleExpense={handleExpense}
          />
          <TotalCard />
        </div>
      </Container>
      <BudgetModal handleBudget={handleBudget} budgetModal={budgetModal} />
      <ExpenseModal
        handleExpense={handleExpense}
        expenseModal={expenseModal}
        expenseBudgetId={expenseBudgetId}
      />
      <ViewExpenseModal
        viewExpenses={viewExpenses}
        handleViewExpense={handleViewExpense}
        expensedId={expensedId}
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
