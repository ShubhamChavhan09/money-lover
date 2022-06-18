import React, { useState } from "react";
import { Link, Outlet } from "react-router-dom";
import styled from "styled-components";
import MiscellaneousCard from "../components/miscellaneous-card";
import { useBudgets, MISCELLANEOUS_BUDGET_ID } from "../context";
import Lists from "./Lists";
import ExpenseModal from "../components/expense-modal";
import { Main, Head, Container, BudgetContainer, Tab } from "./Budgets";
import TotalCard from "../components/total-card";
import ExpenseList from "../components/expense-list";
import ViewExpense from "../components/view-expense";
import DeleteModal from "../components/delete-modal";

const Expenses = () => {
  const [expenseModal, setExpenseModal] = useState(false);
  const [expenseBudgetId, setExpenseBudgetId] = useState("");
  const [expenseData, setExpenseData] = useState(null);
  const [viewExpenseTab, setViewExpenseTab] = useState(false);
  const [deleteModal, setDeleteModal] = useState(false);
  const { expenses, deleteExpense } = useBudgets();

  const handleExpense = (budgetId) => {
    setExpenseModal(!expenseModal);
    setExpenseBudgetId(budgetId);
  };

  // console.log({ expenseData });

  const misExp = expenses.filter((exp) => {
    return exp.budgetId === MISCELLANEOUS_BUDGET_ID;
  });

  return (
    <>
      <Container>
        <Head>
          <TotalCard name="add expenses" click={handleExpense} />
        </Head>
        <Main>
          <ExpenseContainer>
            <div>
              <div className="tab">Last Month</div>
              <div className="tab">This Month</div>
            </div>
            <ExpenseList
              setExpenseData={setExpenseData}
              toggle={setViewExpenseTab}
            />
          </ExpenseContainer>
          <ExpTab>
            {expenseData && viewExpenseTab && (
              <ViewExpense
                id={expenseData.id}
                budgetId={expenseData.budgetId}
                date={expenseData.date}
                amount={expenseData.amount}
                title="Transaction details"
                toggle={setViewExpenseTab}
                des={expenseData.description}
                setDeleteModal={setDeleteModal}
                expenseBudgetId={expenseBudgetId}
              />
            )}
          </ExpTab>
        </Main>
      </Container>
      <ExpenseModal
        handleExpense={handleExpense}
        expenseModal={expenseModal}
        expenseBudgetId={expenseBudgetId}
      />
      {expenseData && (
        <DeleteModal
          deleteModal={deleteModal}
          toggle={setDeleteModal}
          deleteId={expenseData?.id}
          toggleTab={setViewExpenseTab}
          func={deleteExpense}
          alert="Delete this transaction?"
        />
      )}
    </>
  );
};

export default Expenses;

const ExpenseContainer = styled(BudgetContainer)`
  width: 650px;
  background: #f4f4f4;
  box-shadow: 0 3px 7px 0 rgb(0 0 0 / 27%);

  & > div {
    background: #ffffff;
    display: flex;
  }
`;

const CardCategory = styled.div`
  height: 70px;
  width: 100%;
  border-top: 1px solid #e4e4e4;
  border-bottom: 1px solid #e4e4e4;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 20px;
`;

const Left = styled.div`
  display: flex;
  flex-direction: column;

  p {
    font-size: 14px;
    font-weight: 500;
  }
  span {
    font-size: 14px;
    padding: 2px 0px;
    color: #969696;
  }
`;

const Right = styled(Left)`
  p {
    font-size: 17px;
  }
`;

const Card = styled(CardCategory)`
  height: 55px;
  border: none;
  p {
    font-size: 11px;
  }
  p.date {
    font-size: 32px;
    margin-right: 15px;
  }
  span {
    font-size: 11px;
    padding: 2px 0px;
    color: #969696;
  }
  div.day {
    display: flex;
    flex-direction: column;
    align-items: start;
    justify-content: center;
  }
  p.amount {
    font-size: 14px;
    font-weight: 300;
  }
`;

const ExpTab = styled.div`
  // position: -webkit-sticky;
  position: sticky;
  top: 0;
`;
