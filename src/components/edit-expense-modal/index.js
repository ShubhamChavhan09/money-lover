import React, { useState, useRef, useEffect } from "react";
import styled from "styled-components";
import { useBudgets, MISCELLANEOUS_BUDGET_ID } from "../../context";
import format from "date-fns/format";
import Select from "react-select";
import { Overlay, Title, Box, Form } from "../budget-modal";
import ModalButtons from "../modal-buttons";

const EditExpenseModal = ({
  expenseModal,
  setExpenseModal,
  amount,
  date,
  des,
  name,
}) => {
  const { budgets, addExpense } = useBudgets();

  const [budgetCat, setBudgetCat] = useState(name);
  const [amountVal, setAmountVal] = useState(amount);
  const [newDate, setNewDate] = useState(date);
  const [notes, setNotes] = useState(des);

  const handleSubmitExp = (event) => {
    event.preventDefault();
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

  const handleExpense = () => {
    setExpenseModal((currExpenseModal) => !currExpenseModal);
  };

  return (
    <>
      {expenseModal ? (
        <Overlay width="350px" height="466px">
          <div className="modal">
            {/* <CloseModal onClick={() => handleExpense()} /> */}
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
                      defaultValue={name}
                      onChange={(e) => setBudgetCat(e.target.value)}
                    >
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
                    <input
                      type="number"
                      required
                      min="0"
                      value={amount}
                      onChange={(e) => setAmountVal(e.target.value)}
                    />
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
                      onChange={(e) => setNewDate(e.target.value)}
                      defaultValue={date}
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
                      placeholder="Note"
                      value={notes}
                      onChange={(e) => setNotes(e.target.value)}
                    />
                  </div>
                </Box>
              </section>

              <ModalButtons cancel={handleExpense} />
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
