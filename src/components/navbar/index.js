import React from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";

const Navbar = () => {
  return (
    <Bar>
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
  height: 100vh;
  align-items: center;
  color: #fff;
  margin-bottom: 20px;
  // box-shadow: #000000 0px 0px 2px;
  box-shadow: 0 3px 7px 0 rgb(0 0 0 / 27%);
  z-index: 2;

  h1 {
    // background: rgba(211, 84, 0, 0.7);
    background: #d6806e;
    padding: 15px 20px;
    margin-left: 250px;
    color: #010101;
    font-weight: 500;
  }
`;

const Nav = styled.nav`
  font-size: 16px;
  font-weight: 300;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-around;
  height: 100%;

  Link.activeBtn {
    color: red;
  }
`;

const NavLink = styled(Link)`
  text-decoration: none;
  margin: 0 20px;
  color: #bdbdbd;
  transition: all 0.5s ease;

  &:hover {
    color: #d6806e;
  }
`;
