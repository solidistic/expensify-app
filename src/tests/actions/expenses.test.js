import configureMockStore from "redux-mock-store";
import thunk from "redux-thunk";
import {
  startAddExpense,
  addExpense,
  editExpense,
  removeExpense
} from "../../actions/expenses";
import expenses from "../fixtures/expenses";
import db from "../../firebase/firebase";

const createMockStore = configureMockStore([thunk]);

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
  });
});

test("should setup add expense object with provided values", () => {
  const action = addExpense(expenses[2]);
  expect(action).toEqual({
    type: "ADD_EXPENSE",
    expense: expenses[2]
  });
});

test("should add expense to database and store", done => {
  const store = createMockStore({});
  const expenseData = {
    description: "Raspberry Pi",
    amount: 6000,
    note: "For the sake of it",
    createdAt: 10000
  };
  store
    .dispatch(startAddExpense(expenseData))
    .then(() => {
      const actions = store.getActions();
      expect(actions[0]).toEqual({
        type: "ADD_EXPENSE",
        expense: {
          id: expect.any(String),
          ...expenseData
        }
      });
      return db.ref(`expenses/${actions[0].expense.id}`).once("value");
    })
    .then(snapshot => {
      expect(snapshot.val()).toEqual(expenseData);
      done();
    });
});

test("should add expense to database and store", () => {
  const store = createMockStore({});
  const expenseData = {
    description: "",
    note: "",
    amount: 0,
    createdAt: 0
  };
  store.dispatch(startAddExpense({}))
    .then(() => {
      const actions = store.getActions();
      expect(actions[0]).toEqual({
        type: "ADD_EXPENSE",
        expense: {
          id: expect.any(String),
          ...expenseData
        }
      });
    return db.ref(`expenses/${actions[0].expense.id}`).once("value");
    })
    .then(snapshot => {
      expect(snapshot.val()).toEqual(expenseData);
    })
});

// test("should setup add expense object with default values", () => {
//   expect(addExpense()).toEqual({
//     type: "ADD_EXPENSE",
//     expense: {
//       description: "",
//       amount: 0,
//       note: "",
//       createdAt: 0,
//       id: expect.any(String)
//     }
//   });
// });
