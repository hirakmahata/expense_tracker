import { useState } from "react";
import { createContext } from "react";
import PropTypes from "prop-types";
import { getItemFromLocalStorage } from "../utils/Utils";

export const BalanceContext = createContext();

const balanceInLocalStorage = getItemFromLocalStorage("wallet-balance");

const INITIAL_BALANCE =
  balanceInLocalStorage !== false ? balanceInLocalStorage : 5000;

export const BalanceProvider = ({ children }) => {
  const [balance, setBalance] = useState(INITIAL_BALANCE);
  return (
    <BalanceContext.Provider value={[balance, setBalance]}>
      {children}
    </BalanceContext.Provider>
  );
};

BalanceProvider.propTypes = {
  children: PropTypes.node.isRequired,
};
