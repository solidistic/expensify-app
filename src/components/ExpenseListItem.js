import React from "react";
import { Link } from "react-router-dom";
import numeral from "numeral";
import moment from "moment";

const ExpenseListItem = ({ id, description, amount, createdAt }) => (
  <Link className="list-item" to={`/edit/${id}`}>
    <div>
      <h3 className="list-item__title">{description}</h3>
      <span className="list-item__sub-title"> {moment(createdAt).format("LL")}</span>
    </div>
    <div>
      <h3 className="list-item__data">{numeral(amount / 100).format("$0,0.00")}</h3>
    </div>
  </Link>
);

export default ExpenseListItem;
