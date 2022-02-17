import React, { useRef } from "react";
import styled from "styled-components";
import { useBudgets } from "../../context";

const BudgetModal = ({ handleBudget, budgetModal }) => {
  const nameRef = useRef("");
  const maxRef = useRef("");
  const { budgets, addBudget } = useBudgets();

  const handleSubmit = (event) => {
    event.preventDefault();
    addBudget({
      name: nameRef.current.value,
      max: parseFloat(maxRef.current.value),
    });
    handleBudget();
  };

  console.log(budgets);

  return (
    <>
      {budgetModal ? (
        <Overlay>
          <div className="modal">
            <span onClick={() => handleBudget()}>X</span>
            <h2>Budget</h2>
            <section>
              <form onSubmit={handleSubmit}>
                <div>
                  <label>Name: </label>
                  <input type="text" required ref={nameRef} />
                </div>
                <div>
                  <label>Amount: </label>
                  <input type="number" required min="0" ref={maxRef} />
                </div>
                <button type="submit">Add Budget</button>
              </form>
            </section>
          </div>
        </Overlay>
      ) : null}
    </>
  );
};

export default BudgetModal;
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
    background: linear-gradient(145deg, #ffffff, #e6e6e6);
    box-shadow: 35px 35px 70px #a8a8a8, -35px -35px 70px #ffffff;
    z-index: 2;
  }
  span {
    position: absolute;
    top: 15px;
    right: 20px;
    font-size: 1.2rem;
    cursor: pointer;
  }
`;
