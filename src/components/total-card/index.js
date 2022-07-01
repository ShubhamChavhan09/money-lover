import styled from "styled-components";
import { currencyFormatter } from "../../utils";
import { motion } from "framer-motion";
import { supabase } from "../../supabaseClient";
import format from "date-fns/format";
import { useEffect, useState } from "react";

const TotalCard = ({ name, open, noButton }) => {
  const [currMonth, setCurrMonth] = useState([]);

  const date = new Date();

  const first = new Date(date.getFullYear(), date.getMonth(), 1);
  const last = new Date(date.getFullYear(), date.getMonth() + 1, 0);

  const dateString1 = format(first, "yyyy-MM-dd");
  const dateString2 = format(last, "yyyy-MM-dd");

  useEffect(() => {
    month();
    return () => {
      setCurrMonth({});
    };
  }, []);

  const month = async () => {
    const { data, error } = await supabase
      .from("expenses")
      .select()
      .lte("date", dateString2)
      .gte("date", dateString1);
    if (error) console.log("error", error);
    else setCurrMonth(data);
  };

  // all expense for current month
  const amount = currMonth.reduce(
    (total, expense) => total + expense.amount,
    0
  );

  return (
    <Bar>
      <div>
        <span>{currencyFormatter.format(amount)}</span>
        <p>Total spent this month</p>
      </div>
      <div>
        {!noButton ? (
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={open}
          >
            {name}
          </motion.button>
        ) : null}
      </div>
    </Bar>
  );
};

export default TotalCard;

const Bar = styled.div`
  width: min(850px, 100%);
  height: 3.5rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 16px;
  background: #ffffff;
  // background: #4b4b4b;
  color: #000000;
  box-shadow: 0 3px 7px 0 rgb(0 0 0 / 27%);

  button {
    background: #1aa333;
    padding: 8px 12px;
    outline: none;
    border-radius: 4px;
    border: none;
    outline: none;
    color: #fdfdfd;
    font-size: 0.9rem;
    text-transform: uppercase;
  }
  p {
    font-size: 12px;
  }
  span {
    font-size: 0.9rem;
    font-weight: 500;
  }
`;
