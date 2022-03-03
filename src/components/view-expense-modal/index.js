import React from "react";
import styled from "styled-components";
import { useBudgets, MISCELLANEOUS_BUDGET_ID } from "../../context";
import { CgCloseR, CgClose } from "react-icons/cg";

const ViewExpenseModal = ({ handleViewExpense, viewExpenses, expensedId }) => {
  const { getBudgetExpenses, budgets, deleteBudget, deleteExpense } =
    useBudgets();

  const budget =
    MISCELLANEOUS_BUDGET_ID === expensedId
      ? { name: "Miscellaneous", id: MISCELLANEOUS_BUDGET_ID }
      : budgets.find((b) => b.id === expensedId);

  const handleBudgetDelete = (id) => {
    deleteBudget(id);
    handleViewExpense();
  };

  return (
    <>
      {viewExpenses
        ? expensedId != null && (
            <Overlay>
              <div className="modal">
                <div>
                  <span className="close" onClick={handleViewExpense}>
                    <CgClose />
                  </span>
                  <h2>{budget?.name} - Expenses</h2>
                  {expensedId !== MISCELLANEOUS_BUDGET_ID && (
                    <button onClick={() => handleBudgetDelete(expensedId)}>
                      Delete
                    </button>
                  )}
                </div>
                <div>
                  {getBudgetExpenses(expensedId).map((expense) => (
                    <div className="expenses" key={expense.id}>
                      <span>{expense.description}</span>
                      <span>
                        {expense.amount}
                        <span onClick={() => deleteExpense(expense.id)}>
                          <CgCloseR />
                        </span>
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </Overlay>
          )
        : null}
    </>
  );
};

export default ViewExpenseModal;

const Overlay = styled.div`
  position: fixed;
  z-index: 1;
  inset: 0;
  background: rgba(0, 0, 0, 0.2);
  display: block;
  padding-top: 70px;

  div.modal {
    margin: 0 auto;
    background: #fff;
    height: 500px;
    width: 60%;
    position: relative;
    padding: 40px 25px;
    border-radius: 30px;
    background: #fcd8d4;
    box-shadow: 20px 20px 60px #d6b8b4, -20px -20px 60px #fff8f4;
  }
  span.close {
    position: absolute;
    top: 15px;
    right: 20px;
    font-size: 1.2rem;
    cursor: pointer;
  }

  div.expenses {
    display: flex;
    justify-content: space-between;
    align-items: center;
    span {
      margin: 0 10px;
    }
  }
`;
