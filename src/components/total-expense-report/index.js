import React from "react";
import styled from "styled-components";
import { Bar, Line, Pie } from "react-chartjs-2";
import { CategoryScale, Scale } from "chart.js";
import Chart from "chart.js/auto";
import { useBudgets, MISCELLANEOUS_BUDGET_ID } from "../../context";
Chart.register(CategoryScale);

const TotalExpenseReport = () => {
  const { budgets, getBudgetExpenses } = useBudgets();
  const budgetsName = budgets.map((budget) => budget.name);
  const allBudgetsName = budgetsName.concat(MISCELLANEOUS_BUDGET_ID);

  const arr = [];

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

  const data = {
    labels: mis ? allBudgetsName : budgetsName,
    datasets: [
      {
        label: "Total Spendings",
        data: expenseArr,

        backgroundColor: [
          "rgba(255, 99, 132, 0.2)",
          "rgba(54, 162, 235, 0.2)",
          "rgba(255, 206, 86, 0.2)",
          "rgba(75, 192, 192, 0.2)",
          "rgba(153, 102, 255, 0.2)",
          "rgba(255, 159, 64, 0.2)",
        ],
        borderColor: [
          "rgba(255, 99, 132, 1)",
          "rgba(54, 162, 235, 1)",
          "rgba(255, 206, 86, 1)",
          "rgba(75, 192, 192, 1)",
          "rgba(153, 102, 255, 1)",
          "rgba(255, 159, 64, 1)",
        ],
        borderWidth: 1,
      },
    ],
  };

  return (
    <>
      <Bar
        data={data}
        height={400}
        width={600}
        options={{
          maintainAspectRatio: false,
          scales: {
            y: {
              beginAtZero: true,
            },
          },
        }}
      />
    </>
  );
};

export default TotalExpenseReport;
