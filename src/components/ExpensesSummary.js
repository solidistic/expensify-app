import React from "react";
import { connect } from "react-redux";
import numeral from "numeral";
import getExpensesTotal from "../selectors/expenses-total";
import selectExpenses from "../selectors/expenses";

export const ExpensesSummary = props => {
  const expenseWord = props.expenseCount === 1 ? "expense" : "expenses";
  const formattedExpensesTotal = numeral(props.expensesTotal / 100).format("$0,0.00");

  return (
    <div>
      <p>
        Viewing {props.expenseCount} {expenseWord} totalling{" "}
        {formattedExpensesTotal}
      </p>
    </div>
  );
};

const mapStateToProps = state => {
  const visibleExpenses = selectExpenses(state.expenses, state.filters);
  return {
    expenseCount: visibleExpenses.length,
    expensesTotal: getExpensesTotal(visibleExpenses)
  }
};

export default connect(mapStateToProps)(ExpensesSummary);
