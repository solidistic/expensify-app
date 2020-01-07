import thunk from "redux-thunk";
import configureMockStore from "redux-mock-store";
import { login, logout } from "../../actions/auth";

const createMockStore = configureMockStore([thunk]);

test("should generate login action object", () => {
  const uid = "13knadw2";
  const action = login(uid);
  expect(action).toEqual({
    type: "LOGIN",
    uid
  });
});

test("should generate logout action object", () => {
  expect(logout()).toEqual({
    type: "LOGOUT"
  });
});
