import React from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import { currencyFormatter } from "../../utils";

const BudgetCard = ({ handleExpense, amount, name, max, id, hidden }) => {
  const rate = (amount / max) * 100;

  function setProgressVariant(amount, max) {
    const ratio = amount / max;
    if (ratio < 0.6) return "rgba(76, 209, 55,0.75)";
    if (ratio < 0.8) return "rgba(255, 211, 42,0.75)";
    return "rgba(232, 65, 24,0.7)";
  }

  const classNames = [];
  if (amount > max) {
    classNames.push("danger");
  }

  return (
    <>
      <Card className={classNames}>
        <h3>{name}</h3>
        {(max || max === `0`) && (
          <div>
            <p> {currencyFormatter.format(max)}</p>
            <ProgressBar variant={setProgressVariant(amount, max)}>
              <progress value={rate} max="100" />
            </ProgressBar>
          </div>
        )}

        <Data>
          <div>
            <span>Spent</span>
            <span>{currencyFormatter.format(amount)}</span>
          </div>
          {(max || max === `0`) && (
            <div>
              <span>{rate >= 100 ? "Over Spent" : "Left"}</span>
              <span>{currencyFormatter.format(Math.abs(max - amount))}</span>
            </div>
          )}
        </Data>
        <Buttons>
          <div>
            {!hidden && (
              <button onClick={() => handleExpense(id)}>Add Expense</button>
            )}
          </div>
          <div>
            {!hidden && (
              // <button onClick={() => handleViewExpense(id)}>View Expenses</button>
              <Link to={`expenses/${id}`}>
                <button>View Expenses</button>
              </Link>
            )}
          </div>
        </Buttons>
      </Card>
    </>
  );
};

export default BudgetCard;

const Card = styled.div`
  // border: 2px solid #718093;
  border-radius: 8px;
  height: 200px;
  width: 320px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  padding: 10px 20px;
  transition: all 0.5s ease;
  background: rgba(178, 190, 195, 0.2);

  h3,
  p {
    text-align: center;
  }

  &.danger {
    background-color: rgba(255, 127, 80, 0.5);
  }
`;

const ProgressBar = styled.div`
  color: #e67e22;
  display: flex;

  progress {
    width: 100%;
  }

  progress[value] {
    appearance: none;

    ::-webkit-progress-bar {
      height: 25px;
      border-radius: 5px;
      background-color: rgba(45, 52, 54, 0.8);
      outline: 1px solid rgba(30, 39, 46, 1);
    }

    ::-webkit-progress-value {
      height: 25px;
      border-top-left-radius: 5px;
      border-bottom-left-radius: 5px;
      border-top-right-radius: ${(props) =>
        props.variant === "rgba(232, 65, 24,0.7)" ? "5px" : "0"};
      border-bottom-right-radius: ${(props) =>
        props.variant === "rgba(232, 65, 24,0.7)" ? "5px" : "0"};
      background-color: ${(props) => props.variant};
      transition: all 0.5s linear;
    }
  }
`;

const Data = styled.div`
  // background: pink;
  margin: 20px 0 0 0;
  display: flex;
  justify-content: space-around;
  align-items: center;
  & > div {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;

    flex: 1;
  }
  & > div:nth-child(2) {
    border-left: 1.3px solid #34495e;
  }
`;

const Buttons = styled.div`
  display: flex;
  justify-content: center;

  button {
    border-radius: 5px;
    outline: none;
    border: none;
    background: #81ecec;
    // padding: 8px 12px;
    width: 120px;
    font-size: 12px;
  }
  button:hover {
    background: #00cec9;
    transition: all 0.1s linear;
  }
  button:active {
    background: #55efc4;
    transition: all 0.1s ease-in-out;
  }
`;
