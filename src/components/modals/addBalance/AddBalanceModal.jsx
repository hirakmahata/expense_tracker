import { useContext, useState } from "react";
import "./AddBalanceModal.css";
import PropTypes from "prop-types";
import { useSnackbar } from "notistack";
import { BalanceContext } from "../../context/BalanceContext";
import {
  getOptionByVarient,
  updateItemInLocalStorage,
} from "../../utils/Utils";

const AddBalanceModal = ({ onAddBalanceModalClose }) => {
  const { enqueueSnackbar } = useSnackbar();

  const [balance, setBalance] = useContext(BalanceContext);
  const [value, setValue] = useState("");

  const handleAddBalance = (e) => {
    e.preventDefault();
    setBalance(balance + Number(value));
    enqueueSnackbar(
      `Rs.${value} has been credited to your wallet successfully`,
      getOptionByVarient("success")
    );
    updateItemInLocalStorage("wallet-balance", balance);
    onAddBalanceModalClose();
  };

  return (
    <div className="balance-modal-container">
      <div className="add-balance-container">
        <h1>Add Balance</h1>
        <div className="add-balance-forms">
          <input
            type="number"
            value={value}
            onChange={(e) => setValue(e.target.value)}
            placeholder="Income Amount"
            className="input-balance-modal"
          />
          <button
            onClick={handleAddBalance}
            type="submit"
            className="add-balance-btn"
          >
            Add Balance
          </button>
          <button
            onClick={onAddBalanceModalClose}
            type="button"
            className="cancel-balance-btn"
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
};

AddBalanceModal.propTypes = {
  onAddBalanceModalClose: PropTypes.func.isRequired,
};

export default AddBalanceModal;
