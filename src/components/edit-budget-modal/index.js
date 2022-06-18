import React, { useRef, useEffect, useState } from "react";
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
import { addDays } from "date-fns";
import format from "date-fns/format";

const EditBudgetModal = ({
  budgetModal,
  setBudgetModal,
  id,
  name,
  amount,
  toggleViewBudget,
  startDate,
  endDate,
}) => {
  const nameRef = useRef();
  const maxRef = useRef();
  const modalRef = useRef("");
  const { updateBudget } = useBudgets();

  const { budgets } = useBudgets();

  const [showEditDate, setShowEditDate] = useState(false);
  const [editDateRange, setEditDateRange] = useState([
    {
      startDate: new Date(),
      endDate: addDays(new Date(), 7),
      key: "selection",
    },
  ]);

  const budget = budgets.filter((budget) => {
    return budget.id === id;
  });

  const maxAmount = budget[0]?.max;

  const budgetName = budget[0]?.name;

  const handleBudget = () => {
    setBudgetModal(!budgetModal);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    updateBudget(id, {
      name: nameRef.current.value,
      max: parseFloat(maxRef.current.value),
      startDate: new Date(editDateRange[0].startDate),
      endDate: new Date(editDateRange[0].endDate),
    });
    setBudgetModal(!budgetModal);
    toggleViewBudget(false);
  };

  return (
    <>
      <AnimatePresence
        initial={false}
        exitBeforeEnter={true}
        onExitComplete={() => null}
      >
        {budgetModal ? (
          // <Overlay ref={modalRef} width="350px" height="390px">
          //   <div className="modal">
          <Modal width={"350px"} height={"390px"}>
            <Title>
              <p>Edit Budget</p>
            </Title>
            <Form section="240px" onSubmit={handleSubmit}>
              <Section>
                <Box>
                  <div>
                    <p>Name</p>
                  </div>
                  <div>
                    <input
                      ref={nameRef}
                      required
                      type="text"
                      // onChange={handleName}
                      defaultValue={budgetName}
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
                      ref={maxRef}
                      // onChange={(e) => setAmounts(e.target.value)}
                      defaultValue={maxAmount}
                    />
                  </div>
                </Box>
                <Box>
                  <div>
                    <p>Date</p>
                  </div>
                  <div>
                    <input
                      value={`${format(startDate, "dd/MM/yyyy")} - ${format(
                        endDate,
                        "dd/MM/yyyy"
                      )}`}
                      style={{ cursor: "pointer" }}
                      readOnly
                      placeholder="Select time range"
                      onClick={() => setShowEditDate((prev) => !prev)}
                    />
                  </div>
                  <AnimatePresence
                    initial={false}
                    exitBeforeEnter={true}
                    onExitComplete={() => null}
                  >
                    {showEditDate && (
                      // <Overlay width="350px" height="500px">
                      // {/* <div className="modal"> */}
                      <Modal width="350px" height="500px">
                        <Title>
                          <TopLeft>
                            <Close onClick={(e) => setShowEditDate(false)} />
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
                      // </div>
                      // </Overlay>
                    )}
                  </AnimatePresence>
                </Box>
              </Section>
              <ModalButtons cancel={handleBudget} />
            </Form>
          </Modal>
        ) : //  {/* </div> */}
        //  {/* </Overlay> */}

        null}
      </AnimatePresence>
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
