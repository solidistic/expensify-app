import filtersReducer from "../../reducers/filters";
import moment from "moment";

test("should setup default filter values", () => {
  const state = filtersReducer(undefined, { type: "@@INIT" });
  expect(state).toEqual({
    text: "",
    sortBy: "date",
    startDate: moment().startOf("month"),
    endDate: moment().endOf("month")
  });
});

test("should set sort by to amount", () => {
  const state = filtersReducer(undefined, { type: "SORT_BY_AMOUNT" });
  expect(state).toEqual({
    text: "",
    sortBy: "amount",
    startDate: moment().startOf("month"),
    endDate: moment().endOf("month")
  });
});

test("should set sort by to date", () => {
  const currentState = {
    text: "",
    sortBy: "amount",
    startDate: undefined,
    endDate: undefined
  };
  const state = filtersReducer(currentState, { type: "SORT_BY_DATE" });
  expect(state.sortBy).toBe("date");
});

test("should set text filter", () => {
  const state = filtersReducer(undefined, {
    type: "SET_TEXT_FILTER",
    text: "test filter"
  });
  expect(state.text).toBe("test filter");
});

test("should set startDate filter", () => {
  const state = filtersReducer(undefined, {
    type: "SET_START_DATE",
    startDate: moment(0)
      .add(2)
      .valueOf()
  });
  expect(state.startDate).toEqual(
    moment(0)
      .add(2)
      .valueOf()
  );
});

test("should set endDate filter", () => {
  const state = filtersReducer(undefined, {
    type: "SET_END_DATE",
    endDate: moment(20)
      .add(6)
      .valueOf()
  });
  expect(state.endDate).toEqual(
    moment(20)
      .add(6)
      .valueOf()
  );
});
