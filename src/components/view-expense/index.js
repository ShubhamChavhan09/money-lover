import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { useBudgets } from "../../context";
import { format } from "date-fns";
import { currencyFormatter } from "../../utils";
import EditExpenseModal from "../edit-expense-modal";
import { IoArrowBack } from "react-icons/io5";
import { useNavigate, useParams } from "react-router-dom";
import DeleteModal from "../delete-modal";
import { supabase } from "../../supabaseClient";

const ViewExpense = ({ toggle }) => {
  let { expenseId } = useParams();

  const { expenses, deleteExpense } = useBudgets();

  const [expenseData, setExpenseData] = useState([]);
  const [deleteModal, setDeleteModal] = useState(false);
  const [expenseModal, setExpenseModal] = useState(false);

  let navigate = useNavigate();

  useEffect(() => {
    expense();
  }, [deleteModal, expenseModal]);

  const expense = async () => {
    const { data, error } = await supabase
      .from("expenses")
      .select()
      .match({ id: expenseId });
    if (error) console.log("error", error);
    else setExpenseData(data);
  };

  const expName = expenseData[0]?.name;
  const expDate = expenseData[0]?.date;
  const expAmount = expenseData[0]?.amount;
  const expDescription = expenseData[0]?.description;

  //

  const handleDelete = () => {
    setDeleteModal(true);
  };

  const handleEdit = () => {
    setExpenseModal(true);
  };

  return (
    <>
      <Container>
        <Head>
          <div>
            <Close onClick={() => navigate("/expenses")} />
            <p>Transaction details</p>
          </div>
          <div>
            <Delete onClick={handleDelete}>DELETE</Delete>
            <Edit onClick={handleEdit}>EDIT</Edit>
          </div>
        </Head>
        <Details>
          <h3>{expName}</h3>
          <p>{expDate && format(new Date(expDate), "EEEE, dd/MM/yyyy")}</p>
          <hr />
          <p>{expDescription}</p>
          <span>{currencyFormatter.format(Math.abs(expAmount))}</span>
        </Details>
      </Container>
      <EditExpenseModal
        expenseModal={expenseModal}
        setExpenseModal={setExpenseModal}
        data={expenseData[0]}
        toggleViewExpense={toggle}
      />
      {deleteModal && (
        <DeleteModal
          deleteModal={deleteModal}
          toggle={setDeleteModal}
          deleteId={expenseId}
          func={deleteExpense}
          alert="Delete this transaction?"
          redirect={"/expenses"}
        />
      )}
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
  // box-shadow: 0 3px 7px 0 rgb(0 0 0 / 27%);
  background: linear-gradient(145deg, #f5f6fa, #ffffff);
  box-shadow: 27px 27px 54px #666666, -27px -27px 54px #ffffff;
  margin: auto;
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

const Close = styled(IoArrowBack)`
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
