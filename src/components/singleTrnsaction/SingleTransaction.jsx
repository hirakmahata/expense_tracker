import { MdOutlineEdit } from "react-icons/md";
import { PiGiftLight, PiPizza } from "react-icons/pi";
import { TiDeleteOutline } from "react-icons/ti";
import "./SingleTransaction.css";
import PropTypes from "prop-types";
import { CiRollingSuitcase } from "react-icons/ci";

const SingleTransaction = ({
  title,
  price,
  date,
  category,
  onEditExpenseModalOpen,
  onTransactionDelete,
}) => {
  const getIconByCategory = (myCategory, mySize) => {
    switch (myCategory) {
      case "food":
        return <PiPizza size={mySize} />;
      case "entertainment":
        return <PiGiftLight size={mySize} />;
      case "travel":
        return <CiRollingSuitcase size={mySize} />;
      default:
        return null;
    }
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const options = { month: "long", day: "numeric", year: "numeric" };
    return date.toLocaleDateString("en-US", options);
  };

  const iconSize = window.innerWidth < 431 ? 20 : 30;

  return (
    <div className="item">
      <div className="name-icon">
        <div className="icon">{getIconByCategory(category, iconSize)}</div>
        <div className="name-date">
          <div className="name">{`${title.trim().charAt(0).toUpperCase()}${title
            .slice(1)
            .toLowerCase()}`}</div>
          <div className="date">{formatDate(date)}</div>
        </div>
      </div>
      <div className="price-delete-edit">
        <div className="price">₹{price}</div>
        <div onClick={onTransactionDelete} className="delete">
          <TiDeleteOutline size={window.innerWidth < 541 ? 20 : 30} />
        </div>
        <div onClick={onEditExpenseModalOpen} className="edit">
          <MdOutlineEdit size={window.innerWidth < 541 ? 20 : 30} />
        </div>
      </div>
    </div>
  );
};

SingleTransaction.propTypes = {
  title: PropTypes.string.isRequired,
  price: PropTypes.number.isRequired,
  date: PropTypes.string.isRequired,
  category: PropTypes.oneOf(["food", "entertainment", "travel"]).isRequired,
  onEditExpenseModalOpen: PropTypes.func.isRequired,
  onTransactionDelete: PropTypes.func.isRequired,
};

export default SingleTransaction;
