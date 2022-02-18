import React from "react";
import styled from "styled-components";
import { useBudgets } from "../../context";

const BudgetCard = ({ handleExpense }) => {
  const { budgets } = useBudgets();

  return (
    <>
      {budgets.map((budget) => {
        return (
          <Card key={budget.id}>
            <div>
              <h2>{budget.name}</h2>
              <span>Amount / {budget.max}</span>
            </div>
            <progress value="50" max="100" />
            <div>
              <button onClick={() => handleExpense(budget.id)}>
                Add Expense
              </button>
              <button>View Expenses</button>
            </div>
          </Card>
        );
      })}
    </>
  );
};

export default BudgetCard;

const Card = styled.div`
  text-align: left;
  border: 2px solid green;
  border-radius: 8px;
  height: 180px;
  width: 500px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: stretch;
  padding: 10px;
  margin: 0 auto;

  div {
    display: flex;
    justify-content: space-between;
  }
  button {
    border-radius: 8px;
    outline: none;
    border: none;
    background: #81ecec;
    padding: 8px 12px;
    width: 120px;
  }
  button:hover {
    background: #00cec9;
    transition: all 0.1s linear;
  }
  button: active {
    background: #55efc4;
    transition: all 0.1s linear;
  }
  progress {
    width: 60%;
    height: 30px;
    margin: 0 auto;
  }
`;
