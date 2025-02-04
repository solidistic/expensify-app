import configureMockStore from "redux-mock-store";
import thunk from "redux-thunk";
import {
  startAddExpense,
  addExpense,
  editExpense,
  removeExpense,
  setExpenses,
  startSetExpenses,
  startRemoveExpense,
  startEditExpense
} from "../../actions/expenses";
import expenses from "../fixtures/expenses";
import db from "../../firebase/firebase";

const uid = "punainenpaloauto";
const defaultAuthState = { auth: { uid } };
const createMockStore = configureMockStore([thunk]);

beforeEach(done => {
  const expensesData = {};
  expenses.forEach(({ id, description, note, amount, createdAt }) => {
    expensesData[id] = { description, note, amount, createdAt };
  });
  db.ref(`users/${uid}/expenses`)
    .set(expensesData)
    .then(() => done());
});

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

test("should edit expenses from firebase", done => {
  const store = createMockStore(defaultAuthState);
  const updates = {
    amount: 9999,
    note: "Note should be changed"
  };
  const id = expenses[0].id;
  store
    .dispatch(startEditExpense(id, updates))
    .then(() => {
      const actions = store.getActions();
      expect(actions[0]).toEqual({
        type: "EDIT_EXPENSE",
        id,
        updates
      });
      return db.ref(`users/${uid}/expenses/${actions[0].id}`).once("value");
    })
    .then(snapshot => {
      expect(snapshot.val()).toEqual({
        description: expenses[0].description,
        createdAt: expenses[0].createdAt,
        ...updates
      });
      done();
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
  const store = createMockStore(defaultAuthState);
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
      return db
        .ref(`users/${uid}/expenses/${actions[0].expense.id}`)
        .once("value");
    })
    .then(snapshot => {
      expect(snapshot.val()).toEqual(expenseData);
      done();
    });
});

test("should setup set expense action object with data", () => {
  const action = setExpenses(expenses);
  expect(action).toEqual({
    type: "SET_EXPENSES",
    expenses
  });
});

test("should add expense with default values to database and store", done => {
  const store = createMockStore(defaultAuthState);
  const defaultExpenseData = {
    description: "",
    note: "",
    amount: 0,
    createdAt: 0
  };
  store
    .dispatch(startAddExpense({}))
    .then(() => {
      const actions = store.getActions();
      expect(actions[0]).toEqual({
        type: "ADD_EXPENSE",
        expense: {
          id: expect.any(String),
          ...defaultExpenseData
        }
      });
      return db
        .ref(`users/${uid}/expenses/${actions[0].expense.id}`)
        .once("value");
    })
    .then(snapshot => {
      expect(snapshot.val()).toEqual(defaultExpenseData);
      done();
    });
});

test("should fetch the expenses from firebase", () => {
  const store = createMockStore(defaultAuthState);
  store.dispatch(startSetExpenses()).then(() => {
    const actions = store.getActions();
    expect(actions[0]).toEqual({
      type: "SET_EXPENSES",
      expenses
    });
  });
});

test("should remove the expense from firebase and store", done => {
  const store = createMockStore(defaultAuthState);
  store
    .dispatch(startRemoveExpense(expenses[0]))
    .then(() => {
      const actions = store.getActions();
      expect(actions[0]).toEqual({
        type: "REMOVE_EXPENSE",
        id: expenses[0].id
      });
      return db.ref(`users/${uid}/expenses/${actions[0].id}`).once("value");
    })
    .then(snapshot => {
      expect(snapshot.val()).toEqual(null);
      done();
    });
});
