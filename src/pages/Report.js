import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { Bar, Line, Pie } from "react-chartjs-2";
import { CategoryScale } from "chart.js";
import Chart from "chart.js/auto";
import format from "date-fns/format";
import { supabase } from "../supabaseClient";
import TotalCard from "../components/total-card";
import { Head } from "./Budgets";
Chart.register(CategoryScale);

const Report = () => {
  const [toggleState, setToggleState] = useState(1);
  const [monthData, setMonthData] = useState([]);

  const date = new Date();

  const currentMonth = {
    first: new Date(date.getFullYear(), date.getMonth(), 1),
    last: new Date(date.getFullYear(), date.getMonth() + 1, 0),
  };

  const lastMonth = {
    first: new Date(date.getFullYear(), date.getMonth() - 1, 1),
    last: new Date(date.getFullYear(), date.getMonth(), 0),
  };

  const monthDetail = toggleState === 1 ? currentMonth : lastMonth;

  const dateString1 = format(monthDetail.first, "yyyy-MM-dd");
  const dateString2 = format(monthDetail.last, "yyyy-MM-dd");

  useEffect(() => {
    month();
  }, [toggleState]);

  const month = async () => {
    const { data, error } = await supabase
      .from("expenses")
      .select()
      .lte("date", dateString2)
      .gte("date", dateString1);
    if (error) console.log("error", error);
    else setMonthData(data);
  };

  console.log({ monthData });
  const toggleTab = (index) => {
    setToggleState(index);
  };

  const uniqueDates = monthData
    .map((item) => item.date)
    .filter((value, index, self) => self.indexOf(value) === index);

  //sorted date
  const sort = uniqueDates.sort(function (a, b) {
    const date1 = new Date(a);
    const date2 = new Date(b);
    return date1 - date2;
  });

  const sortedDates = sort.map((item) => {
    return format(new Date(item), "d MMM");
  });

  const allExpenses = sort.map((dates) => {
    return monthData.filter((date) => {
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

  const data = {
    labels: sortedDates, //dates
    datasets: [
      {
        label: "Total Expense",
        maxBarThickness: 90,
        data: totalArr, // amount
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
      <Head>
        <TotalCard noButton />
      </Head>
      <Buttons>
        <button onClick={() => toggleTab(1)}>This Month</button>
        <button onClick={() => toggleTab(2)}>Last Month</button>
      </Buttons>
      <ChartData>
        <Bar
          data={data}
          height={400}
          width={600}
          options={{
            maintainAspectRatio: false,
          }}
        />
      </ChartData>
    </Data>
  );
};

export default Report;

const Data = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  flex-direction: column;
  align-items: center;
`;
const ChartData = styled.div`
  width: min(100vw, 680px);
  padding: 20px 10px;
  margin: 0 auto;
  background: linear-gradient(145deg, #f5f6fa, #ffffff);
  box-shadow: 27px 27px 54px #666666, -27px -27px 54px #ffffff;
`;

const Buttons = styled.div`
  margin: 20px 0;
`;
