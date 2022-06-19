import React from "react";
import styled from "styled-components";
import { Bar, Line, Pie } from "react-chartjs-2";
import { CategoryScale } from "chart.js";
import Chart from "chart.js/auto";
import { useBudgets, MISCELLANEOUS_BUDGET_ID } from "../../context";
import { format } from "date-fns";
Chart.register(CategoryScale);

const TotalExpenseReport = ({ date, id, startDate, endDate, name }) => {
  const { budgets, getBudgetExpenses, expenses } = useBudgets();

  const expense = expenses.filter((expense) => {
    return expense.name === name;
  });
  // console.log({ expense });

  const uniqueDate = expense
    .map((item) => item.date)
    .filter((value, index, self) => self.indexOf(value) === index);

  //sorted date
  const sort = uniqueDate.sort(function (a, b) {
    const date1 = new Date(a);
    const date2 = new Date(b);
    return date1 - date2;
  });

  const sortedDates = sort.map((item) => {
    return format(new Date(item), "dd MMM");
  });

  const allExpenses = sort.map((dates) => {
    return expense.filter((date) => {
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
    // format(new Date(startDate), "dd MMMM "),
    // format(new Date(endDate), "dd MMMM "),
    datasets: [
      {
        maxBarThickness: 40,
        label: "Spending",
        data: totalArr,
        // expenseArr
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
    <div style={{ textAlign: "center", width: "580px", height: "320px" }}>
      <Bar
        data={data}
        height={400}
        width={600}
        options={{
          maintainAspectRatio: false,
          scales: {
            // x: {
            //   min: format(new Date(startDate), "dd/MM/yyyy hh:mm:ss"),
            //   max: format(new Date(endDate), "dd/MM/yyyy hh:mm:ss"),
            // },
            y: {
              beginAtZero: true,
            },
          },
        }}
      />
    </div>
  );
};

export default TotalExpenseReport;
