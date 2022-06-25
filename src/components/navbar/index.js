import React from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import { MdAccountBalanceWallet, MdSave, MdLibraryBooks } from "react-icons/md";

const Navbar = () => {
  return (
    <>
      {/* Nav 1 */}
      <Nav>
        <h2>Budget</h2>
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
  // background: #4b4b4b;
  height: 100vh;
  width: 15%;
  font-size: 16px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: start;
  box-shadow: 0 3px 7px 0 rgb(0 0 0 / 27%);
  padding: 4rem 2rem;
  border-radius: 10px;
  background: linear-gradient(145deg, #e6e6e6, #ffffff);
  box-shadow: 27px 27px 54px #666666, -27px -27px 54px #ffffff;
  //
  @media (max-width: 768px) {
    display: none;
  }

  h2 {
    margin-bottom: 4rem;
    color: #010101;
    font-weight: 500;
    font-size: clamp(1.5rem, 2.5vw, 1.5rem);
  }
  ul {
    list-style-type: none;
  }
  li {
    // margin: 10px 0;
  }
`;

const NavLinks = styled(Link)`
  text-decoration: none;
  color: #bdbdbd;
  // color: #000000;
  transition: all 0.5s ease;
  display: flex;
  padding: 20px;
  border-radius: 4px;
  font-size: clamp(1rem, 1vw, 0.9rem);

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
  background: #7e959b;
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
const Bar = styled.div`
  height: 100vh;
  background: salmmon;
  width: 20px;
`;
