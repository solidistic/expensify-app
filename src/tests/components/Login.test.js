import React from "react";
import { shallow } from "enzyme";
import { Login } from "../../components/Login";

let wrapper, startLogin;

beforeEach(() => {
  startLogin = jest.fn();
  wrapper = shallow(<Login startLogin={startLogin} />);
});

test("should render Login page correctly", () => {
  expect(wrapper).toMatchSnapshot();
});

test("should call startLogin on Login button click", () => {
  wrapper.find("button").simulate("click");
  expect(startLogin).toHaveBeenCalled();
});
