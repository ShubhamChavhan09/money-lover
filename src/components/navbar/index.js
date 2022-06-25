import React from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import { MdAccountBalanceWallet, MdSave, MdLibraryBooks } from "react-icons/md";

const Navbar = () => {
  return (
    <>
      {/* Nav 1 */}
      <Nav>
        {/* <h2>Shubham</h2> */}
        <ul>
          <li>
            <NavLinks to="">
              <Icon>
                <MdSave />
              </Icon>
              Budgets
            </NavLinks>
          </li>
          <li>
            <NavLinks to="expenses">
              <Icon>
                <MdAccountBalanceWallet />
              </Icon>
              Expenses
            </NavLinks>
          </li>
          <li>
            <NavLinks to="report">
              <Icon>
                <MdLibraryBooks />
              </Icon>
              Report
            </NavLinks>
          </li>
        </ul>
      </Nav>

      {/* Nav 2 */}
      <BottomNav>
        <BottomLink to="">
          <Icon>
            <MdSave />
          </Icon>
          Budgets
        </BottomLink>
        <BottomLink to="expenses">
          <Icon>
            <MdAccountBalanceWallet />
          </Icon>
          Expenses
        </BottomLink>
        <BottomLink to="report">
          <Icon>
            <MdLibraryBooks />
          </Icon>
          Report
        </BottomLink>
      </BottomNav>
    </>
  );
};

export default Navbar;

const Nav = styled.nav`
  background: #ffffff;
  height: 100vh;
  width: 15%;
  font-size: 16px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: start;
  box-shadow: 0 3px 7px 0 rgb(0 0 0 / 27%);
  padding: 50px 40px;
  border-radius: 10px;
  //
  @media (max-width: 768px) {
    display: none;
  }

  h2 {
    background: #d6806e;
    padding: 15px 20px;
    margin-right: auto;
    color: #010101;
    font-weight: 500;
  }
  ul {
    list-style-type: none;
  }
  li {
    margin: 30px 0;
  }
`;

const NavLinks = styled(Link)`
  text-decoration: none;
  color: #bdbdbd;
  transition: all 0.5s ease;
  display: flex;
  padding: 20px;s
  border-radius: 4px;

  &:hover {
    background: #ecf0f1;
  }
  &.active {
    background: red;
  }
`;
const Icon = styled.div`
  font-size: 1.25rem;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const BottomNav = styled.div`
  display: none;
  width: 100%;
  position: fixed;
  justify-content: space-around;
  align-items: center;
  position: fixed;
  bottom: 0;
  height: 3.5rem;
  background: #ffffff;
  box-shadow: 0 3px 7px 0 rgb(0 0 0 / 27%);
  z-index: 2;

  ul {
    list-style-type: none;
  }

  @media (max-width: 768px) {
    display: flex;
  }
`;
const BottomLink = styled(Link)`
  display: flex;
  color: #bdbdbd;
  text-decoration: none;
`;
