import React from "react";
import styled from "styled-components";
import { Bar, Line, Pie } from "react-chartjs-2";
import { CategoryScale } from "chart.js";
import Chart from "chart.js/auto";
import { useBudgets } from "../../context";
import { format } from "date-fns";
Chart.register(CategoryScale);

const TotalExpenseReport = ({ chartData }) => {
  const { budgets, getBudgetExpenses } = useBudgets();

  const uniqueDate = chartData
    .map((item) => item.date)
    .filter((value, index, self) => self.indexOf(value) === index);

  //sorted date
  const sort = uniqueDate.sort(function (a, b) {
    const date1 = new Date(a);
    const date2 = new Date(b);
    return date1 - date2;
  });

  const sortedDates = sort.map((item) => {
    return format(new Date(item), "d MMM");
  });

  const allExpenses = sort.map((dates) => {
    return chartData.filter((date) => {
      return date.date === dates;
    });
  });

  const totalexpday = allExpenses.map((items) => {
    return items.map((item) => {
      return item.amount;
    });
  });

  const totalArr = totalexpday.map((item) => {
    return item.reduce((total, expense) => total + expense, 0);
  });

  const arr = [];

  budgets.forEach((element) => {
    const amount = getBudgetExpenses(element.budgetId).reduce(
      (total, expense) => total + expense.amount,
      0
    );
    arr.push(amount);
  });

  const data = {
    labels: sortedDates,
    datasets: [
      {
        maxBarThickness: 70,
        label: "Spending",
        data: totalArr,
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
    <ReportData>
      {totalArr.length !== 0 ? (
        <Bar
          data={data}
          options={{
            maintainAspectRatio: false,
            scales: {
              y: {
                beginAtZero: true,
                ticks: {
                  font: {
                    size: 9,
                  },
                },
              },
              x: {
                ticks: {
                  font: {
                    size: 10,
                  },
                },
              },
            },
          }}
        />
      ) : (
        <p>no transactions</p>
      )}
    </ReportData>
  );
};

export default TotalExpenseReport;

const ReportData = styled.div`
  width: min(100%, 600px);
  height: 300px;
`;
