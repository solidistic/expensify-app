import getExpensesTotal from "../../selectors/expenses-total";
import expenses from "../fixtures/expenses";

test("should correctly add multiple expenses", () => {
  const total = getExpensesTotal(expenses);
  expect(total).toBe(797500);
});

test("should correctly add up a single expense", () => {
  expect(getExpensesTotal([expenses[1]])).toBe(790000);
});

test("should return 0 if no expenses", () => {
  expect(getExpensesTotal([])).toBe(0);
});
