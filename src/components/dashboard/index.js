import React, { useState } from "react";
import styled from "styled-components";
import BudgetModal from "../budget-modal";
import ExpenseModal from "../expense-modal";
import MiscellaneousCard from "../miscellaneous-card";
import ViewExpenseModal from "../view-expense-modal";
import TotalCard from "../total-card";
import SearchBudget from "../search-budget";
import NewCard from "../new-card";
import TotalExpenseReport from "../total-expense-report";
import ViewExpense from "../view-expense";
import { useBudgets } from "../../context";
import ViewBudget from "../view-budget";
import DeleteModal from "../delete-modal";

const Dashboard = () => {
  const [budgetModal, setBudgetModal] = useState(false);
  // const [expenseModal, setExpenseModal] = useState(true);
  // const [expenseBudgetId, setExpenseBudgetId] = useState();
  const [viewExpenses, setViewExpenses] = useState(false);
  const [expensedId, setExpensedId] = useState();
  const [budgetData, setBudgetData] = useState(null);
  const [viewBudgetTab, setViewBudgetTab] = useState(false);
  const [deleteModal, setDeleteModal] = useState(false);

  const { budgets, getBudgetExpenses, deleteBudget } = useBudgets();

  // const handleExpense = (budgetId) => {
  //   setExpenseModal(!expenseModal);
  //   setExpenseBudgetId(budgetId);
  // };

  const handleViewExpense = (id) => {
    setViewExpenses(!viewExpenses);
    setExpensedId(id);
  };

  const handleBudget = () => {
    setBudgetModal(!budgetModal);
  };

  const budgetAmount = getBudgetExpenses(budgetData).reduce(
    (total, expense) => total + expense.amount,
    0
  );

  const budgetSpent = budgets.filter((budget) => {
    return budget.id === budgetData;
  });

  const budgetLeft = budgetSpent[0]?.max - budgetAmount;

  return (
    <>
      <Container
        // budgetModal={budgetModal}
        // expenseModal={expenseModal}
        viewExpenses={viewExpenses}
      >
        <Head>
          <TotalCard click={handleBudget} name="add budget" />
        </Head>
        <Main>
          <BudgetContainer>
            <div>
              <Tab>RUNNING</Tab>
              <Tab>FINISHED</Tab>
            </div>
            <div>
              <NewCard
                // handleExpense={handleExpense}
                handleViewExpense={handleViewExpense}
                setBudgetData={setBudgetData}
                setViewBudgetTab={setViewBudgetTab}
              />
            </div>
          </BudgetContainer>
          <div>
            {budgetData && viewBudgetTab && (
              <ViewBudget
                title="Detail"
                id={budgetData}
                budgetId={budgetData}
                date={new Date()}
                amount={budgetLeft}
                des={budgetLeft > 0 ? "Left" : "Over Spent"}
                setDeleteModal={setDeleteModal}
                toggle={setViewBudgetTab}
              />
            )}
          </div>
        </Main>
      </Container>

      <BudgetModal budgetModal={budgetModal} handleBudget={handleBudget} />
      {/* <ExpenseModal
        handleExpense={handleExpense}
        expenseModal={expenseModal}
        expenseBudgetId={expenseBudgetId}
      /> */}
      <ViewExpenseModal
        viewExpenses={viewExpenses}
        handleViewExpense={handleViewExpense}
        expensedId={expensedId}
        id={budgetData}
      />
      <DeleteModal
        deleteModal={deleteModal}
        toggle={setDeleteModal}
        deleteId={budgetData}
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
  transition: all 0.2s ease-in-out;
`;

const Left = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 1rem;
  flex: 1;
  max-height: 655px;
  overflow-y: scroll;
  border: 1px solid green;
`;
const Right = styled.div`
  flex: 1;
  padding: 1rem;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
`;

const Grid = styled.div`
  display: flex;
  flex-direction: column;
  // justify-content: center;
  gap: 10px;
  flex-direction: column;
  padding-bottom: 20px;
  width: 100%;
`;

const Down = styled.div`
  width: 100%;
  // background: rgba(44, 62, 80, 0.3);
  background: #333;
  // background: rgba(30, 39, 46, 1);
  padding: 10px;
  border-radius: 5px;
`;

const Search = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  margin-bottom: 20px;

  & > div {
    flex: 1;
  }
`;

const Button = styled.button`
  margin: 0 20px;
  height: 30px;
  padding: 5px 10px;
  outline: none;
  cursor: pointer;
  border-radius: 5px;
  border: none;
  background: #d6806e;
  font-size: 14px;
`;
//

export const Head = styled.div`
  // background: gray;
  width: 100%;
  height: 64px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  box-shadow: 0 3px 7px 0 rgb(0 0 0 / 27%);
  z-index: 1;
`;

export const Main = styled.div`
  // background: #d9dbe1;
  background: #e4e4e4;
  width: 100%;
  height: 100%;
  display: flex;
  // flex-direction: column;
  align-items: start;
  justify-content: space-between;
  padding: 20px;
  overflow-y: scroll;
`;
export const BudgetContainer = styled.div`
  width: 650px;
  background: #ffffff;
  margin: 0 auto;
  border-radius: 4px;
  box-shadow: 0 3px 7px 0 rgb(0 0 0 / 27%);

  div {
    display: flex;
  }
`;
export const Tab = styled.p`
  padding: 30px;
  font-size: 14px;
  text-transform: uppercase;
`;
