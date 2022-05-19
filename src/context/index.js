import React, { createContext, useContext, useState, useEffect } from "react";
import { v4 as uuidv4 } from "uuid";
import { supabase } from "../supabaseClient";

const budgetsContext = createContext();

export const MISCELLANEOUS_BUDGET_ID = "Miscellaneous";

export const BudgetsProvider = ({ children }) => {
  const [budgets, setBudgets] = useState([]);
  const [expenses, setExpenses] = useState([]);

  // fetching budgets data from supabase
  useEffect(() => {
    fetchBudgets();
  }, []);

  const fetchBudgets = async () => {
    const { data } = await supabase.from("budgets").select();
    setBudgets(data);
  };
  //

  const addBudget = async ({ name, max }) => {
    const id = uuidv4();
    await supabase.from("budgets").insert([{ id, name, max }]);
    setBudgets((prevBudget) => {
      if (prevBudget.find((budget) => budget.name === name)) {
        return prevBudget;
      }
      return [
        ...prevBudget,
        {
          id,
          name,
          max,
        },
      ];
    });
  };

  //fetching expenses data from supabase
  useEffect(() => {
    fetchExpenses();
  }, []);

  const fetchExpenses = async () => {
    const { data } = await supabase.from("expenses").select();
    setExpenses(data);
  };
  //

  const addExpense = async ({ description, amount, budgetId, date }) => {
    const id = uuidv4();
    await supabase
      .from("expenses")
      .insert([{ id, description, amount, budgetId, date }]);
    setExpenses((prevExpense) => {
      return [
        ...prevExpense,
        {
          id,
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

  const deleteBudget = async (id) => {
    await supabase.from("budgets").delete().match({ id });

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

  const deleteExpense = async (id) => {
    await supabase.from("expenses").delete().match({ id });
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
