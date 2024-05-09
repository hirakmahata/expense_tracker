import { PieChart, Pie, Cell, ResponsiveContainer } from "recharts";
import "./PieChartGraph.css";
import { ExpenseContext } from "../context/ExpenseContext";
import { useContext, useEffect, useState } from "react";

const PieChartGraph = () => {
  const [expenses] = useContext(ExpenseContext);

  const [isSmallDevice, setIsSmallDevice] = useState(window.innerWidth < 1025);

  useEffect(() => {
    const handleResize = () => {
      setIsSmallDevice(window.innerWidth < 1025);
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  const getValueByCategory = (category) =>
    expenses
      .filter((e) => e.category === category)
      .reduce((acc, expense) => acc + expense.price, 0);

  const data = [
    { name: "food", value: getValueByCategory("food") },
    { name: "entertainment", value: getValueByCategory("entertainment") },
    { name: "travel", value: getValueByCategory("travel") },
  ];

  const COLORS = ["#a000ff", "#ff9304", "#fde006"];

  const RADIAN = Math.PI / 180;

  const renderCustomizedLabel = ({
    cx,
    cy,
    midAngle,
    innerRadius,
    outerRadius,
    percent,
  }) => {
    const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
    const x = cx + radius * Math.cos(-midAngle * RADIAN);
    const y = cy + radius * Math.sin(-midAngle * RADIAN);

    return (
      <text
        x={x}
        y={y}
        fill="white"
        textAnchor={x > cx ? "start" : "end"}
        dominantBaseline="central"
      >
        {`${(percent * 100).toFixed(0)}%`}
      </text>
    );
  };
  return (
    <ResponsiveContainer
      width={isSmallDevice ? "85%" : "20%"}
      height={isSmallDevice ? "43%" : "80%"}
      margin="0"
    >
      <PieChart>
        <Pie
          data={data}
          cx="50%"
          cy="50%"
          labelLine={false}
          label={renderCustomizedLabel}
          fill="#8884d8"
          dataKey="value"
        >
          {data.map((entry, index) => (
            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
          ))}
        </Pie>
      </PieChart>
      <div className="lebels">
        <div className="lebel">
          <div className="food-color box"></div>
          <div>Food</div>
        </div>
        <div className="lebel">
          <div className="entertainment-color box"></div>
          <div>Entertainment</div>
        </div>
        <div className="lebel">
          <div className="travel-color box"></div>
          <div>Travel</div>
        </div>
      </div>
    </ResponsiveContainer>
  );
};

export default PieChartGraph;
