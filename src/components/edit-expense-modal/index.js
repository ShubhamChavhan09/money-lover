import React, { useState, useRef, useEffect } from "react";
import styled from "styled-components";
import { useBudgets } from "../../context";
import format from "date-fns/format";
import Select from "react-select";
import { Overlay, Title, Box, Form } from "../budget-modal";
import ModalButtons from "../modal-buttons";
import { Category } from "../../category";

const EditExpenseModal = ({ expenseModal, setExpenseModal, data }) => {
  const descriptionRef = useRef();
  const amountRef = useRef();
  const dateRef = useRef();
  const nameRef = useRef();

  const { addExpense } = useBudgets();

  const closeEditExpense = () => {
    setExpenseModal(false);
  };

  const handleSubmitExp = (event) => {
    event.preventDefault();
    addExpense({
      description: descriptionRef.current.value,
      amount: parseFloat(amountRef.current.value),
      date: dateRef.current.value,
      name: nameRef.current.value,
    });
    closeEditExpense();
  };

  const customStyles = {
    control: () => ({
      backgroundColor: "rgba(30, 39, 46, 0.2)",
      position: "relative ",
      borderRadius: "5px",
      height: "30px",
      width: "160px",
      display: "flex",
      alignItems: "center",
    }),
    dropdownIndicator: () => ({
      position: "absolute",
      right: 5,
      top: 5,
    }),
  };

  return (
    <>
      {expenseModal ? (
        <Overlay width="350px" height="466px">
          <div className="modal">
            <Title>
              <p>Edit Expense</p>
            </Title>
            <Form section="315px" onSubmit={handleSubmitExp}>
              <section>
                <Box>
                  <div>
                    <p>Budget Category</p>
                  </div>
                  <div>
                    <select
                      ref={nameRef}
                      defaultValue={data.name}
                      // onChange={(e) => setBudgetCat(e.target.value)}
                    >
                      {Category.map((budget) => {
                        return (
                          <option key={budget.id} value={budget.name}>
                            {budget.name}
                          </option>
                        );
                      })}
                    </select>
                  </div>
                </Box>
                <Box>
                  <div>
                    <p>Amount</p>
                  </div>
                  <div>
                    <input
                      ref={amountRef}
                      type="number"
                      required
                      min="0"
                      defaultValue={data.amount}
                      // onChange={(e) => setAmountVal(e.target.value)}
                    />
                  </div>
                </Box>
                <Box>
                  <div>
                    <p>Date</p>
                  </div>
                  <div>
                    <input
                      ref={dateRef}
                      style={{ width: "160px" }}
                      type="date"
                      // type="datetime-local"
                      // onChange={(e) => setNewDate(e.target.value)}
                      defaultValue={data.date}
                    />
                  </div>
                </Box>
                <Box>
                  <div>
                    <p>Note</p>
                  </div>
                  <div>
                    <input
                      ref={descriptionRef}
                      type="text"
                      placeholder="Note"
                      defaultValue={data.description}
                      // onChange={(e) => setNotes(e.target.value)}
                    />
                  </div>
                </Box>
              </section>

              <ModalButtons cancel={closeEditExpense} />
            </Form>
          </div>
        </Overlay>
      ) : null}
    </>
  );
};
export default EditExpenseModal;

const SelectCategories = styled(Select)`
  // width: 80%;
  font-size: 14px;
`;
