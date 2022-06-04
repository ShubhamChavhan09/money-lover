import React, { useRef, useEffect } from "react";
import styled from "styled-components";
import { useBudgets } from "../../context";
import { CgClose } from "react-icons/cg";

const BudgetModal = ({ handleBudget, budgetModal }) => {
  const nameRef = useRef("");
  const maxRef = useRef("");
  const modalRef = useRef("");
  const { addBudget } = useBudgets();

  useEffect(() => {
    if (nameRef.current) {
      nameRef.current.focus();
    }
  }, [handleBudget]);

  const handleSubmit = (event) => {
    event.preventDefault();
    addBudget({
      name: nameRef.current.value,
      max: parseFloat(maxRef.current.value),
      created: new Date(),
    });
    handleBudget();
  };

  const close = (e) => {
    if (modalRef.current === e.target) {
      handleBudget();
    }
  };

  return (
    <>
      {budgetModal ? (
        <Overlay ref={modalRef} onClick={close} width="400px" height="400px">
          <div className="modal">
            <CloseModal onClick={() => handleBudget()} />
            <h2>Add a new budget</h2>
            <section>
              <Form onSubmit={handleSubmit}>
                <div>
                  <label>Name</label>
                  <input type="text" required ref={nameRef} />
                </div>
                <div>
                  <label>Amount</label>
                  <input type="number" required min="0" ref={maxRef} />
                </div>
                <div>
                  <Button type="submit">Add Budget</Button>
                </div>
              </Form>
            </section>
          </div>
        </Overlay>
      ) : null}
    </>
  );
};

export default BudgetModal;
export const Overlay = styled.div`
  position: fixed;
  z-index: 1;
  display: flex;
  inset: 0;
  background: rgba(0, 0, 0, 0.5);

  div.modal {
    color: black;
    margin: auto;
    background: #fff;
    height: ${(props) => props.height};
    width: ${(props) => props.width};
    position: relative;
    padding: 40px 25px;
    border-radius: 5px;
    background: linear-gradient(145deg, #ffffff, #e6e6e6);
    // box-shadow: 35px 35px 70px #a8a8a8, -35px -35px 70px #ffffff;
    // z-index: 2;
    h2 {
      margin-bottom: 10px;
    }
  }
`;

export const CloseModal = styled(CgClose)`
  position: absolute;
  top: 40px;
  right: 25px;
  font-size: 25px;
  cursor: pointer;
  // vertical-align: bottom;
`;

export const Form = styled.form`
  display: flex;
  flex-direction: column;

  & > div {
    display: flex;
    flex-direction: column;
    margin: 15px 0;
    font-size: 17px;
    font-weight: 300;
  }
  input {
    height: 30px;
    margin: 10px 0;
    font-size: 16px;
    background: rgba(30, 39, 46, 0.2);
    border: none;
    border-radius: 5px;
    padding: 0 10px;
  }
`;

export const Button = styled.button`
  height: 40px;
  margin: 20px 0;
  border-radius: 5px;
  background: #222222;
  color: rgba(189, 195, 199, 1);
  cursor: pointer;
  border: none;
  outline: none;

  &:hover {
    background: #3d3f43;
  }
`;
