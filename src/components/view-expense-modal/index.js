import React from "react";
import styled from "styled-components";
import { useBudgets, MISCELLANEOUS_BUDGET_ID } from "../../context";
import { CgCloseR, CgClose } from "react-icons/cg";
import { formatDistanceToNowStrict, format } from "date-fns";

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
      {
        viewExpenses && (
          // ? expensedId != null
          <Overlay>
            <div className="modal">
              <div className="header">
                <h2>Expenses - {budget?.name} </h2>
                {expensedId !== MISCELLANEOUS_BUDGET_ID && (
                  <button onClick={() => handleBudgetDelete(expensedId)}>
                    Delete
                  </button>
                )}
                <span className="close" onClick={handleViewExpense}>
                  <CgClose />
                </span>
              </div>
              <div>
                {getBudgetExpenses(expensedId).map((expense) => {
                  let result = formatDistanceToNowStrict(
                    new Date(expense.date),
                    {
                      includeSeconds: true,
                    }
                  );
                  let day = format(
                    new Date(expense.date),
                    "d LLL, yyyy 'at' h:mm aaa"
                  );

                  return (
                    <Expenses key={expense.id}>
                      <span>{expense.description}</span>
                      <span>
                        {/* {result} - */}
                        {day}
                        {/* ago */}
                      </span>

                      <span>
                        {expense.amount}

                        <span onClick={() => deleteExpense(expense.id)}>
                          <Close />
                        </span>
                      </span>
                    </Expenses>
                  );
                })}
              </div>
            </div>
          </Overlay>
        )
        // : null
      }
    </>
  );
};

export default ViewExpenseModal;

const Overlay = styled.div`
  position: fixed;
  z-index: 1;
  inset: 0;
  background: rgba(0, 0, 0, 0.2);
  display: flex;

  div.modal {
    margin: auto;
    background: #fff;
    height: 500px;
    width: 60%;
    position: relative;
    padding: 40px 25px;
    border-radius: 30px;
    background: #fcd8d4;
    box-shadow: 20px 20px 60px #d6b8b4, -20px -20px 60px #fff8f4;
    overflow: scroll;
  }
  span.close {
    font-size: 1.2rem;
    cursor: pointer;
    margin-left: auto;
  }

  div.header {
    display: flex;
    justify-content: flex-start;

    h2 {
      margin-right: 1rem;
    }
    button {
      padding: 5px;
    }
  }
`;

const Close = styled(CgCloseR)`
  font-size: 1.6rem;
  margin-left: 20px;
`;

const Expenses = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  border: 1px solid black;
`;
