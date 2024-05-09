import PropTypes from "prop-types";
import { useContext, useState } from "react";
import "./EditExpenseModal.css";
import { useSnackbar } from "notistack";
import {
  getOptionByVarient,
  sortByDate,
  updateItemInLocalStorage,
} from "../../utils/Utils";
import { BalanceContext } from "../../context/BalanceContext";
import { ExpenseContext } from "../../context/ExpenseContext";

const EditExpenseModal = ({ onEditExpenseModalClose, expenseEditObj }) => {
  const { enqueueSnackbar } = useSnackbar();

  const [editData, setEditData] = useState({
    title: expenseEditObj.title,
    price: expenseEditObj.price,
    category: expenseEditObj.category,
    date: expenseEditObj.date,
  });

  const [balance, setBalance] = useContext(BalanceContext);
  const [expenses, setExpenses] = useContext(ExpenseContext);

  const handleEditInputChange = (e) => {
    const { name, value } = e.target;

    setEditData({
      ...editData,
      [name]: value,
    });
  };

  const handleEditExpense = (e) => {
    e.preventDefault();
    const { title, price, category, date } = editData;

    if (!title || !price || !category || !date) {
      enqueueSnackbar(
        "All fields are mandatory. Please fill all fields",
        getOptionByVarient("error")
      );
      return;
    }

    let priceNumber = Number(price);

    if (balance < priceNumber) {
      enqueueSnackbar(
        "You don't have sufficient wallet balance. Check Wallet",
        getOptionByVarient("error")
      );
      return;
    }
    if (priceNumber > expenseEditObj.price) {
      setBalance(balance - (priceNumber - expenseEditObj.price));
    } else if (priceNumber < expenseEditObj.price) {
      setBalance(balance + (expenseEditObj.price - priceNumber));
    }
    expenseEditObj.title = `${title.trim().charAt(0).toUpperCase()}${title
      .slice(1)
      .toLowerCase()}`;
    expenseEditObj.price = priceNumber;
    expenseEditObj.category = category;
    expenseEditObj.date = date;
    setExpenses(sortByDate(expenses));
    enqueueSnackbar(
      `Expense Edited successfully with Title: ${expenseEditObj.title}`,
      getOptionByVarient("success")
    );
    updateItemInLocalStorage("expenses-list", expenses);
    updateItemInLocalStorage("wallet-balance", balance);
    onEditExpenseModalClose();
  };

  return (
    <div className="edit-expense-modal-container">
      <div className="edit-expense-container">
        <h1>Edit Expenses</h1>
        <div className="edit-forms">
          <input
            type="text"
            placeholder="Title"
            name="title"
            required
            value={editData.title}
            onChange={handleEditInputChange}
            className="edit-expense-input-modal"
          />
          <input
            type="number"
            placeholder="Price"
            name="price"
            required
            value={editData.price}
            onChange={handleEditInputChange}
            className="edit-expense-input-modal"
          />
          <select
            className="edit-expense-input-modal-select"
            name="category"
            required
            value={editData.category}
            onChange={handleEditInputChange}
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
            value={editData.date}
            onChange={handleEditInputChange}
            max={new Date().toISOString().split("T")[0]}
            className="edit-expense-input-modal-select"
          />
          <button
            onClick={handleEditExpense}
            type="submit"
            className="edit-expense-btn"
          >
            Add Expense
          </button>
          <button
            type="button"
            className="edit-expense-cancel-expense-btn"
            onClick={onEditExpenseModalClose}
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
};

EditExpenseModal.propTypes = {
  onEditExpenseModalClose: PropTypes.func.isRequired,
  expenseEditObj: PropTypes.shape({
    title: PropTypes.string.isRequired,
    price: PropTypes.number.isRequired,
    date: PropTypes.string.isRequired,
    category: PropTypes.oneOf(["food", "entertainment", "travel"]).isRequired,
  }).isRequired,
};

export default EditExpenseModal;
