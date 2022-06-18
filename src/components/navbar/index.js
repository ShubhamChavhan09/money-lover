import React from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import { MdAccountBalanceWallet, MdSave, MdLibraryBooks } from "react-icons/md";

const Navbar = () => {
  return (
    <Bar>
      <Nav>
        <NavLink to="">
          <Icon>
            <MdSave />
          </Icon>
          Budgets
        </NavLink>
        <NavLink to="expenses">
          <Icon>
            <MdAccountBalanceWallet />
          </Icon>
          Expenses
        </NavLink>
        <NavLink to="report">
          <Icon>
            <MdLibraryBooks />
          </Icon>
          Report
        </NavLink>
      </Nav>
    </Bar>
  );
};

export default Navbar;

const Bar = styled.div`
  height: 100vh;
  align-items: center;
  color: #fff;
  margin-bottom: 20px;
  box-shadow: 0 3px 7px 0 rgb(0 0 0 / 27%);
  z-index: 2;

  h1 {
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
  justify-content: start;
  height: 100%;

  Link.activeBtn {
    color: red;
  }
`;

const NavLink = styled(Link)`
  text-decoration: none;
  margin: 80px 20px 0 20px;
  color: #bdbdbd;
  transition: all 0.5s ease;

  &:hover {
    color: #d6806e;
  }
`;
const Icon = styled.div`
  font-size: 25px;
  text-align: center;
`;
