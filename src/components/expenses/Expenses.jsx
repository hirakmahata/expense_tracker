import { useContext } from "react";
import "./Expenses.css";
import PropTypes from "prop-types";
import { ExpenseContext } from "../context/ExpenseContext";

const Expenses = ({ onAddExpenseModalOpen }) => {
  const [expenses] = useContext(ExpenseContext);

  const getTotalExpenses = () =>
    expenses.reduce((acc, expense) => acc + expense.price, 0);

  return (
    <div className="card expense-card">
      <h1>
        Expenses: <span className="expense">₹{getTotalExpenses()}</span>
      </h1>
      <button onClick={onAddExpenseModalOpen} className="expense-btn">
        + Add Expenses
      </button>
    </div>
  );
};

Expenses.propTypes = {
  onAddExpenseModalOpen: PropTypes.func.isRequired,
};

export default Expenses;
