import React, { useState } from "react";
import { useBudgets } from "../../context";
import styled from "styled-components";

const SearchBudget = () => {
  const { searchBudget } = useBudgets();

  const inputHandler = (e) => {
    searchBudget(e);
  };

  return (
    <div>
      <Search placeholder="Find a budget..." onChange={inputHandler} />
    </div>
  );
};

export default SearchBudget;

const Search = styled.input`
  width: 15rem;
  margin: 10px 0;
  height: 30px;
  border-radius: 4px;
  padding: 10px;
  outline: none;
  border: none;
  box-shadow: 1px 1px 8px;
  font-size: 14px;
`;
