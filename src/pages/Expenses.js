import React, { useState } from "react";
import { Outlet } from "react-router-dom";
import styled from "styled-components";
import { useBudgets } from "../context";

const Expenses = () => {
  const { budgets, expenses } = useBudgets();

  const [filteredExp, setFilteredExp] = useState(expenses);

  const filterItems = (Id) => {
    const items = expenses.filter((expense) => {
      return expense.budgetId === Id;
    });
    setFilteredExp(items);
  };

  return (
    <div>
      <h1>Expenses</h1>
      <div>
        <button onClick={() => setFilteredExp(expenses)}>All</button>
        {budgets.map((budget) => {
          return (
            <button key={budget.id} onClick={() => filterItems(budget.id)}>
              {budget.name}
            </button>
          );
        })}
      </div>
      <Exp>
        {filteredExp.map((exp) => {
          return (
            <>
              <p key={exp.id}>
                {exp.description} - {exp.date}
              </p>
            </>
          );
        })}
      </Exp>
      {/* <Outlet /> */}
    </div>
  );
};

export default Expenses;

const Exp = styled.div``;
