import { useRef } from "react";
import styled from "styled-components";
import { useBudgets } from "../../context";

import Select from "react-select";
import { Overlay, Title, Box, Form } from "../budget-modal";
import ModalButtons from "../modal-buttons";
import { Category } from "../../category";
import { useNavigate } from "react-router-dom";

const EditExpenseModal = ({ expenseModal, setExpenseModal, data }) => {
  const descriptionRef = useRef();
  const amountRef = useRef();
  const dateRef = useRef();
  const nameRef = useRef();

  let navigate = useNavigate();

  const { updateExpense } = useBudgets();

  const closeEditExpense = () => {
    setExpenseModal(false);
  };

  const id = data?.id;

  const handleSubmitExp = (event) => {
    event.preventDefault();
    updateExpense(id, {
      name: nameRef.current.value,
      amount: parseFloat(amountRef.current.value),
      date: dateRef.current.value,
      description: descriptionRef.current.value,
    });
    closeEditExpense();
    navigate("/expenses");
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
                    <select ref={nameRef} defaultValue={data.name}>
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
  font-size: 0.9rem;
`;
