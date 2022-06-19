import { useRef, useEffect } from "react";
import { useBudgets } from "../../context";
import format from "date-fns/format";
import { Title, Box, Form, Section } from "../budget-modal";
import ModalButtons from "../modal-buttons";
import Modal from "../modal";
import { AnimatePresence } from "framer-motion";
import { Category } from "../../category";

const ExpenseModal = ({ expenseModal, close }) => {
  const descriptionRef = useRef("");
  const amountRef = useRef("");
  const dateRef = useRef("");
  const nameRef = useRef("");
  const { addExpense } = useBudgets();

  useEffect(() => {
    if (amountRef.current) {
      amountRef.current.focus();
    }
  }, [expenseModal]);

  const handleSubmitExp = (event) => {
    event.preventDefault();
    addExpense({
      name: nameRef.current.value,
      amount: parseFloat(amountRef.current.value),
      date: dateRef.current.value,
      description: descriptionRef.current.value,
    });
    close();
  };

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
                    <select ref={nameRef}>
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
              <ModalButtons cancel={close} />
            </Form>
          </Modal>
        ) : null}
      </AnimatePresence>
    </>
  );
};
export default ExpenseModal;
