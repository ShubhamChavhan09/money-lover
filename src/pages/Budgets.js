import { useState } from "react";
import styled from "styled-components";
import BudgetModal from "../components/budget-modal";
import TotalCard from "../components/total-card";
import NewCard from "../components/new-card";
import { useBudgets } from "../context";
import ViewBudget from "../components/view-budget";
import DeleteModal from "../components/delete-modal";
import { addDays } from "date-fns";
import {
  motion,
  AnimatePresence,
  AnimateSharedLayout,
  LayoutGroup,
} from "framer-motion";

const Dashboard = () => {
  const [budgetModal, setBudgetModal] = useState(false);
  const [viewExpenses, setViewExpenses] = useState(false);
  const [budgetName, setBudgetName] = useState("");
  const [viewBudgetTab, setViewBudgetTab] = useState(false);
  const [deleteModal, setDeleteModal] = useState(false);
  const [toggleState, setToggleState] = useState(1);
  const [selectedBudgetId, setSelectedBudgetId] = useState("");

  const dropIn = {
    visible: {
      transition: {
        duration: 1,
        type: "tween",
      },
    },
  };

  const { budgets, getBudgetExpenses, deleteBudget } = useBudgets();

  //date range for a budget
  const [dateRange, setDateRange] = useState([
    {
      startDate: new Date(),
      endDate: addDays(new Date(), 7),
      key: "selection",
    },
  ]);

  //open and close budget modal to add data
  const openBudgetModal = () => {
    setBudgetModal(true);
  };
  const closeBudgetModal = () => {
    setBudgetModal(false);
  };

  const budgetAmount = getBudgetExpenses(budgetName).reduce(
    (total, expense) => total + expense.amount,
    0
  );

  const budgetSpent = budgets.filter((budget) => {
    return budget.name === budgetName;
  });

  const budgetLeft = budgetSpent[0]?.max - budgetAmount;

  const toggleTab = (index) => {
    setToggleState(index);
  };

  return (
    <>
      <Container>
        <Head>
          <TotalCard open={openBudgetModal} name="add budget" />
        </Head>
        <Main>
          {!viewBudgetTab ? (
            <BudgetContainer>
              <div className="heading">
                <div
                  className={toggleState === 1 ? "tab active-tab" : "tab"}
                  onClick={() => toggleTab(1)}
                >
                  RUNNING
                </div>
                <div
                  className={toggleState === 2 ? "tab active-tab" : "tab"}
                  onClick={() => toggleTab(2)}
                >
                  FINISHED
                </div>
              </div>
              <div>
                <NewCard
                  setBudgetName={setBudgetName}
                  setSelectedBudgetId={setSelectedBudgetId}
                  setViewBudgetTab={setViewBudgetTab}
                  toggleState={toggleState}
                />
              </div>
            </BudgetContainer>
          ) : null}

          <div>
            <AnimatePresence
              initial={false}
              exitBeforeEnter={true}
              onExitComplete={() => null}
            >
              {budgetName && viewBudgetTab && (
                <ViewBudget
                  title="Detail"
                  budgetName={budgetName}
                  selectedBudgetId={selectedBudgetId}
                  date={new Date()}
                  budgetLeft={budgetLeft}
                  des={budgetLeft >= 0 ? "Left" : "Over Spent"}
                  setDeleteModal={setDeleteModal}
                  toggle={setViewBudgetTab}
                  startDate={dateRange[0].startDate}
                  endDate={dateRange[0].endDate}
                />
              )}
            </AnimatePresence>
          </div>
        </Main>
      </Container>

      <BudgetModal
        budgetModal={budgetModal}
        close={closeBudgetModal}
        dateRange={dateRange}
        setDateRange={setDateRange}
      />
      <DeleteModal
        deleteModal={deleteModal}
        toggle={setDeleteModal}
        deleteId={selectedBudgetId}
        toggleTab={setViewBudgetTab}
        func={deleteBudget}
        alert="Do you want to delete this budget?"
      />
    </>
  );
};

export default Dashboard;

export const Container = styled.div`
  width: 100%;
  // border: 1px solid black;
  display: flex;
  flex-direction: column;
  justify-content: start;
  align-items: center;
  height: 100%;
  overflow-y: scroll;
  filter: ${(props) =>
    props.budgetModal || props.expenseModal || props.viewExpenses
      ? `blur(1.5px)`
      : null};
  // transition: all 0.5s linear;
`;

export const Head = styled.div`
  width: 100%;
  // height: 64px;
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 2;
`;

export const Main = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  align-items: start;
  justify-content: center;
  padding: 20px;
`;
export const BudgetContainer = styled.div`
  width: min(650px, 100%);
  background: #ffffff;
  // margin: 0 auto;
  border-radius: 4px;
  box-shadow: 0 3px 7px 0 rgb(0 0 0 / 27%);
  background: linear-gradient(145deg, #f5f6fa, #ffffff);
  box-shadow: 27px 27px 54px #666666, -27px -27px 54px #ffffff;

  div.heading {
    display: flex;
  }
  div.tab {
    padding: clamp(1.3rem, 5vw, 1.5rem);
    font-size: clamp(0.6rem, 1vw, 0.9rem);
    text-transform: uppercase;
    cursor: pointer;
  }

  div.active-tab {
    // border-top: 1px solid green;
    // border-right: 1px solid green;
    // outline: 1px solid green;
    background: #e4e4e4;
    box-shadow: 0 0 6px #1aa333;
  }
`;
