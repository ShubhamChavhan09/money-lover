import React, { useState } from "react";
import { Link, Outlet } from "react-router-dom";
import styled from "styled-components";
import { useBudgets, MISCELLANEOUS_BUDGET_ID } from "../context";
import Lists from "./Lists";

const Expenses = () => {
  const { budgets, expenses } = useBudgets();

  const misExp = expenses.filter((exp) => {
    return exp.budgetId === MISCELLANEOUS_BUDGET_ID;
  });

  return (
    <Container>
      <div>
        <h2>Expenses List </h2>
        <NavLink to="/expenses">All</NavLink>
        <NavLink to={misExp[0].budgetId}>{misExp[0].budgetId}</NavLink>
        {budgets.map((budget) => {
          return (
            <NavLink key={budget.id} to={budget.id}>
              {budget.name}
            </NavLink>
          );
        })}
        <Lists />
      </div>
    </Container>
  );
};

export default Expenses;

const Container = styled.div`
  width: 70%;
  height: 100%;
  padding: 3rem;
  transition: all 1sec linear;
`;
const NavLink = styled(Link)`
  text-decoration: none;
  color: #fff;
  margin-right: 10px;
  padding: 5px 10px;
  border-radius: 5px;

  &:hover {
    background: rgba(170, 166, 157, 0.3);
  }
`;
