import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import { SnackbarProvider } from "notistack";

import { ExpenseProvider } from "./components/context/ExpenseContext.jsx";
import { BalanceProvider } from "./components/context/BalanceContext.jsx";

ReactDOM.createRoot(document.getElementById("root")).render(
  <SnackbarProvider maxSnack={3}>
    <BalanceProvider>
      <ExpenseProvider>
        <App />
      </ExpenseProvider>
    </BalanceProvider>
  </SnackbarProvider>
);
