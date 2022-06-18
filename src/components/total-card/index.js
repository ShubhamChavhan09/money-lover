import { useBudgets } from "../../context";
import styled from "styled-components";
import { currencyFormatter } from "../../utils";
import { motion } from "framer-motion";

const TotalCard = ({ name, click }) => {
  const { expenses } = useBudgets();

  // all expense
  const amount = expenses.reduce((total, expense) => total + expense.amount, 0);

  return (
    <Bar>
      <div>
        <p>Total</p>
        <span>{currencyFormatter.format(amount)}</span>
      </div>
      <div>
        <motion.button
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          onClick={click}
        >
          {name}
        </motion.button>
      </div>
    </Bar>
  );
};

export default TotalCard;

const Bar = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 16px;

  button {
    background: #1aa333;
    padding: 8px 12px;
    outline: none;
    border-radius: 4px;
    border: none;
    outline: none;
    color: #fdfdfd;
    font-size: 14px;
    text-transform: uppercase;
  }
  p {
    font-size: 12px;
  }
  span {
    font-size: 14px;
    font-weight: 500;
  }
`;
