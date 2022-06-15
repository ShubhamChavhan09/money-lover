import React from "react";
import styled from "styled-components";
import { useBudgets } from "../../context";
import BudgetCard from "../budget-card";
import SearchBudget from "../search-budget";
import { v4 as uuidv4 } from "uuid";
import MiscellaneousCard from "../miscellaneous-card";

const NewCard = ({
  // handleExpense,
  handleViewExpense,
  setBudgetData,
  setViewBudgetTab,
}) => {
  const { budgets, getBudgetExpenses, inputText } = useBudgets();

  const data = budgets.sort((a, b) => {
    return new Date(b.created) - new Date(a.created);
  });

  const filteredData = data.filter((budget) => {
    if (inputText === "") {
      return budget;
    } else {
      return budget.name.toLowerCase().includes(inputText);
    }
  });

  return (
    <Budget>
      <MiscellaneousCard
        max={null}
        handleViewExpense={handleViewExpense}
        setBudgetData={setBudgetData}
        setViewBudgetTab={setViewBudgetTab}
      />
      {filteredData.map((budget) => {
        const amount = getBudgetExpenses(budget.id).reduce(
          (total, expense) => total + expense.amount,
          0
        );
        return (
          <BudgetCard
            key={uuidv4()}
            name={budget?.name}
            id={budget.id}
            amount={amount}
            handleViewExpense={handleViewExpense}
            max={budget.max}
            setBudgetData={setBudgetData}
            setViewBudgetTab={setViewBudgetTab}
          />
        );
      })}
    </Budget>
  );
};

export default NewCard;

const Budget = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
`;
