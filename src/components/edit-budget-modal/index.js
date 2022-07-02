import React, { useRef, useState } from "react";
import styled from "styled-components";
import { useBudgets } from "../../context";
import { CgClose } from "react-icons/cg";
import ModalButtons from "../modal-buttons";
import Modal from "../modal";
import { AnimatePresence } from "framer-motion";
import { Section } from "../budget-modal";
import DatePicker from "../date-picker";
import { TopLeft } from "../view-budget-expense";
import { Close } from "../view-budget";
import { addDays, parseISO } from "date-fns";
import format from "date-fns/format";
import { Category } from "../../category";
import { useNavigate } from "react-router-dom";

const EditBudgetModal = ({
  setBudgetModal,
  budgetModal,
  id,
  startDate,
  endDate,
  name,
  max,
}) => {
  const nameRef = useRef();
  const maxRef = useRef();
  // const modalRef = useRef("");
  const { updateBudget } = useBudgets();

  let navigate = useNavigate();

  const start = parseISO(startDate);
  const end = parseISO(endDate);

  const [showEditDate, setShowEditDate] = useState(false);
  const [editDateRange, setEditDateRange] = useState([
    {
      startDate: new Date(),
      endDate: addDays(new Date(), 7),
      key: "selection",
    },
  ]);

  const handleBudget = () => {
    setBudgetModal(!budgetModal);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    updateBudget(id, {
      name: nameRef.current.value,
      max: parseFloat(maxRef.current.value),
      startDate: addDays(new Date(editDateRange[0].startDate), 1),
      endDate: addDays(new Date(editDateRange[0].endDate), 1),
      id: id,
    });

    setBudgetModal(false);
    navigate("/");
  };

  return (
    <>
      <AnimatePresence
        initial={false}
        exitBeforeEnter={true}
        onExitComplete={() => null}
      >
        {budgetModal ? (
          <Modal width={"350px"} height={"390px"}>
            <Title>
              <p>Edit Budget</p>
            </Title>
            <Form section="240px" onSubmit={handleSubmit}>
              <Section>
                <Box>
                  <div>
                    <p>Category</p>
                  </div>
                  <div>
                    <select ref={nameRef} defaultValue={name}>
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
                      type="number"
                      min="0"
                      ref={maxRef}
                      defaultValue={max}
                    />
                  </div>
                </Box>
                <Box>
                  <div>
                    <p>Date</p>
                  </div>
                  <div>
                    <input
                      value={`${start && format(start, "dd MMMM")} - ${
                        end && format(end, "dd MMMM")
                      }`}
                      style={{ cursor: "pointer" }}
                      readOnly
                      placeholder="Select time range"
                      onClick={() => setShowEditDate(true)}
                    />
                  </div>
                  <AnimatePresence
                    initial={false}
                    exitBeforeEnter={true}
                    onExitComplete={() => null}
                  >
                    {showEditDate && (
                      <Modal width="350px" height="530px">
                        <Title>
                          <TopLeft>
                            <Close onClick={() => setShowEditDate(false)} />
                            <p>Select time range</p>
                          </TopLeft>
                        </Title>
                        <div>
                          <DatePicker
                            dateRange={editDateRange}
                            setDateRange={setEditDateRange}
                          />
                        </div>
                      </Modal>
                    )}
                  </AnimatePresence>
                </Box>
              </Section>
              <ModalButtons cancel={handleBudget} />
            </Form>
          </Modal>
        ) : null}
      </AnimatePresence>
    </>
  );
};

export default EditBudgetModal;
export const Overlay = styled.div`
  position: fixed;
  // z-index: 10;
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
    font-size: 0.9rem;
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
    font-size: 0.9rem;
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
    font-size: 0.75rem;
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
      font-size: 1.25rem;
      font-weight: 500;
    }
  }
`;
