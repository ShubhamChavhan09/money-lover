import { useState } from "react";
import styled from "styled-components";
import { CgClose } from "react-icons/cg";
import { MISCELLANEOUS_BUDGET_ID, useBudgets } from "../../context";
import { format } from "date-fns";
import { currencyFormatter } from "../../utils";
import EditBudgetModal from "../edit-budget-modal";
import ViewBudgetExpense from "../view-budget-expense";
import TotalExpenseReport from "../total-expense-report";
import { motion, AnimatePresence } from "framer-motion";

const ViewBudget = ({
  title,
  budgetName,
  toggle,
  date,
  budgetLeft,
  des,
  setDeleteModal,
  startDate,
  endDate,
}) => {
  const [budgetModal, setBudgetModal] = useState(false);
  const [showBudgetExpense, setShowBudgetExpense] = useState(false);

  const handleDelete = () => {
    setDeleteModal(true);
  };

  const handleModal = () => {
    setShowBudgetExpense(true);
  };

  const dropIn = {
    hidden: {
      // x: "100vw",
      opacity: 0,
    },
    visible: {
      // x: "0",
      opacity: 1,
      transition: {
        // delay: 0.2,
        duration: 0.3,
        type: "tween",
      },
    },
    exit: {
      // x: "100vw",
      opacity: 0,
      transition: {
        duration: 0.1,
      },
    },
  };

  return (
    <>
      <Container
        variants={dropIn}
        initial="hidden"
        animate="visible"
        exit="exit"
      >
        <Head>
          <div>
            <Close onClick={() => toggle(false)} />
            <p>{title}</p>
          </div>
          <div>
            <Delete onClick={handleDelete}>DELETE</Delete>
            <Edit onClick={() => setBudgetModal(true)}>EDIT</Edit>
          </div>
        </Head>
        <Details>
          <h3>{budgetName}</h3>
          <p>{format(new Date(date), "EEEE, dd/MM/yy")}</p>
          <hr />
          <p>{des}</p>
          <h3>{currencyFormatter.format(Math.abs(budgetLeft))}</h3>
        </Details>
        <Chart>
          <TotalExpenseReport
            date={date}
            name={budgetName}
            startDate={startDate}
            endDate={endDate}
          />
        </Chart>
        <View>
          <p onClick={handleModal}>VIEW TRANSACTION</p>
        </View>
      </Container>
      <EditBudgetModal
        budgetModal={budgetModal}
        setBudgetModal={setBudgetModal}
        name={budgetName}
        toggleViewBudget={toggle}
        startDate={startDate}
        endDate={endDate}
      />
      <ViewBudgetExpense
        showBudgetExpense={showBudgetExpense}
        close={setShowBudgetExpense}
        name={budgetName}
        // name={budgetName[0] ? budgetName[0]?.name : "Miscellaneous"}
      />
    </>
  );
};

export default ViewBudget;

const Container = styled(motion.div)`
  background: #ffffff;
  width: min(92vw, 600px);
  height: 600px;
  border-radius: 4px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  box-shadow: 0 3px 7px 0 rgb(0 0 0 / 27%);
`;
const Head = styled.div`
  height: 64px;
  padding: 1rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-bottom: 1px solid #e4e4e4;

  & > div {
    display: flex;
    align-items: center;
  }
  p {
    font-size: 1.25rem;
    font-weight: 500;
  }
`;

export const Close = styled(CgClose)`
  font-size: 1.25rem;
  margin-right: 18px;
  cursor: pointer;
  color: #969696;

  &:hover {
    color: #303030;
  }
`;
export const Delete = styled.button`
  border: none;
  outline: none;
  color: #f45a5a;
  background: transparent;
  font-size: clamp(0.7rem, 2vw, 0.85rem);
  width: min(4rem, 5rem);
  height: 36px;
  cursor: pointer;
  border-radius: 4px;

  &:hover {
    background: #f45a5a21;
  }
`;
const Edit = styled(Delete)`
  color: #2db84c;
  &:hover {
    background: #2db84c21;
  }
`;
const Details = styled.div`
  display: flex;
  flex-direction: column;
  padding: 0 60px;
  border-bottom: 1px solid #e4e4e4;
  margin-bottom: 20px;

  h3 {
    font-size: 24px;
    margin: 10px 0;
  }
  p {
    font-size: 0.75rem;
    color: #969696;
  }
  hr {
    width: 150px;
    margin: 12px 0;
  }
`;

const View = styled(Head)`
  justify-content: center;
  margin-top: 20px;
  height: 48px;
  border-top: 1px solid #e4e4e4;
  // align-self: baseline;

  p {
    cursor: pointer;
    font-size: 0.9rem;
  }
`;

const Chart = styled.div`
  // padding: 1rem;
  text-align: center;
  width: 100%;
`;
