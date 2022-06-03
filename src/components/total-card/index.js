import React from "react";
import BudgetCard from "../budget-card";
import { useBudgets } from "../../context";

const TotalCard = () => {
  const { getBudgetExpenses, expenses, budgets } = useBudgets();
  const amount = expenses.reduce((total, expense) => total + expense.amount, 0);

  const max = budgets.reduce((total, budget) => total + budget.max, 0);

  if (amount === 0) return null;

  return <BudgetCard name="Total" amount={amount} max={max} hidden noDelete />;
};

export default TotalCard;
