import React from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import { currencyFormatter } from "../../utils";
import { BsTrash } from "react-icons/bs";
import { useBudgets } from "../../context";

const BudgetCard = ({
  amount,
  name,
  max,
  id,
  setBudgetData,
  setViewBudgetTab,
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

  const handleClick = () => {
    setBudgetData(id);
    setViewBudgetTab(true);
  };

  return (
    <>
      <Card onClick={handleClick}>
        <Top>
          <div>
            <Title>{name}</Title>
          </div>
          <Details>
            <div>
              <p> {currencyFormatter.format(max)}</p>
            </div>
            <div>
              <span>
                {rate > 100 ? "Over Spent  " : "Left "}
                {currencyFormatter.format(Math.abs(max - amount))}
              </span>
            </div>
          </Details>
        </Top>

        {(max || max === `0`) && (
          <ProgressBar variant={setProgressVariant(amount, max)}>
            <progress value={rate} max="100" />
          </ProgressBar>
        )}
      </Card>
    </>
  );
};

export default BudgetCard;

const Card = styled.div`
  border-top: 1px solid #e4e4e4;
  border-bottom: 1px solid #e4e4e4;
  height: 80px;
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  padding: 10px 20px 0 20px;
  transition: all 0.2s linear;
  // background: rgba(178, 190, 195, 0.2);
  cursor: pointer;

  &:hover {
    background: #f0faf1;
  }
`;

const ProgressBar = styled.div`
  // color: #e67e22;
  display: flex;
  align-items: start;
  justify-content: center;
  width: 100%;
  flex: 1;

  progress {
    width: 100%;
  }

  progress[value] {
    appearance: none;

    ::-webkit-progress-bar {
      height: 8px;
      border-radius: 5px;
      background-color: #dddddd;
      // outline: 1px solid #010101;
    }

    ::-webkit-progress-value {
      height: 8px;
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

const Top = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: start;
  flex: 2;
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

const Title = styled.p`
  font-size: 14px;
  font-weight: 500;
`;

const Details = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: end;
  p {
    font-size: 14px;
    font-weight: 500;
  }
  span {
    font-size: 12px;
    padding: 2px 0px;
    color: #969696;
  }
`;
const Bottom = styled.div`
  width: 100%;
`;
