import React from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";

const Navbar = () => {
  return (
    <Bar>
      <h1>Money Lover</h1>
      <Nav>
        <NavLink to="">Home</NavLink>
        <NavLink to="expenses">Expenses</NavLink>
        <NavLink to="report">Report</NavLink>
      </Nav>
    </Bar>
  );
};

export default Navbar;

const Bar = styled.div`
  // background: rgba(0, 0, 0, 0.3);
  display: flex;
  width: 100%;
  justify-content: space-between;
  align-items: center;
  // padding: 15px;
  color: #fff;
  margin-bottom: 20px;

  h1 {
    // background: rgba(211, 84, 0, 0.7);
    background: rgba(0, 0, 0, 0.4);
    padding: 15px;
    margin-left: 250px;
    outline: 1px dotted red;
  }
`;

const Nav = styled.nav`
  font-size: 18px;
`;

const NavLink = styled(Link)`
  text-decoration: none;
  margin: 0 20px;
  color: #fff;
  transition: all 0.5s ease;

  &:hover {
    border-bottom: 2px solid gray;
  }
  .active {
    background: red;
  }
`;
