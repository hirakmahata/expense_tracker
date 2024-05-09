import { useContext } from "react";
import "./Wallet.css";
import PropTypes from "prop-types";
import { BalanceContext } from "../context/BalanceContext";

const Wallet = ({ onAddBalanceModalOpen }) => {
  const [balance] = useContext(BalanceContext);

  return (
    <div className="card">
      <h1>
        Wallet Balance: <span className="balance">₹{balance}</span>
      </h1>
      <button onClick={onAddBalanceModalOpen} className="wallet-btn">
        + Add Income
      </button>
    </div>
  );
};

Wallet.propTypes = {
  onAddBalanceModalOpen: PropTypes.func.isRequired,
};

export default Wallet;
