import React from "react";
import styled from "styled-components";
import { CgClose } from "react-icons/cg";
import { useBudgets } from "../../context";
import { format } from "date-fns";
import { currencyFormatter } from "../../utils";

const ViewExpense = ({
  title,
  id,
  toggle,
  budgetId,
  date,
  amount,
  des,
  deleteEl,
  setDeleteModal,
}) => {
  const { budgets } = useBudgets();

  const budgetName = budgets.filter((budget) => {
    return budget.id === budgetId;
  });

  const handleDelete = () => {
    setDeleteModal(true);
  };

  return (
    <Container>
      <Head>
        <div>
          <Close onClick={() => toggle(false)} />
          <p>{title}</p>
        </div>
        <div>
          <Delete onClick={handleDelete}>DELETE</Delete>
          <Edit>EDIT</Edit>
        </div>
      </Head>
      <Details>
        <h3>{budgetName[0].name}</h3>
        <p>{format(new Date(date), "EEEE, dd/MM/yy")}</p>
        <hr />
        <p>{des}</p>
        <span>{currencyFormatter.format(Math.abs(amount))}</span>
      </Details>
    </Container>
  );
};

export default ViewExpense;

const Container = styled.div`
  background: #ffffff;
  width: 600px;
  height: 274px;
  border-radius: 4px;
  display: flex;
  flex-direction: column;
  box-shadow: 0 3px 7px 0 rgb(0 0 0 / 27%);
  // position: fixed;
  right: 20px;
  // // top: 60px;
`;
const Head = styled.div`
  height: 64px;
  padding: 0 24px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-bottom: 1px solid #e4e4e4;

  & > div {
    display: flex;
    align-items: center;
  }
  p {
    font-size: 20px;
    font-weight: 500;
  }
`;

const Close = styled(CgClose)`
  font-size: 20px;
  margin-right: 18px;
  cursor: pointer;
  color: #969696;

  &:hover {
    color: #303030;
  }
`;
export const Delete = styled.button`
  border: none;
  outline: none;
  color: #f45a5a;
  background: transparent;
  font-size: 14px;
  width: 100px;
  height: 36px;
  cursor: pointer;
  border-radius: 4px;

  &:hover {
    background: #f45a5a21;
  }
`;
const Edit = styled(Delete)`
  color: #2db84c;
  &:hover {
    background: #2db84c21;
  }
`;
const Details = styled.div`
  display: flex;
  flex-direction: column;
  padding: 8px 60px;
  height: 186px;
  margin-top: 8px;
  h3 {
    font-size: 24px;
    margin: 10px 0;
  }
  p {
    font-size: 12px;
    color: #969696;
  }
  hr {
    width: 120px;
    margin: 12px 0;
  }
  span {
    font-size: 34px;
  }
`;

const View = styled(Head)`
  justify-content: center;
  font-size: 14px;
  height: 48px;
`;
