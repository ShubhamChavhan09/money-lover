import React from "react";
import styled from "styled-components";
import { useBudgets } from "../../context";
import BudgetCard from "../budget-card";
import SearchBudget from "../search-budget";
import { v4 as uuidv4 } from "uuid";

const NewCard = ({
  handleExpense,
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
      {filteredData.map((budget) => {
        const amount = getBudgetExpenses(budget.id).reduce(
          (total, expense) => total + expense.amount,
          0
        );
        return (
          <BudgetCard
            key={uuidv4()}
            handleExpense={handleExpense}
            handleViewExpense={handleViewExpense}
            amount={amount}
            name={budget?.name}
            max={budget.max}
            id={budget.id}
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
