import React, { useState } from "react";
import { useBudgets } from "../../context";

const SearchBudget = () => {
  const { searchBudget } = useBudgets();

  const inputHandler = (e) => {
    searchBudget(e);
  };

  return (
    <div>
      <input placeholder="search" onChange={inputHandler} />
    </div>
  );
};

export default SearchBudget;
