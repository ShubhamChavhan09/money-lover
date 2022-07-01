import { Link } from "react-router-dom";
import styled from "styled-components";
import { currencyFormatter } from "../../utils";
import { supabase } from "../../supabaseClient";
import { useEffect } from "react";
import { useState } from "react";

const BudgetCard = ({ budget, noBudget }) => {
  const [allData, setAllData] = useState([]);

  const budgetName = budget?.name;
  const budgetId = budget?.id;
  const maxAmount = budget?.max;
  const startDate = budget?.startDate;
  const endDate = budget?.endDate;

  useEffect(() => {
    singleBudget();
    return () => {
      setAllData({});
    };
  }, []);

  const singleBudget = async () => {
    const { data, error } = await supabase
      .from("expenses")
      .select()
      .lte("date", endDate)
      .gte("date", startDate)
      .match({ name: budgetName });
    if (error) console.log("error", error);
    else setAllData(data);
  };

  //

  const totalAmount = allData.reduce(
    (total, expense) => total + expense.amount,
    0
  );

  const rate = (totalAmount / maxAmount) * 100;

  function setProgressVariant(amount, maxAmount) {
    const ratio = amount / maxAmount;
    if (ratio < 0.6) return "rgba(76, 209, 55,0.75)";
    if (ratio < 0.8) return "rgba(255, 211, 42,0.75)";
    return "rgba(232, 65, 24,0.7)";
  }

  const classNames = [];
  if (totalAmount > maxAmount) {
    classNames.push("danger");
  }

  return (
    <>
      <Card to={`/${budgetId}`}>
        <Top>
          <div>
            <Title>{budgetName}</Title>
          </div>
          <Details>
            <div>
              <p>
                <span className="spend">
                  {currencyFormatter.format(maxAmount)}
                </span>
              </p>
            </div>
            <div>
              {!noBudget && (
                <span>
                  {rate > 100 ? "Overspent " : "Left "}
                  {currencyFormatter.format(Math.abs(maxAmount - totalAmount))}
                </span>
              )}
            </div>
          </Details>
        </Top>

        {(maxAmount || maxAmount === `0`) && (
          <ProgressBar variant={setProgressVariant(totalAmount, maxAmount)}>
            <progress value={rate} max="100" />
          </ProgressBar>
        )}
      </Card>
    </>
  );
};

export default BudgetCard;

const Card = styled(Link)`
  border-top: 1px solid #e4e4e4;
  border-bottom: 1px solid #e4e4e4;
  height: 80px;
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  padding: 10px 20px 0 20px;
  transition: all 0.2s linear;
  cursor: pointer;
  text-decoration: none;
  color: #000000;

  &:hover {
    background: #f0faf1;
  }
`;

const ProgressBar = styled.div`
  display: flex;
  align-items: start;
  justify-content: center;
  width: 100%;
  flex: 1;

  progress {
    width: 100%;
  }

  progress[value] {
    appearance: none;

    ::-webkit-progress-bar {
      height: 8px;
      border-radius: 5px;
      background-color: #dddddd;
    }

    ::-webkit-progress-value {
      height: 8px;
      border-top-left-radius: 5px;
      border-bottom-left-radius: 5px;
      border-top-right-radius: ${(props) =>
        props.variant === "rgba(232, 65, 24,0.7)" ? "5px" : "0"};
      border-bottom-right-radius: ${(props) =>
        props.variant === "rgba(232, 65, 24,0.7)" ? "5px" : "0"};
      background-color: ${(props) => props.variant};
      transition: all 0.5s linear;
    }
  }
`;

const Top = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: start;
  flex: 2;
`;

const Title = styled.p`
  font-size: 0.9rem;
  font-weight: 500;
`;

const Details = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: end;
  p,
  span.spend {
    font-size: 17px;
    font-weight: 500;
  }
  span {
    font-size: 0.75rem;
    padding: 2px 0px;
    color: #969696;
  }
`;
