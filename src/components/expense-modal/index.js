import React, { useRef } from "react";
import styled from "styled-components";
import { useBudgets, MISCELLANEOUS_BUDGET_ID } from "../../context";

const ExpenseModal = ({ expenseModal, handleExpense }) => {
  const descriptionRef = useRef("");
  const amountRef = useRef("");

  const { budgets, expenses, addExpense } = useBudgets();

  const handleSubmitExp = (event) => {
    event.preventDefault();
    addExpense({
      description: descriptionRef.current.value,
      amount: amountRef.current.value,
    });
    handleExpense();
  };

  console.log(expenses);

  return (
    <>
      {expenseModal ? (
        <Overlay>
          <div className="modal">
            <span onClick={() => handleExpense()}>X</span>
            <h2>Expense</h2>
            <section>
              <form onSubmit={handleSubmitExp}>
                <div>
                  <label>Description: </label>
                  <input type="text" required ref={descriptionRef} />
                </div>
                <div>
                  <label>Amount: </label>
                  <input type="number" required min="0" ref={amountRef} />
                </div>
                <div>
                  <label>Budget Category: </label>
                  <select>
                    <option id={MISCELLANEOUS_BUDGET_ID}>Miscellaneous</option>;
                    {budgets.map((budget) => {
                      return <option key={budget.id}>{budget.name}</option>;
                    })}
                  </select>
                </div>
                <button type="submit">Add Expense</button>
              </form>
            </section>
          </div>
        </Overlay>
      ) : null}
    </>
  );
};
export default ExpenseModal;

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
