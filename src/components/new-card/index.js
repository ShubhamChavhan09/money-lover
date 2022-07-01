import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { useBudgets } from "../../context";
import BudgetCard from "../budget-card";
import { v4 as uuidv4 } from "uuid";
import { motion } from "framer-motion";
import { supabase } from "../../supabaseClient";

const NewCard = ({ toggleState, data }) => {
  const { getBudgetExpenses } = useBudgets();

  return (
    <Budget>
      {data.map((budget) => {
        const amount = getBudgetExpenses(budget.name).reduce(
          (total, expense) => total + expense.amount,
          0
        );
        return (
          <div key={uuidv4()}>
            <BudgetCard amount={amount} budget={budget} />
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
