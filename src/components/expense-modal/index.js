import React, { useState, useRef, useEffect } from "react";
import styled from "styled-components";
import { useBudgets, MISCELLANEOUS_BUDGET_ID } from "../../context";
import { CgClose } from "react-icons/cg";
import format from "date-fns/format";
import { groupedOptions } from "../../data/data";
import Select from "react-select";
import { Overlay, CloseModal, Button } from "../budget-modal";

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
        <Overlay width="500px" height="500px">
          <div className="modal">
            <CloseModal onClick={() => handleExpense()} />

            <h2>Add Expense</h2>
            <section>
              <Form onSubmit={handleSubmitExp}>
                <div>
                  <label>Amount</label>
                  <input type="number" required min="0" ref={amountRef} />
                </div>
                <div>
                  <label>Budget Category</label>
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
                </div>
                <div>
                  <label>Description</label>
                  <input
                    type="text"
                    ref={descriptionRef}
                    placeholder="Write note"
                  />
                </div>
                <div>
                  <label>Date</label>
                  <input
                    style={{ width: "160px" }}
                    type="date"
                    // type="datetime-local"
                    ref={dateRef}
                    defaultValue={defaultDate}
                  />
                </div>
                <Button type="submit">Add Expense</Button>
              </Form>
            </section>
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

const Form = styled.form`
  display: flex;
  flex-direction: column;

  select {
    width: 160px;
    height: 30px;
    border-radius: 5px;
    background: rgba(30, 39, 46, 0.2);
    font-size: 14px;
  }

  & > div {
    display: flex;
    margin: 20px 0;
    font-size: 17px;
    font-weight: 300;
    width: 100%;
  }

  label {
    // background: salmon;
    width: 150px;
  }
  input {
    height: 30px;
    font-size: 14px;
    background: rgba(30, 39, 46, 0.2);
    border: none;
    border-radius: 5px;
    padding: 0 10px;
    width: ${(props) => (props.width ? `160px` : `70%`)};
  }
`;
