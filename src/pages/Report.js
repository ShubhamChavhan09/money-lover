import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { Bar, Line, Pie } from "react-chartjs-2";
import { CategoryScale } from "chart.js";
import Chart from "chart.js/auto";
import { useBudgets, MISCELLANEOUS_BUDGET_ID } from "../context";
import format from "date-fns/format";
import { supabase } from "../supabaseClient";
import { setWeek } from "date-fns";
Chart.register(CategoryScale);

const Report = () => {
  const [lastWeek, setLastWeek] = useState([]);
  const { budgets, getBudgetExpenses } = useBudgets();
  const budgetsName = budgets.map((budget) => budget.name);
  const allBudgetsName = budgetsName.concat("Miscellaneous");
  const arr = [];

  //
  const date1 = new Date();
  const date2 = new Date();
  date2.setDate(date2.getDate() - 7);

  const dateString1 = format(date1, "yyyy-MM-dd'T'HH:mm");
  const dateString2 = format(date2, "yyyy-MM-dd'T'HH:mm");

  useEffect(() => {
    week();
  }, []);

  const week = async () => {
    const { data, error } = await supabase
      .from("expenses")
      .select()
      .lte("date", dateString1)
      .gte("date", dateString2);
    if (error) console.log("error", error);
    else setLastWeek(data);
  };
  console.log(lastWeek);

  budgets.forEach((element) => {
    const amount = getBudgetExpenses(element.id).reduce(
      (total, expense) => total + expense.amount,
      0
    );
    arr.push(amount);
  });

  const mis = getBudgetExpenses(MISCELLANEOUS_BUDGET_ID).reduce(
    (total, expense) => total + expense.amount,
    0
  );
  const expenseArr = arr.concat(mis);

  const weekArr = lastWeek.map((data) => {
    return data.amount;
  });

  const dayArr = lastWeek.map((data) => {
    return new Date(data.date).toLocaleString("en-us", { weekday: "long" });
    // return data.date;
  });

  const data = {
    labels: dayArr,
    datasets: [
      {
        label: "Total Expense",
        data: weekArr,
        backgroundColor: [
          "rgba(255, 99, 132, 0.2)",
          "rgba(54, 162, 235, 0.2)",
          "rgba(255, 206, 86, 0.2)",
          "rgba(75, 192, 192, 0.2)",
          "rgba(153, 102, 255, 0.2)",
          "rgba(255, 159, 64, 0.2)",
          "rgba(26, 188, 156, 0.3)",
          "rgba(192, 57, 43, 0.2)",
        ],
        borderColor: [
          "rgba(255, 99, 132, 1)",
          "rgba(54, 162, 235, 1)",
          "rgba(255, 206, 86, 1)",
          "rgba(75, 192, 192, 1)",
          "rgba(153, 102, 255, 1)",
          "rgba(255, 159, 64, 1)",
          "rgba(26, 188, 156,1.0)",
          "rgba(192, 57, 43, 1)",
        ],
        borderWidth: 1,
      },
    ],
  };

  return (
    <Data>
      <Line
        data={data}
        height={400}
        width={600}
        options={{
          maintainAspectRatio: false,
        }}
      />
    </Data>
  );
};

export default Report;

const Data = styled.div`
  // width: 700px;
  background: rgba(30, 39, 46, 1);
`;
