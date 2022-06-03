import React from "react";
import { MISCELLANEOUS_BUDGET_ID, useBudgets } from "../../context";
import BudgetCard from "../budget-card";

const MiscellaneousCard = (props) => {
  const { getBudgetExpenses } = useBudgets();

  const amount = getBudgetExpenses(MISCELLANEOUS_BUDGET_ID).reduce(
    (total, expense) => total + expense.amount,
    0
  );

  if (amount === 0) return null;

  return (
    <div>
      <BudgetCard
        {...props}
        name="Miscellaneous"
        id={MISCELLANEOUS_BUDGET_ID}
        amount={amount}
        noDelete
      />
    </div>
  );
};

export default MiscellaneousCard;
