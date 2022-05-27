import React, { useRef, useEffect } from "react";
import styled from "styled-components";
import { useBudgets, MISCELLANEOUS_BUDGET_ID } from "../../context";
import { CgClose } from "react-icons/cg";
import format from "date-fns/format";

const ExpenseModal = ({ expenseModal, handleExpense, expenseBudgetId }) => {
  const descriptionRef = useRef("");
  const amountRef = useRef("");
  const budgetIdRef = useRef("");
  const dateRef = useRef("");
  const { budgets, addExpense } = useBudgets();

  useEffect(() => {
    if (amountRef.current) {
      amountRef.current.focus();
    }
  }, [expenseModal]);

  const handleSubmitExp = (event) => {
    event.preventDefault();
    addExpense({
      description: descriptionRef.current.value,
      amount: parseFloat(amountRef.current.value),
      budgetId: budgetIdRef.current.value,
      date: dateRef.current.value,
    });
    handleExpense();
  };

  const defaultDate = format(new Date(), "yyyy-MM-dd'T'HH:mm");

  return (
    <>
      {expenseModal ? (
        <Overlay>
          <div className="modal">
            <span onClick={() => handleExpense()}>
              <CgClose />
            </span>
            <h2>Add Expense</h2>
            <section>
              <form onSubmit={handleSubmitExp}>
                <div>
                  <label>Amount: </label>
                  <input type="number" required min="0" ref={amountRef} />
                </div>
                <div>
                  <label>Select Category: </label>
                  <select defaultValue={expenseBudgetId} ref={budgetIdRef}>
                    <option id={MISCELLANEOUS_BUDGET_ID}>Miscellaneous</option>;
                    {budgets.map((budget) => {
                      return (
                        <option key={budget.id} value={budget.id}>
                          {budget.name}
                        </option>
                      );
                    })}
                  </select>
                </div>
                <div>
                  <label>Description: </label>
                  <input
                    type="text"
                    required
                    ref={descriptionRef}
                    placeholder="Write note"
                  />
                </div>
                <div>
                  <label>Date: </label>
                  <input
                    type="datetime-local"
                    ref={dateRef}
                    defaultValue={defaultDate}
                  />
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
  span {
    position: absolute;
    top: 15px;
    right: 20px;
    font-size: 1.2rem;
    cursor: pointer;
  }
`;
