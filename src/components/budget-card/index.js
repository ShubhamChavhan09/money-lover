import React from "react";
import styled from "styled-components";

const BudgetCard = () => {
  return (
    <Contanier>
      <h1>Budget Card</h1>
      <div>
        <button>Add Expense</button>
      </div>
    </Contanier>
  );
};

export default BudgetCard;

const Contanier = styled.div`
  text-align: left;
  border: 2px solid green;
  height: 180px;
`;
