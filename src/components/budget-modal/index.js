import React, { useRef, useEffect, useState } from "react";
import styled from "styled-components";
import { useBudgets } from "../../context";
import { CgClose } from "react-icons/cg";
import ModalButtons from "../modal-buttons";
import { Category } from "../../category";
import DatePicker from "../date-picker";
import { format } from "date-fns";
import { TopLeft } from "../view-budget-expense";
import Modal from "../modal";
import { Close } from "../view-budget";
import { AnimatePresence } from "framer-motion";

const BudgetModal = ({
  budgetModal,
  handleBudget,
  dateRange,
  setDateRange,
}) => {
  const nameRef = useRef("");
  const maxRef = useRef("");
  const modalRef = useRef("");
  const { addBudget } = useBudgets();

  const [showDate, setShowDate] = useState(false);

  useEffect(() => {
    if (nameRef.current) {
      nameRef.current.focus();
    }
  }, [handleBudget]);

  const handleSubmit = (event) => {
    event.preventDefault();
    addBudget({
      name: nameRef.current.value,
      max: parseFloat(maxRef.current.value),
      created: new Date(),
      startDate: new Date(dateRange[0].startDate),
      endDate: new Date(dateRange[0].endDate),
    });
    handleBudget();
  };

  const close = (e) => {
    if (modalRef.current === e.target) {
      handleBudget();
    }
  };

  return (
    <>
      <AnimatePresence
        initial={false}
        exitBeforeEnter={true}
        onExitComplete={() => null}
      >
        {budgetModal ? (
          // <Overlay ref={modalRef} onClick={close} width="350px" height="390px">
          // {/* <div className="modal"> */}

          <Modal width={"350px"} height={"390px"}>
            <Title>
              <p>Add Budget</p>
            </Title>
            <Form section="240px" onSubmit={handleSubmit}>
              <Section>
                <Box>
                  <div>
                    <p>Category</p>
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
                    <input type="number" min="0" required ref={maxRef} />
                  </div>
                </Box>
                <Box>
                  <div>
                    <p>Date</p>
                  </div>
                  <div>
                    <input
                      value={`${format(
                        dateRange[0].startDate,
                        "dd/MM/yyyy"
                      )} - ${format(dateRange[0].endDate, "dd/MM/yyyy")}`}
                      style={{ cursor: "pointer" }}
                      readOnly
                      placeholder="Select time range"
                      onClick={() => setShowDate((prev) => !prev)}
                    />
                  </div>
                  <AnimatePresence
                    initial={false}
                    exitBeforeEnter={true}
                    onExitComplete={() => null}
                  >
                    {showDate && (
                      // <Overlay width="350px" height="500px">
                      // {/* <div className="modal"> */}
                      <Modal width="350px" height="500px">
                        <Title>
                          <TopLeft>
                            <Close onClick={(e) => setShowDate(false)} />
                            <p>Select time range</p>
                          </TopLeft>
                        </Title>
                        <div>
                          <DatePicker
                            dateRange={dateRange}
                            setDateRange={setDateRange}
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
        ) : // {/* </div> */}
        // {/* </Overlay> */}
        null}
      </AnimatePresence>
    </>
  );
};

export default BudgetModal;
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
    border-radius: 4px;
  }

  section {
    padding: 24px 24px 0;
    font-size: 14px;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    align-items: center;
    height: 100%;
  }
`;

export const Section = styled.section`
  padding: 24px 24px 0;
  font-size: 14px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  height: 100%;
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
    justify-content: space-between;
    align-items: center;
    border-bottom: 2px solid #e4e4e4;

    p {
      font-size: 20px;
      font-weight: 500;
    }
  }
`;
