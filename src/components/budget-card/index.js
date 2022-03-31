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
  const rate = (amount / max) * 100;

  function setProgressVariant(amount, max) {
    const ratio = amount / max;
    if (ratio < 0.6) return "#44bd32";
    if (ratio < 0.8) return "#fbc531";
    return "#d63031";
  }

  const classNames = [];
  if (amount > max) {
    classNames.push("danger");
  }

  return (
    <>
      <Card className={classNames}>
        <div>
          <h2>{name}</h2>
          <span>
            {amount} {(max || max === `0`) && `/ ${max}`}
          </span>
        </div>
        <ProgressBar col={setProgressVariant(amount, max)}>
          {(max || max === `0`) && <progress value={rate} max="100" />}
        </ProgressBar>
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
  width: 280px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: stretch;
  padding: 10px;
  margin: 0 auto;
  transition: all 0.5s ease;

  div {
    display: flex;
    justify-content: space-between;
    align-items: center;
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
  button:active {
    background: #55efc4;
    transition: all 0.1s ease-in-out;
  }
  &.danger {
    background-color: rgba(255, 82, 82, 0.3);
  }
`;

const ProgressBar = styled.div`
  color: #e67e22;

  progress {
    width: 90%;
    margin: 0 auto;
  }

  progress[value] {
    appearance: none;

    ::-webkit-progress-bar {
      height: 10px;
      border-radius: 20px;
      background-color: #777;
    }

    ::-webkit-progress-value {
      height: 10px;
      border-radius: ${(props) => (props.col === "#d63031" ? "20px" : null)};
      background-color: ${(props) => props.col};
      transition: all 1s linear;
    }
  }
`;
