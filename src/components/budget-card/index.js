import React from "react";
import styled from "styled-components";
import { useBudgets } from "../../context";

const BudgetCard = ({
  handleExpense,
  handleViewExpense,
  amount,
  name,
  max,
  id,
  hidden,
}) => {
  const { budgets } = useBudgets();

  const rate = (amount / max) * 100;

  return (
    <>
      <Card>
        <div>
          <h2>{name}</h2>
          <span>
            {amount} {(max || max === `0`) && `/ ${max}`}
          </span>
        </div>
        {(max || max === `0`) && <progress value={rate} max="100" />}
        {!hidden && (
          <div>
            <button onClick={() => handleExpense(id)}>Add Expense</button>
            <button onClick={() => handleViewExpense(id)}>View Expenses</button>
          </div>
        )}
      </Card>
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
