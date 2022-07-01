import React, { useState, useEffect } from "react";
import styled from "styled-components";
import ExpenseModal from "../components/expense-modal";
import { Main, Head, Container, BudgetContainer } from "./Budgets";
import TotalCard from "../components/total-card";
import ExpenseList from "../components/expense-list";
import { supabase } from "../supabaseClient";
import format from "date-fns/format";

const Expenses = () => {
  // State

  const [expenseModal, setExpenseModal] = useState(false);
  const [toggleState, setToggleState] = useState(1);
  const [expenseStatus, setExpenseStatus] = useState([]);

  // functions

  let date = new Date();

  const currentMonth = {
    first: new Date(date.getFullYear(), date.getMonth(), 1),
    last: new Date(date.getFullYear(), date.getMonth() + 1, 0),
  };

  const lastMonth = {
    first: new Date(date.getFullYear(), date.getMonth() - 1, 1),
    last: new Date(date.getFullYear(), date.getMonth(), 0),
  };

  const monthStatus = toggleState === 1 ? currentMonth : lastMonth;

  const dateString1 = format(monthStatus.first, "yyyy-MM-dd");
  const dateString2 = format(monthStatus.last, "yyyy-MM-dd");

  useEffect(() => {
    month();
  }, [toggleState, expenseModal]);

  const month = async () => {
    const { data, error } = await supabase
      .from("expenses")
      .select()
      .lte("date", dateString2)
      .gte("date", dateString1);
    if (error) console.log("error", error);
    else setExpenseStatus(data);
  };

  const openExpenseModal = () => {
    setExpenseModal(true);
  };

  const closeExpenseModal = () => {
    setExpenseModal(false);
  };

  const toggleTab = (index) => {
    setToggleState(index);
  };

  return (
    <>
      <Container>
        <Head>
          <TotalCard name="add expenses" open={openExpenseModal} />
        </Head>
        <Main>
          <BudgetContainer>
            <div className="heading">
              <div
                className={toggleState === 1 ? "tab active-tab" : "tab"}
                onClick={() => toggleTab(1)}
              >
                This Month
              </div>
              <div
                className={toggleState === 2 ? "tab active-tab" : "tab"}
                onClick={() => toggleTab(2)}
              >
                Last Month
              </div>
              {/* <div
                  className={toggleState === 3 ? "tab active-tab" : "tab"}
                  onClick={() => toggleTab(3)}
                >
                  upcoming
                </div> */}
            </div>
            <ExpenseList monthData={expenseStatus} />
          </BudgetContainer>
        </Main>
      </Container>
      <ExpenseModal close={closeExpenseModal} expenseModal={expenseModal} />
    </>
  );
};

export default Expenses;

const ExpenseContainer = styled(BudgetContainer)`
  // width: 650px;
  // background: #f4f4f4;
  // box-shadow: 0 3px 7px 0 rgb(0 0 0 / 27%);

  // & > div {
  //   background: #ffffff;
  //   display: flex;
  // }
`;

const CardCategory = styled.div`
  height: 70px;
  width: 100%;
  border-top: 1px solid #e4e4e4;
  border-bottom: 1px solid #e4e4e4;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 20px;
`;

const Left = styled.div`
  display: flex;
  flex-direction: column;

  p {
    font-size: 0.9rem;
    font-weight: 500;
  }
  span {
    font-size: 0.9rem;
    padding: 2px 0px;
    color: #969696;
  }
`;

const Right = styled(Left)`
  p {
    font-size: 17px;
  }
`;

const Card = styled(CardCategory)`
  height: 55px;
  border: none;
  p {
    font-size: 11px;
  }
  p.date {
    font-size: 32px;
    margin-right: 15px;
  }
  span {
    font-size: 11px;
    padding: 2px 0px;
    color: #969696;
  }
  div.day {
    display: flex;
    flex-direction: column;
    align-items: start;
    justify-content: center;
  }
  p.amount {
    font-size: 0.9rem;
    font-weight: 300;
  }
`;

// const ExpTab = styled.div`
//   // position: -webkit-sticky;
//   position: sticky;
//   top: 0;
// `;
