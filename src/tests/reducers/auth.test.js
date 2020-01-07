import authReducer from "../../reducers/auth";

test("should set uid for login", () => {
  const uid = "1302al";
  const state = authReducer({}, { type: "LOGIN", uid });
  expect(state).toEqual({
    uid
  });
});

test("should clear uid for logout", () => {
  const state = authReducer({ uid: "awdasd" }, { type: "LOGOUT" });
  expect(state).toEqual({});
});
