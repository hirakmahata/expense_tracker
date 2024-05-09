import "./App.css";
import { useContext, useEffect, useState } from "react";
import { ExpenseContext } from "./components/context/ExpenseContext";
import Expenses from "./components/expenses/Expenses";
import PieChartGraph from "./components/pieChart/PieChartGraph";
import TopExpensesBarChart from "./components/topExpensesBarChart/TopExpensesBarChart";
import Wallet from "./components/wallet/Wallet";
import Transactions from "./components/transactions/Transactions";
import AddExpenseModal from "./components/modals/addExpense/AddExpenseModal";
import AddBalanceModal from "./components/modals/addBalance/AddBalanceModal";
import EditExpenseModal from "./components/modals/editExpense/EditExpenseModal";
import { BalanceContext } from "./components/context/BalanceContext";
import { updateItemInLocalStorage } from "./components/utils/Utils";

const App = () => {
  const [showAddExpenseModal, setShowAddExpenseModal] = useState(false);
  const [showEditExpenseModal, setShowEditExpenseModal] = useState(false);
  const [showAddBalanceModal, setShowAddBalanceModal] = useState(false);

  const [expenseEditObj, setExpenseEditObj] = useState({});

  const [balance] = useContext(BalanceContext);
  const [expenses] = useContext(ExpenseContext);

  const handleExpenseEdit = (id) => {
    setShowEditExpenseModal(true);
    setExpenseEditObj(expenses.find((expense) => expense.id === id));
  };

  useEffect(() => {
    updateItemInLocalStorage("wallet-balance", balance);
    updateItemInLocalStorage("expenses-list", expenses);
  }, [balance, expenses]);

  return (
    <div className="container">
      <h1 className="heading">Expense Tracker</h1>
      <div className="hero">
        <Wallet onAddBalanceModalOpen={() => setShowAddBalanceModal(true)} />
        <Expenses onAddExpenseModalOpen={() => setShowAddExpenseModal(true)} />
        <PieChartGraph />
      </div>
      <div className="transactions-expenses">
        <Transactions onEditExpenseModalOpen={handleExpenseEdit} />
        <TopExpensesBarChart />
      </div>
      {showAddExpenseModal && (
        <AddExpenseModal
          onAddExpenseModalClose={() => setShowAddExpenseModal(false)}
        />
      )}
      {showAddBalanceModal && (
        <AddBalanceModal
          onAddBalanceModalClose={() => setShowAddBalanceModal(false)}
        />
      )}
      {showEditExpenseModal && (
        <EditExpenseModal
          onEditExpenseModalClose={() => setShowEditExpenseModal(false)}
          expenseEditObj={expenseEditObj}
        />
      )}
    </div>
  );
};

export default App;
