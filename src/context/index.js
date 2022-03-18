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

  const addExpense = ({ description, amount, budgetId, date }) => {
    setExpenses((prevExpense) => {
      return [
        ...prevExpense,
        {
          id: uuidv4(),
          description,
          amount,
          budgetId,
          date,
        },
      ];
    });
  };

  const getBudgetExpenses = (budgetId) => {
    return expenses.filter((expense) => expense.budgetId === budgetId);
  };

  const deleteBudget = (id) => {
    setExpenses((prevExpense) => {
      return prevExpense.map((expense) => {
        if (expense.budgetId !== id) return expense;
        return { ...expense, budgetId: MISCELLANEOUS_BUDGET_ID };
      });
    });

    setBudgets((prevBudgets) => {
      return prevBudgets.filter((prevBudget) => prevBudget.id !== id);
    });
  };

  const deleteExpense = (id) => {
    setExpenses((prevExpense) => {
      return prevExpense.filter((expense) => expense.id !== id);
    });
  };

  return (
    <budgetsContext.Provider
      value={{
        budgets,
        addBudget,
        expenses,
        addExpense,
        getBudgetExpenses,
        deleteBudget,
        deleteExpense,
      }}
    >
      {children}
    </budgetsContext.Provider>
  );
};

export function useBudgets() {
  return useContext(budgetsContext);
}
