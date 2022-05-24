import React from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";

const Navbar = () => {
  return (
    <Bar>
      <h1>Money Lover</h1>
      <Nav>
        <Link to="">Home</Link>
        <Link to="expenses">Expenses</Link>
        <Link to="report">Report</Link>
      </Nav>
    </Bar>
  );
};

export default Navbar;

const Bar = styled.div`
  background: gray;
  display: flex;
  width: 100%;
  justify-content: end;

  h1 {
    margin-right: auto;
  }
`;

const Nav = styled.nav``;
