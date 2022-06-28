import styled from "styled-components";
import format from "date-fns/format";
import { currencyFormatter } from "../../utils";
import { Link } from "react-router-dom";

const ExpenseListItems = ({ selectedExpense, setExpenseData, toggle }) => {
  const handleClick = () => {
    setExpenseData(selectedExpense);
    toggle(true);
  };

  return (
    <>
      <Card to={selectedExpense.id}>
        <div className="data">
          <p className="date">
            {format(new Date(selectedExpense?.date), "dd")}
          </p>
          <div className="day">
            <p>{format(new Date(selectedExpense?.date), "EEEE, MMMM y")}</p>
            <span>{selectedExpense.description}</span>
          </div>
        </div>
        <div>
          <p className="amount">
            {currencyFormatter.format(selectedExpense.amount)}
          </p>
        </div>
      </Card>
    </>
  );
};

export default ExpenseListItems;

export const Card = styled(Link)`
  width: 100%;
  border-top: 1px solid #e4e4e4;
  border-bottom: 1px solid #e4e4e4;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 20px;
  height: 55px;
  border: none;
  cursor: pointer;
  transition: all 0.2s linear;
  text-decoration: none;
  color: #000000;

  p {
    font-size: 11px;
  }
  p.date {
    font-size: 32px;
    font-size: clamp(1.6rem, 5vw, 2rem);
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

  &:hover {
    background: #f0faf1;
  }
  div.data {
    display: flex;
  }
`;
