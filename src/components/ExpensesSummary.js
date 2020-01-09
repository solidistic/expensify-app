import React from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import numeral from "numeral";
import getExpensesTotal from "../selectors/expenses-total";
import selectExpenses from "../selectors/expenses";

export const ExpensesSummary = props => {
  const expenseWord = props.expenseCount === 1 ? "expense" : "expenses";
  const formattedExpensesTotal = numeral(props.expensesTotal / 100).format(
    "$0,0.00"
  );

  return (
    <div className="page-header">
      <div className="content-container">
        <h2 className="page-header__title">
          Viewing <span>{props.expenseCount}</span> {expenseWord} totalling{" "}
          <span>{formattedExpensesTotal}</span>
        </h2>
        <div className="page-header__actions">
          <Link className="button" to="/create">
            Add expense
          </Link>
        </div>
      </div>
    </div>
  );
};

const mapStateToProps = state => {
  const visibleExpenses = selectExpenses(state.expenses, state.filters);
  return {
    expenseCount: visibleExpenses.length,
    expensesTotal: getExpensesTotal(visibleExpenses)
  };
};

export default connect(mapStateToProps)(ExpensesSummary);
