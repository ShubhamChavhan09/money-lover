import React, { useState } from "react";
import styled from "styled-components";
import { useBudgets } from "../../context";
import BudgetCard from "../budget-card";
import { v4 as uuidv4 } from "uuid";
import { motion } from "framer-motion";

const NewCard = ({
  setViewBudgetTab,
  toggleState,
  setBudgetName,
  setSelectedBudgetId,
}) => {
  const { budgets, getBudgetExpenses } = useBudgets();

  // const data = budgets.sort((a, b) => {
  //   return new Date(b.created) - new Date(a.created);
  // });

  // const filteredData = data.filter((budget) => {
  //   if (inputText === "") {
  //     return budget;
  //   } else {
  //     return budget.name.toLowerCase().includes(inputText);
  //   }
  // });

  let today = new Date();
  const runningBudgets = budgets
    .map((budget) => {
      return budget;
    })
    .filter((item) => {
      return (
        new Date(item.startDate) <= today && new Date(item.endDate) >= today
      );
    });

  const finishedBudgets = budgets
    .map((budget) => {
      return budget;
    })
    .filter((item) => {
      return (
        new Date(item.startDate) >= today || new Date(item.endDate) <= today
      );
    });

  const dataBud = toggleState === 1 ? runningBudgets : finishedBudgets;

  return (
    <Budget>
      {dataBud.map((budget) => {
        const amount = getBudgetExpenses(budget.name).reduce(
          (total, expense) => total + expense.amount,
          0
        );
        return (
          <div key={uuidv4()}>
            <BudgetCard
              amount={amount}
              budget={budget}
              setBudgetName={setBudgetName}
              setViewBudgetTab={setViewBudgetTab}
              setSelectedBudgetId={setSelectedBudgetId}
            />
          </div>
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
