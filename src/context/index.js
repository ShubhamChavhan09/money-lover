import React, { createContext, useContext, useState, useEffect } from "react";
import { v4 as uuidv4 } from "uuid";
import { supabase } from "../supabaseClient";

const budgetsContext = createContext();

export const MISCELLANEOUS_BUDGET_ID = "Miscellaneous";

export const BudgetsProvider = ({ children }) => {
  const [budgets, setBudgets] = useState([]);
  const [expenses, setExpenses] = useState([]);
  const [inputText, setInputText] = useState("");

  //fetching budgets data from supabase
  useEffect(() => {
    fetchBudgets();
    return () => {
      setBudgets({});
    };
  }, []);

  const fetchBudgets = async () => {
    const { data, error } = await supabase.from("budgets").select();
    if (error) console.log("error", error);
    else setBudgets(data);
  };

  const addBudget = async ({ name, max, created, startDate, endDate }) => {
    try {
      const id = uuidv4();

      await supabase
        .from("budgets")
        .insert([{ id, name, max, created, startDate, endDate }])
        .neq("name", name);

      setBudgets((prevBudget) => {
        if (
          prevBudget.find(
            (budget) =>
              budget.name === name &&
              budget.startDate === startDate &&
              budget.endDate === endDate
          )
        ) {
          return prevBudget;
        }
        return [
          ...prevBudget,
          {
            id,
            name,
            max,
            created,
            startDate,
            endDate,
          },
        ];
      });
    } catch (error) {
      console.log("error", error);
    }
  };

  //fetching expenses data from supabase
  useEffect(() => {
    fetchExpenses();
    return () => {
      setExpenses({});
    };
  }, []);

  const fetchExpenses = async () => {
    const { data, error } = await supabase.from("expenses").select();
    if (error) console.log("error", error);
    else setExpenses(data);
  };

  const addExpense = async ({ name, amount, description, date }) => {
    try {
      const id = uuidv4();

      await supabase.from("expenses").insert([
        {
          id,
          description,
          amount,
          date,
          name,
        },
      ]);
      setExpenses((prevExpense) => {
        return [
          ...prevExpense,
          {
            id,
            description,
            amount,
            date,
            name,
          },
        ];
      });
    } catch (error) {
      console.log("error", error);
    }
  };

  const getBudgetExpenses = (budgetId) => {
    return expenses.filter((expense) => expense.name === budgetId);
  };

  const deleteBudget = async (id) => {
    try {
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
    } catch (error) {
      console.log("error", error);
    }
  };

  const deleteExpense = async (id) => {
    try {
      await supabase.from("expenses").delete().match({ id });
      setExpenses((prevExpense) => {
        return prevExpense.filter((expense) => expense.id !== id);
      });
    } catch (error) {
      console.log("error", error);
    }
  };

  const searchBudget = (e) => {
    const lowercase = e.target.value.toLowerCase();
    setInputText(lowercase);
  };

  const updateBudget = async (id, updatedBudget) => {
    try {
      await supabase
        .from("budgets")
        .update({
          name: updatedBudget.name,
          max: updatedBudget.max,
          startDate: updatedBudget.startDate,
          endDate: updatedBudget.endDate,
        })
        .match({ id });

      setBudgets((prevBudgets) => {
        return prevBudgets.map((prevBudget) =>
          prevBudget.id === id ? updatedBudget : prevBudget
        );
      });
    } catch (error) {
      console.log("error", error);
    }
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
        searchBudget,
        inputText,
        updateBudget,
      }}
    >
      {children}
    </budgetsContext.Provider>
  );
};

export function useBudgets() {
  return useContext(budgetsContext);
}
