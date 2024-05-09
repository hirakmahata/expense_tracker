import { useContext, useState } from "react";
import "./AddExpenseModal.css";
import PropTypes from "prop-types";
import { ExpenseContext } from "../../context/ExpenseContext";
import { BalanceContext } from "../../context/BalanceContext";
import { useSnackbar } from "notistack";
import {
  addItemToLocalStorage,
  getOptionByVarient,
  updateItemInLocalStorage,
} from "../../utils/Utils";

const AddExpenseModal = ({ onAddExpenseModalClose }) => {
  const { enqueueSnackbar } = useSnackbar();

  const [expenses, setExpenses] = useContext(ExpenseContext);
  const [balance, setBalance] = useContext(BalanceContext);

  const [formData, setFormData] = useState({
    title: "",
    price: "",
    category: "",
    date: "",
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;

    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleAddExpense = (e) => {
    e.preventDefault();
    const { title, price, category, date } = formData;
    if (!title || !price || !category || !date) {
      enqueueSnackbar(
        "All fields are mandatory. Please fill all fields",
        getOptionByVarient("error")
      );
      return;
    }
    const newExpense = {
      id: String(Date.now()),
      ...formData,
      price: Number(formData.price),
    };
    if (balance < newExpense.price) {
      enqueueSnackbar(
        "You don't have sufficient wallet balance. Add Wallet Balance",
        getOptionByVarient("error")
      );
      return;
    }
    setExpenses([...expenses, newExpense]);
    setBalance(balance - newExpense.price);
    enqueueSnackbar(
      `Expense added successfully with Title: ${newExpense.title}`,
      getOptionByVarient("success")
    );
    updateItemInLocalStorage("wallet-balance", balance);
    addItemToLocalStorage("expenses-list", expenses);
    onAddExpenseModalClose();
  };

  return (
    <div className="modal-container">
      <div className="add-expense-container">
        <h1>Add Expenses</h1>
        <div className="forms">
          <input
            type="text"
            placeholder="Title"
            name="title"
            required
            value={formData.title}
            onChange={handleInputChange}
            className="input-modal"
          />
          <input
            type="number"
            placeholder="Price"
            name="price"
            required
            value={formData.price}
            onChange={handleInputChange}
            className="input-modal"
          />
          <select
            className="input-modal-select"
            name="category"
            required
            value={formData.category}
            onChange={handleInputChange}
          >
            <option value="category">Select Category</option>
            <option value="food">Food</option>
            <option value="entertainment">Entertainment</option>
            <option value="travel">Travel</option>
          </select>
          <input
            type="date"
            name="date"
            required
            className="input-modal-select"
            value={formData.date}
            onChange={handleInputChange}
            max={new Date().toISOString().split("T")[0]}
          />
          <button
            onClick={handleAddExpense}
            type="submit"
            className="add-expense-btn"
          >
            Add Expense
          </button>
          <button
            type="button"
            className="cancel-expense-btn"
            onClick={onAddExpenseModalClose}
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
};

AddExpenseModal.propTypes = {
  onAddExpenseModalClose: PropTypes.func.isRequired,
};

export default AddExpenseModal;
