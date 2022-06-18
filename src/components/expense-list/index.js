import styled from "styled-components";
import { useBudgets } from "../../context";
import ExpenseListItems from "../expense-list-items";
import { currencyFormatter } from "../../utils";
import { MISCELLANEOUS_BUDGET_ID } from "../../context";

const ExpenseList = ({ setExpenseData, toggle }) => {
  const { budgets, expenses, getBudgetExpenses } = useBudgets();

  const dataExp = expenses.filter((expense) => {
    return expense.budgetId === MISCELLANEOUS_BUDGET_ID;
  });
  const expenseLength = dataExp.length;
  const misTotal = getBudgetExpenses(MISCELLANEOUS_BUDGET_ID).reduce(
    (total, expense) => total + expense.amount,
    0
  );

  return (
    <>
      <Exp>
        {budgets.map((budget) => {
          const data = expenses.filter((expense) => {
            return expense.budgetId === budget.id;
          });
          const expenseLength = data.length;
          const total = getBudgetExpenses(budget.id).reduce(
            (total, expense) => total + expense.amount,
            0
          );
          return (
            <List key={budget.id}>
              {expenseLength > 0 && (
                <>
                  <CardCategory>
                    <Left>
                      <p>{budget?.name}</p>
                      <span>{expenseLength} Transactions</span>
                    </Left>
                    <Right>
                      <p>{currencyFormatter.format(total)}</p>
                    </Right>
                  </CardCategory>
                </>
              )}
              {data.map((list) => {
                return (
                  <ExpenseListItems
                    key={list.id}
                    id={list.budgetId}
                    list={list}
                    setExpenseData={setExpenseData}
                    toggle={toggle}
                  />
                );
              })}
            </List>
          );
        })}
        {/*  */}
        <List>
          <>
            {expenseLength > 0 && (
              <CardCategory>
                <Left>
                  <p>Miscellaneous</p>
                  <span>{expenseLength} Transactions</span>
                </Left>
                <Right>
                  <p>{currencyFormatter.format(misTotal)}</p>
                </Right>
              </CardCategory>
            )}
          </>
          {dataExp.map((list) => {
            return (
              <ExpenseListItems
                key={list.id}
                id={list.budgetId}
                list={list}
                setExpenseData={setExpenseData}
                toggle={toggle}
              />
            );
          })}
        </List>
      </Exp>
    </>
  );
};

export default ExpenseList;

export const CardCategory = styled.div`
  height: 70px;
  width: 100%;
  box-shadow: 0 -3px 0 #c6c6c6;
  border-bottom: 1px solid #e4e4e4;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 20px;
  background: #ffffff;
`;

export const Card = styled(CardCategory)`
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
    font-size: 14px;
    font-weight: 300;
  }
`;

const Left = styled.div`
  display: flex;
  flex-direction: column;

  p {
    font-size: 14px;
    font-weight: 500;
  }
  span {
    font-size: 14px;
    padding: 2px 0px;
    color: #969696;
  }
`;

const Right = styled(Left)`
  p {
    font-size: 17px;
  }
`;
const List = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
`;

const Exp = styled.div`
  display: flex;
  flex-direction: column;
`;
