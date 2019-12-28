import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import AppRouter from "./routers/AppRouter";
import configureStore from "./store/configureStore";
import { addExpense } from "./actions/expenses";
import { setTextFilter } from "./actions/filters";
import getVisibleExpenses from "./selectors/expenses";
import "normalize.css/normalize.css";
import "./styles/styles.scss";
import "react-dates/lib/css/_datepicker.css";

const store = configureStore();

store.dispatch(addExpense({ description: "Water bill", amount: 504, createdAt: 3500 }));
store.dispatch(addExpense({ description: "Gas bill", amount: 932, createdAt: 1000 }));
store.dispatch(addExpense({ description: "Insurance bill", amount: 125, createdAt: 5000 }));

console.log(store.getState());
console.log("One liner:", getVisibleExpenses(store.getState().expenses, store.getState().filters));

const jsx = (
  <Provider store={store}>
    <AppRouter />
  </Provider>
);

ReactDOM.render(jsx, document.getElementById("app"));
