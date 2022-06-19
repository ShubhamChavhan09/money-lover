import React from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import { MdAccountBalanceWallet, MdSave, MdLibraryBooks } from "react-icons/md";

const Navbar = () => {
  return (
    <>
      <Nav>
        <h2>Shubham</h2>
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
    </>
  );
};

export default Navbar;

const Nav = styled.nav`
  height: 60px;
  width: 100%;
  font-size: 18px;
  display: flex;
  align-items: center;
  justify-content: end;
  box-shadow: 0 3px 7px 0 rgb(0 0 0 / 27%);
  padding: 0 40px;
  border-radius: 10px;

  h2 {
    background: #d6806e;
    padding: 15px 20px;
    margin-right: auto;
    color: #010101;
    font-weight: 500;
  }
`;

const NavLink = styled(Link)`
  text-decoration: none;
  color: #bdbdbd;
  transition: all 0.5s ease;
  display: flex;
  margin: 0 20px;

  &:hover {
    color: #d6806e;
  }
`;
const Icon = styled.div`
  font-size: 20px;
  display: flex;
  align-items: center;
  justify-content: center;
`;
