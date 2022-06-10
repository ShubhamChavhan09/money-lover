import React, { useState, useRef, useEffect } from "react";
import styled from "styled-components";
import { useBudgets, MISCELLANEOUS_BUDGET_ID } from "../../context";
import { CgClose } from "react-icons/cg";
import format from "date-fns/format";
import { groupedOptions } from "../../data/data";
import Select from "react-select";
import {
  Overlay,
  CloseModal,
  Button,
  Title,
  Box,
  ButtonContainer,
  Form,
} from "../budget-modal";
import ModalButtons from "../modal-buttons";

const ExpenseModal = ({ expenseModal, handleExpense, expenseBudgetId }) => {
  const [category, setCategory] = useState("");
  const [icon, setIcon] = useState();

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

  const handleSelectChange = (e) => {
    setIcon(e.value.type.name);
    setCategory(e.label);
  };

  const handleSubmitExp = (event) => {
    event.preventDefault();
    addExpense({
      description: descriptionRef.current.value,
      amount: parseFloat(amountRef.current.value),
      budgetId: budgetIdRef.current.value,
      date: dateRef.current.value,
      category,
      icon,
    });
    handleExpense();
  };

  // const defaultDate = format(new Date(), "yyyy-MM-dd'T'HH:mm");
  const defaultDate = format(new Date(), "yyyy-MM-dd");

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
            {/* <CloseModal onClick={() => handleExpense()} /> */}
            <Title>
              <p>Add Expense</p>
            </Title>
            <Form section="315px" onSubmit={handleSubmitExp}>
              <section>
                <Box>
                  <div>
                    <p>Budget Category</p>
                  </div>
                  <div>
                    <select defaultValue={expenseBudgetId} ref={budgetIdRef}>
                      <option id={MISCELLANEOUS_BUDGET_ID}>
                        Miscellaneous
                      </option>
                      ;
                      {budgets.map((budget) => {
                        return (
                          <option key={budget.id} value={budget.id}>
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
                    <input type="number" required min="0" ref={amountRef} />
                  </div>
                </Box>
                <Box>
                  <div>
                    <p>Date</p>
                  </div>
                  <div>
                    <input
                      style={{ width: "160px" }}
                      type="date"
                      // type="datetime-local"
                      ref={dateRef}
                      defaultValue={defaultDate}
                    />
                  </div>
                </Box>
                <Box>
                  <div>
                    <p>Note</p>
                  </div>
                  <div>
                    <input
                      type="text"
                      ref={descriptionRef}
                      placeholder="Note"
                    />
                  </div>
                </Box>
              </section>
              {/* <div>
                  <label>Expense category</label>

                  <SelectCategories
                    styles={customStyles}
                    onChange={handleSelectChange}
                    options={groupedOptions}
                    placeholder="Select category"
                    getOptionLabel={(e) => (
                      <div
                        style={{
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                        }}
                      >
                        {e.value}
                        {e.label}
                      </div>
                    )}
                  />
                </div> */}
              <ModalButtons cancel={handleExpense} />
            </Form>
          </div>
        </Overlay>
      ) : null}
    </>
  );
};
export default ExpenseModal;

const SelectCategories = styled(Select)`
  // width: 80%;
  font-size: 14px;
`;
