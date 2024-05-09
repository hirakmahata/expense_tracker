import { FaArrowLeftLong, FaArrowRightLong } from "react-icons/fa6";
import { useContext, useState } from "react";
import PropTypes from "prop-types";
import "./Transactions.css";
import SingleTransaction from "../singleTrnsaction/SingleTransaction";
import { ExpenseContext } from "../context/ExpenseContext";
import { useSnackbar } from "notistack";
import { getOptionByVarient } from "../utils/Utils";

const Transactions = ({ onEditExpenseModalOpen }) => {
  const { enqueueSnackbar } = useSnackbar();

  const [expenses, setExpenses] = useContext(ExpenseContext);
  const [currentPage, setCurrentPage] = useState(1);
  const recordsPerpage = 3;
  const lastIndex = currentPage * recordsPerpage;
  const firstIndex = lastIndex - recordsPerpage;
  const visibleExpenses = expenses.slice(firstIndex, lastIndex);
  const numberOfPages = Math.ceil(expenses.length / recordsPerpage);

  const handleTransactionDelete = (id) => {
    setExpenses(expenses.filter((expense) => expense.id !== id));
    const deleteExpense = expenses.find((record) => record.id === id);
    enqueueSnackbar(
      `Expense Deleted successfully with Title: ${deleteExpense.title} and Price: ${deleteExpense.price}`,
      getOptionByVarient("success")
    );
  };

  const goPreviousPage = () => {
    if (currentPage !== 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  const goNextPage = () => {
    if (currentPage !== numberOfPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  return (
    <div className="transaction-container">
      <h2 className="transaction-heading">Recent Transactions</h2>
      {expenses.length > 0 ? (
        <div className="all-transactions">
          {visibleExpenses.map((expense) => (
            <SingleTransaction
              key={expense.id}
              onEditExpenseModalOpen={() => onEditExpenseModalOpen(expense.id)}
              title={expense.title}
              date={expense.date}
              price={expense.price}
              category={expense.category}
              onTransactionDelete={() => handleTransactionDelete(expense.id)}
            />
          ))}

          {expenses.length > recordsPerpage && (
            <div className="pagination">
              <div
                onClick={goPreviousPage}
                className={`left ${currentPage === 1 ? "disabled" : ""}`}
              >
                <FaArrowLeftLong />
              </div>
              <div className="pageNumber">{currentPage}</div>
              <div
                onClick={goNextPage}
                className={`right ${
                  currentPage === numberOfPages ? "disabled" : ""
                }`}
              >
                <FaArrowRightLong />
              </div>
            </div>
          )}
        </div>
      ) : (
        <div className="all-transactions no-transactions">
          <h1>No Transaction Yet</h1>
        </div>
      )}
    </div>
  );
};

Transactions.propTypes = {
  onEditExpenseModalOpen: PropTypes.func.isRequired,
};

export default Transactions;
