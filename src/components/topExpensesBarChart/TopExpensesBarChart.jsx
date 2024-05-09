import React, { useContext } from "react";
import "./TopExpensesBarChart.css";
import { ExpenseContext } from "../context/ExpenseContext";

const TopExpensesBarChart = () => {
  const [expenses] = useContext(ExpenseContext);

  const getPercentageByCategory = (category) => {
    const totalPrice = expenses.reduce(
      (acc, expense) => acc + expense.price,
      0
    );

    const categoryPrice = expenses
      .filter((e) => e.category === category)
      .reduce((acc, expense) => acc + expense.price, 0);

    return ~~((categoryPrice / totalPrice) * 100);
  };

  const TOP_EXPENSES = [
    {
      title: "Entertainment",
      percentage: getPercentageByCategory("entertainment"),
    },
    { title: "Food", percentage: getPercentageByCategory("food") },
    {
      title: "Travel",
      percentage: getPercentageByCategory("travel"),
    },
  ].sort((a, b) => b.percentage - a.percentage);

  return (
    <div className="top-expenses-container">
      <h2 className="top-expenses-heading">Top Expenses</h2>
      <div className="top-expenses">
        {TOP_EXPENSES.map((expense, index) => (
          <React.Fragment key={index}>
            <div className="title">{expense.title}</div>
            <div
              className="bar"
              style={{ width: `${expense.percentage}%` }}
            ></div>
          </React.Fragment>
        ))}
      </div>
    </div>
  );
};

export default TopExpensesBarChart;
