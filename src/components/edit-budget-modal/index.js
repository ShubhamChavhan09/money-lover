import React, { useRef, useEffect, useState } from "react";
import styled from "styled-components";
import { useBudgets } from "../../context";
import { CgClose } from "react-icons/cg";
import { Delete } from "../view-expense";
import ModalButtons from "../modal-buttons";

const EditBudgetModal = ({
  budgetModal,
  setBudgetModal,
  id,
  name,
  amount,
  toggleViewBudget,
}) => {
  const [names, setNames] = useState(name);
  const [amounts, setAmounts] = useState(amount);
  const modalRef = useRef("");
  const { updateBudget } = useBudgets();

  const handleBudget = () => {
    setBudgetModal(!budgetModal);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    updateBudget(id, {
      names,
      amounts,
    });
    setBudgetModal(!budgetModal);
    toggleViewBudget(false);
  };

  return (
    <>
      {budgetModal ? (
        <Overlay ref={modalRef} width="350px" height="390px">
          <div className="modal">
            {/* <CloseModal  /> */}
            <Title>
              <p>Edit Budget</p>
            </Title>
            <Form section="240px" onSubmit={handleSubmit}>
              <section>
                <Box>
                  <div>
                    <p>Name</p>
                  </div>
                  <div>
                    <input
                      required
                      type="text"
                      onChange={(e) => setNames(e.target.value)}
                      value={names}
                    />
                  </div>
                </Box>
                <Box>
                  <div>
                    <p>Amount</p>
                  </div>
                  <div>
                    <input
                      type="number"
                      min="0"
                      onChange={(e) => setAmounts(e.target.value)}
                      value={amounts}
                    />
                  </div>
                </Box>
                <Box>
                  <div>
                    <p>Date</p>
                  </div>
                  <div>
                    <input type="date" placeholder="select" />
                  </div>
                </Box>
              </section>
              <ModalButtons cancel={handleBudget} />
            </Form>
          </div>
        </Overlay>
      ) : null}
    </>
  );
};

export default EditBudgetModal;
export const Overlay = styled.div`
  position: fixed;
  z-index: 10;
  display: flex;
  inset: 0;
  background: rgba(0, 0, 0, 0.5);

  div.modal {
    color: black;
    margin: auto;
    background: #ffffff;
    height: ${(props) => props.height};
    width: ${(props) => props.width};
    // position: relative;
    border-radius: 4px;

    // box-shadow: 35px 35px 70px #a8a8a8, -35px -35px 70px #ffffff;
    // z-index: 2;
  }

  section {
    padding: 24px 24px 0;
    font-size: 14px;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    align-items: center;
    // flex-wrap: wrap;
    // gap: 10px;
    //
    height: 100%;
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
  height: ${(props) => props.section};
  input,
  select {
    height: 32px;
    width: 100%;
    // margin: 10px 0;
    font-size: 14px;
    // background: rgba(30, 39, 46, 0.2);
    border: none;
    outline: none;
    padding-top: 8px;
  }
`;

export const Box = styled.div`
  width: 250px;
  height: 60px;
  border: 2px solid #e4e4e4;
  border-radius: 8px;
  padding: 4px 16px;
  margin-bottom: 10px;

  & > div {
    flex: 1;
  }
  p {
    font-size: 12px;
  }
`;

export const Title = styled.div`

    padding: 20px 24px;
    height: 64px;
    display: flex;
    justify-content: start;
    align-items: center;
    border-bottom: 2px solid #e4e4e4;

    p {
      font-size: 20px;
      font-weight: 500;
    }
  }
`;
