import React from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import { currencyFormatter } from "../../utils";
import { BsTrash } from "react-icons/bs";
import { useBudgets } from "../../context";

const BudgetCard = ({
  handleExpense,
  handleViewExpense,
  amount,
  name,
  max,
  id,
  hidden,
  noDelete,
}) => {
  const { deleteBudget } = useBudgets();

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

  const handleDeleteBudget = (id) => {
    deleteBudget(id);
  };

  console.log(id);

  return (
    <>
      <Card>
        {!noDelete && <DeleteBudget onClick={() => handleDeleteBudget(id)} />}
        <p style={{ fontSize: "20px" }}>{name}</p>
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
            <div className={classNames}>
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
  border-radius: 5px;
  height: 200px;
  width: 320px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  padding: 10px 20px;
  transition: all 0.5s ease;
  // background: rgba(178, 190, 195, 0.2);
  background: #333333;
  position: relative;

  &:hover {
    background: #444;
  }

  h3,
  p {
    text-align: center;
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
      background-color: #222222;
      outline: 1px solid #010101;
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
    border-left: 2px solid #0c0c0c;
  }
  &.danger {
    background-color: rgba(255, 127, 80, 0.5);
  }
`;

const Buttons = styled.div`
  display: flex;
  justify-content: center;

  button {
    border-radius: 5px;
    outline: none;
    border: none;
    background: rgba(30, 39, 46, 1);
    color: rgba(189, 195, 199, 1);
    // padding: 8px 12px;
    width: 120px;
    font-size: 12px;
  }
  button:hover {
    background: rgba(30, 39, 46, 0.7);
    transition: all 0.1s linear;
  }
  button:active {
    background: #55efc4;
    transition: all 0.1s ease-in-out;
  }
`;

const DeleteBudget = styled(BsTrash)`
  font-size: 18px;
  position: absolute;
  top: 10px;
  right: 10px;
  cursor: pointer;

  &: hover {
    color: rgba(232, 65, 24, 0.6);
  }
`;
