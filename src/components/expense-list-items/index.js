import styled from "styled-components";
import format from "date-fns/format";
import { currencyFormatter } from "../../utils";
import { useBudgets } from "../../context";
import ViewExpense from "../view-expense";

const ExpenseListItems = ({ list, setExpenseData, toggle }) => {
  const { setExpenseDetail } = useBudgets();

  const handleClick = () => {
    setExpenseData(list);
    toggle(true);
  };

  return (
    <>
      <Card onClick={handleClick}>
        <div>
          <p className="date">{format(new Date(list.date), "dd")}</p>
          <div className="day">
            <p>{format(new Date(list.date), "EEEE, MMMM y")}</p>
            <span>{list.description}</span>
          </div>
        </div>
        <div>
          <p className="amount">{currencyFormatter.format(list.amount)}</p>
        </div>
      </Card>
    </>
  );
};

export default ExpenseListItems;

const Card = styled.div`
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

  &:hover {
    background: #f0faf1;
  }
`;
