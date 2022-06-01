import React from "react";
import styled from "styled-components";
import { useBudgets } from "../../context";
import BudgetCard from "../budget-card";
import SearchBudget from "../search-budget";

const NewCard = ({ handleExpense, handleViewExpense }) => {
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
            key={budget.id}
            handleExpense={handleExpense}
            handleViewExpense={handleViewExpense}
            amount={amount}
            name={budget.name}
            max={budget.max}
            id={budget.id}
          />
        );
      })}
    </Budget>
  );
};

export default NewCard;

const Budget = styled.div`
  width: 100%;
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 1rem;
`;
