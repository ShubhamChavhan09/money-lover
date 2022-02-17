import React, { createContext, useContext, useState } from "react";
import { v4 as uuidv4 } from "uuid";

const budgetsContext = createContext();

export const MISCELLANEOUS_BUDGET_ID = "Miscellaneous";

export const BudgetsProvider = ({ children }) => {
  const [budgets, setBudgets] = useState([]);
  const [expenses, setExpenses] = useState([]);

  const addBudget = ({ name, max }) => {
    setBudgets((prevBudget) => {
      if (prevBudget.find((budget) => budget.name === name)) {
        return prevBudget;
      }
      return [
        ...prevBudget,
        {
          id: uuidv4(),
          name,
          max,
        },
      ];
    });
  };

  const addExpense = ({ description, amount }) => {
    setExpenses((prevExpense) => {
      return [
        ...prevExpense,
        {
          id: uuidv4(),
          description,
          amount,
        },
      ];
    });
  };

  return (
    <budgetsContext.Provider
      value={{ budgets, addBudget, expenses, addExpense }}
    >
      {children}
    </budgetsContext.Provider>
  );
};

export function useBudgets() {
  return useContext(budgetsContext);
}
