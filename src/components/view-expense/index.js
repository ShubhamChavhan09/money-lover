import React, { useState } from "react";
import styled from "styled-components";
import { CgClose } from "react-icons/cg";
import { useBudgets } from "../../context";
import { format } from "date-fns";
import { currencyFormatter } from "../../utils";
import EditExpenseModal from "../edit-expense-modal";
import { MISCELLANEOUS_BUDGET_ID } from "../../context";

const ViewExpense = ({ title, toggle, setDeleteModal, data, setSelectId }) => {
  const [expenseModal, setExpenseModal] = useState(false);

  const handleDelete = () => {
    setDeleteModal(true);
  };

  const handleEdit = () => {
    setExpenseModal(true);
    setSelectId(data.id);
  };

  return (
    <>
      <Container>
        <Head>
          <div>
            <Close onClick={() => toggle(false)} />
            <p>{title}</p>
          </div>
          <div>
            <Delete onClick={handleDelete}>DELETE</Delete>
            <Edit onClick={handleEdit}>EDIT</Edit>
          </div>
        </Head>
        <Details>
          <h3>{data.name}</h3>
          <p>{format(new Date(data.date), "EEEE, dd/MM/yy")}</p>
          <hr />
          <p>{data.description}</p>
          <span>{currencyFormatter.format(Math.abs(data.amount))}</span>
        </Details>
      </Container>
      <EditExpenseModal
        expenseModal={expenseModal}
        setExpenseModal={setExpenseModal}
        data={data}
        toggleViewExpense={toggle}
      />
    </>
  );
};

export default ViewExpense;

const Container = styled.div`
  background: #ffffff;
  width: min(100%, 600px);
  height: 274px;
  border-radius: 4px;
  display: flex;
  flex-direction: column;
  box-shadow: 0 3px 7px 0 rgb(0 0 0 / 27%);
  margin: 0 auto;
`;
const Head = styled.div`
  height: 64px;
  padding: 0 1rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-bottom: 1px solid #e4e4e4;

  & > div {
    display: flex;
    align-items: center;
  }
  p {
    font-size: clamp(0.9rem, 1.7vw, 1.7vw);

    font-weight: 500;
  }
`;

const Close = styled(CgClose)`
  font-size: 1.25rem;
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
  font-size: clamp(0.7rem, 2vw, 0.85rem);
  width: min(4rem, 5rem);
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
    font-size: 0.75rem;
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
  font-size: 0.9rem;
  height: 48px;
`;
