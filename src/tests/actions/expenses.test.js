import { addExpense, editExpense, removeExpense } from "../../actions/expenses";

test("should setup remove expense action object", () => {
  const action = removeExpense({ id: "1a2b3c" });
  expect(action).toEqual({
    type: "REMOVE_EXPENSE",
    id: "1a2b3c"
  });
});

test("should edit expense action object", () => {
  const updates = {
    description: "Testing",
    note: "test note",
    amount: "123013",
    createdAt: 1000
  };
  const action = editExpense("123wdwd", updates);
  expect(action).toEqual({
    type: "EDIT_EXPENSE",
    id: "123wdwd",
    updates
  })
});

test("should setup add expense object with provided values", () => {
  const expenseData = {
    description: "Rent",
    amount: 102931,
    createdAt: 1200,
    note: "This was last months rent"
  };
  const action = addExpense(expenseData);
  expect(action).toEqual({
    type: "ADD_EXPENSE",
    expense: {
      ...expenseData,
      id: expect.any(String)
    }
  })
});

test("should setup add expense object with default values", () => {
  expect(addExpense()).toEqual({
    type: "ADD_EXPENSE",
    expense: {
      description: "",
      amount: 0,
      note: "",
      createdAt: 0,
      id: expect.any(String)
    }
  });
});