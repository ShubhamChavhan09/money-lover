import React, { createContext, useContext, useState } from "react";
import { v4 as uuidv4 } from "uuid";

const budgetsContext = createContext();

export const BudgetsProvider = ({ children }) => {
  const [budgets, setBudgets] = useState([]);

  const addBudget = ({ name, max }) => {
    setBudgets((prevBudget) => {
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

  return (
    <budgetsContext.Provider value={{ budgets, addBudget }}>
      {children}
    </budgetsContext.Provider>
  );
};

export function useBudgets() {
  return useContext(budgetsContext);
}
