import { useState } from "react";
import { createContext } from "react";
import PropTypes from "prop-types";
import { getItemFromLocalStorage } from "../utils/Utils";

export const ExpenseContext = createContext();
const expensesInLocalStorage = getItemFromLocalStorage("expenses-list");

const INITIAL_EXPNSES =
  expensesInLocalStorage !== false ? expensesInLocalStorage : [];

export const ExpenseProvider = ({ children }) => {
  const [expenses, setExpenses] = useState(INITIAL_EXPNSES);
  return (
    <ExpenseContext.Provider value={[expenses, setExpenses]}>
      {children}
    </ExpenseContext.Provider>
  );
};

ExpenseProvider.propTypes = {
  children: PropTypes.node.isRequired,
};
