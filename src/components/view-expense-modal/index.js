import React from "react";
import styled from "styled-components";
import { useBudgets } from "../../context";

const ViewExpenseModal = ({ handleViewExpense, viewExpenses, expensedId }) => {
  const { getBudgetExpenses } = useBudgets();

  return (
    <>
      {viewExpenses ? (
        <Overlay>
          <div className="modal">
            <span onClick={handleViewExpense}>X</span>
            <h2>Expenses</h2>
            <div>
              {getBudgetExpenses(expensedId).map((expense) => (
                <p key={expense.id}>
                  <h3>{expense.description}</h3>
                  <h3>{expense.amount}</h3>
                </p>
              ))}
            </div>
          </div>
        </Overlay>
      ) : null}
    </>
  );
};

export default ViewExpenseModal;

const Overlay = styled.div`
  position: absolute;
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
  span {
    position: absolute;
    top: 15px;
    right: 20px;
    font-size: 1.2rem;
    cursor: pointer;
  }
`;
