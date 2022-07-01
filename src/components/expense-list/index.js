import styled from "styled-components";
import ExpenseListItems from "../expense-list-items";
import { currencyFormatter } from "../../utils";
import { v4 as uuidv4 } from "uuid";

const ExpenseList = ({ monthData }) => {
  const uniqueExpenseName = monthData
    .map((item) => item.name)
    .filter((value, index, self) => self.indexOf(value) === index);

  const allExpenses = monthData.map((items) => items);

  return (
    <>
      <Exp>
        {uniqueExpenseName.map((expense) => {
          const data = allExpenses.filter((item) => {
            return item.name === expense;
          });

          data.sort(function (a, b) {
            return new Date(b.date) - new Date(a.date);
          });

          const expenseLength = data.length;

          const total = data.reduce(
            (item, expense) => item + expense.amount,
            0
          );

          return (
            <List key={uuidv4()}>
              {expenseLength > 0 && (
                <>
                  <CardCategory>
                    <Left>
                      <p>{expense}</p>
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
                  <ExpenseListItems key={uuidv4()} selectedExpense={list} />
                );
              })}
            </List>
          );
        })}
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
  position: sticky;
  top: 0;
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
    font-size: 0.9rem;
    font-weight: 300;
  }
`;

const Left = styled.div`
  display: flex;
  flex-direction: column;

  p {
    font-size: clamp(0.8rem, 2vw, 0.9rem);
    font-weight: 500;
  }
  span {
    font-size: clamp(0.8rem, 2vw, 0.9rem);
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
