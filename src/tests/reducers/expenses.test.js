import expensesReducer from "../../reducers/expenses";
import expenses from "../fixtures/expenses";

test("should set default state", () => {
  const state = expensesReducer(undefined, { type: "@@INIT" });
  expect(state).toEqual([]);
});

test("should remove expense by id", () => {
  const state = expensesReducer(expenses, {
    type: "REMOVE_EXPENSE",
    id: expenses[1].id
  });
  expect(state.length).toBe(2);
  expect(state).toEqual([expenses[0], expenses[2]]);
});

test("should not remove expenses if id is not found", () => {
  const state = expensesReducer(expenses, {
    type: "REMOVE_EXPENSE",
    id: "413"
  });
  expect(state.length).toBe(3);
  expect(state).toEqual(expenses);
});

test("should add an expense", () => {
  const expense = {
    id: "20",
    description: "Coffee mug",
    amount: "2500",
    note: "Laura's christmast present",
    createdAt: 0
  };
  const state = expensesReducer(expenses, {
    type: "ADD_EXPENSE",
    expense
  });
  expect(state).toEqual([...expenses, expense]);
});

test("should edit an expense", () => {
  const state = expensesReducer(expenses, {
    type: "EDIT_EXPENSE",
    id: expenses[0].id,
    updates: {
      amount: 500000
    }
  });
  expect(state[0]).toEqual({
    id: expenses[0].id,
    description: "Milk",
    amount: 500000,
    note: "",
    createdAt: 0
  });
});

test("should not edit an expense if not found", () => {
  const state = expensesReducer(expenses, {
    type: "EDIT_EXPENSE",
    id: "513",
    updates: {
      amount: "1"
    }
  });
  expect(state).toEqual(expenses);
});

test("should set expenses", () => {
  const state = expensesReducer(expenses, {
    type: "SET_EXPENSES",
    expenses: [expenses[1]]
  });
  expect(state).toEqual([expenses[1]]);
});
