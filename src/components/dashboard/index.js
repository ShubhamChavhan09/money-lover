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

const Dashboard = () => {
  const [budgetModal, setBudgetModal] = useState(false);
  const [expenseModal, setExpenseModal] = useState(false);
  const [expenseBudgetId, setExpenseBudgetId] = useState();
  const [viewExpenses, setViewExpenses] = useState(false);
  const [expensedId, setExpensedId] = useState();

  const handleBudget = () => {
    setBudgetModal(!budgetModal);
  };

  const handleExpense = (budgetId) => {
    setExpenseModal(!expenseModal);
    setExpenseBudgetId(budgetId);
  };

  const handleViewExpense = (id) => {
    setViewExpenses(!viewExpenses);
    setExpensedId(id);
  };

  return (
    <>
      <Container
        budgetModal={budgetModal}
        expenseModal={expenseModal}
        viewExpenses={viewExpenses}
      >
        {/* <Section> */}
        <Right>
          <Up>
            <TotalCard />
            <MiscellaneousCard
              handleViewExpense={handleViewExpense}
              handleExpense={handleExpense}
            />
          </Up>
          <Down>
            <TotalExpenseReport />
          </Down>
        </Right>
        <Left>
          <Search>
            <div>
              <SearchBudget />
            </div>
            <div>
              <button onClick={handleBudget}>Add Budget</button>
              <button onClick={handleExpense}>Add Expense</button>
            </div>
          </Search>
          <Grid>
            <NewCard
              handleExpense={handleExpense}
              handleViewExpense={handleViewExpense}
            />
          </Grid>
        </Left>

        {/* </Section> */}
      </Container>

      <BudgetModal handleBudget={handleBudget} budgetModal={budgetModal} />
      <ExpenseModal
        handleExpense={handleExpense}
        expenseModal={expenseModal}
        expenseBudgetId={expenseBudgetId}
      />
      <ViewExpenseModal
        viewExpenses={viewExpenses}
        handleViewExpense={handleViewExpense}
        expensedId={expensedId}
      />
    </>
  );
};

export default Dashboard;

const Container = styled.div`
  width: 100%;
  // border: 1px solid black;
  display: flex;
  // flex-direction: column;
  // justify-content: space-between;
  // align-items: center;
  height: 100%;
  filter: ${(props) =>
    props.budgetModal || props.expenseModal || props.viewExpenses
      ? `blur(1.5px)`
      : null};
  transition: all 0.2s ease-in-out;

  button {
    margin: 0 20px;
    padding: 5px 10px;
    outline: none;
    cursor: pointer;
    border-radius: 5px;
    border: none;
  }
`;

const Left = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 1rem;
  flex: 1;
  max-height: 655px;
  overflow-y: scroll;
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
  justify-content: center;
  gap: 10px;
  flex-direction: column;
  padding-bottom: 20px;
`;

const Up = styled.div`
  // padding: 0 20px;
  margin-bottom: 30px;
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
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
