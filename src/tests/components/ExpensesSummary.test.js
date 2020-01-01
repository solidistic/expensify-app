import React from "react";
import { shallow } from "enzyme";
import { ExpensesSummary } from "../../components/ExpensesSummary";

test("should render ExpensesSummary correctly", () => {
  const wrapper = shallow(<ExpensesSummary />);
  expect(wrapper).toMatchSnapshot();
});

test("should render ExpenseSummary correctly with multiple expenses", () => {
  const wrapper = shallow(
    <ExpensesSummary expensesTotal={720190} expenseCount={23} />
  );
  expect(wrapper).toMatchSnapshot();
});

test("should render ExpenseSummary correctly with one expense", () => {
  const wrapper = shallow(
    <ExpensesSummary expensesTotal={120} expenseCount={1} />
  );
  expect(wrapper).toMatchSnapshot();
});
