import React, { useState } from "react";
import { Overlay, Title } from "../budget-modal";
import { Close } from "../view-budget";
import { useBudgets } from "../../context";
import styled from "styled-components";
import ExpenseListItems from "../expense-list-items";
import ViewExpense from "../view-expense";
import Modal from "../modal";
import { AnimatePresence } from "framer-motion";
import { currencyFormatter } from "../../utils";

const ViewBudgetExpense = ({ showBudgetExpense, close, id, name }) => {
  const { expenses } = useBudgets();
  const [expenseData, setExpenseData] = useState("");
  const [viewExpenseModal, setViewExpenseModal] = useState(false);

  const handleClose = () => {
    close((currClose) => !currClose);
  };

  const expense = expenses.filter((expense) => {
    return expense.name === name;
  });

  const dates = expense.map((items) => {
    return items.date;
  });

  //sorted date
  const sort = dates.sort(function (a, b) {
    const date1 = new Date(a);
    const date2 = new Date(b);
    return date2 - date1;
  });

  const allExpenses = dates.map((items) => {
    return expense.filter((date) => {
      return date.date === items;
    });
  });

  const totalAmount = expense.reduce(
    (total, expense) => total + expense.amount,
    0
  );

  const handleClick = (list) => {
    setExpenseData(list);
    setViewExpenseModal(true);
  };

  return (
    <>
      <AnimatePresence
        initial={false}
        exitBeforeEnter={true}
        onExitComplete={() => null}
      >
        {showBudgetExpense && (
          <Modal width={"496px"} height={"600px"}>
            <Title>
              <TopLeft>
                <Close onClick={handleClose} />
                <p>{name}</p>
              </TopLeft>
              <div>
                <p>{currencyFormatter.format(totalAmount)}</p>
              </div>
            </Title>
            {expense.map((list) => {
              return (
                <ExpenseListItems
                  key={list.id}
                  id={list.budgetId}
                  selectedExpense={list}
                  handleClick={handleClick}
                />
              );
            })}
          </Modal>
        )}
      </AnimatePresence>
      <AnimatePresence
        initial={false}
        exitBeforeEnter={true}
        onExitComplete={() => null}
      >
        {viewExpenseModal && (
          <Modal>
            <ViewExpense
              id={expenseData.id}
              budgetId={expenseData.budgetId}
              date={expenseData.date}
              amount={expenseData.amount}
              title="Transaction details"
              toggle={setViewExpenseModal}
              des={expenseData.description}
              // setDeleteModal={setDeleteModal}
              // expenseBudgetId={expenseBudgetId}
            />
          </Modal>
        )}
      </AnimatePresence>
    </>
  );
};

export default ViewBudgetExpense;

const Card = styled.div`
  height: 70px;
  width: 100%;
  box-shadow: 0 -3px 0 #c6c6c6;
  border-bottom: 1px solid #e4e4e4;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 20px;

  div.date {
    display: flex;
    align-items: center;
  }
  div.year {
    display: flex;
    flex-direction: column;
    color: #969696;
  }

  p {
    font-size: 34px;
    margin-right: 20px;
  }
  span {
    font-size: 0.75rem;
  }
  span.day {
    font-weight: 500;
  }
  p.amount {
    font-size: 0.9rem;
    font-weight: 300;
  }
`;

const Lists = styled.div`
  width: 100%;
  border-top: 1px solid #e4e4e4;
  border-bottom: 1px solid #e4e4e4;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 40px;
  height: 55px;
  border: none;
  cursor: pointer;
  transition: all 0.2s linear;

  div {
    display: flex;
    flex-direction: column;
    color: #969696;
  }
  p {
    font-size: 0.9rem;
    font-weight: 500;
  }
  span {
    font-size: 0.75rem;
  }
`;

export const TopLeft = styled.div`
  display: flex;
  align-items: center;
`;
