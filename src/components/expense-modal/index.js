import React, { useState, useRef, useEffect } from "react";
import styled from "styled-components";
import { useBudgets, MISCELLANEOUS_BUDGET_ID } from "../../context";
import format from "date-fns/format";
import Select from "react-select";
import { Overlay, Title, Box, Form, Section } from "../budget-modal";
import ModalButtons from "../modal-buttons";
import Modal from "../modal";
import { AnimatePresence } from "framer-motion";

const ExpenseModal = ({ expenseModal, handleExpense }) => {
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
    const nameBudget = budgets.filter((budget) => {
      return budget.id === budgetIdRef.current.value;
    });

    const cat = nameBudget[0]?.name;

    const categoryName = cat ? cat : "Miscellaneous";

    addExpense({
      description: descriptionRef.current.value,
      amount: parseFloat(amountRef.current.value),
      budgetId: budgetIdRef.current.value,
      date: dateRef.current.value,
      category: categoryName,
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
      <AnimatePresence
        initial={false}
        exitBeforeEnter={true}
        onExitComplete={() => null}
      >
        {expenseModal ? (
          // <Overlay width="350px" height="466px">
          //   <div className="modal">

          <Modal width={"350px"} height={"466px"}>
            <Title>
              <p>Add Expense</p>
            </Title>
            <Form section="315px" onSubmit={handleSubmitExp}>
              <Section>
                <Box>
                  <div>
                    <p>Budget Category</p>
                  </div>
                  <div>
                    <select defaultValue={""} ref={budgetIdRef}>
                      <option id={MISCELLANEOUS_BUDGET_ID}>
                        Miscellaneous
                      </option>
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
              </Section>
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

            {/* </div>
        </Overlay> */}
          </Modal>
        ) : null}
      </AnimatePresence>
    </>
  );
};
export default ExpenseModal;

const SelectCategories = styled(Select)`
  // width: 80%;
  font-size: 14px;
`;
