import React from "react";
import { shallow } from "enzyme";

import LoginForm from "../LoginForm";

jest.mock("react-router-dom", () => ({
  useHistory: () => ({
    replace: jest.fn(),
  }),
  useLocation: () => ({
    state: {
      pathname: "/",
    },
  }),
}));

const mockProps = {
  fakeAuth: {
    authenticate: jest.fn(),
  },
};

let component;

describe("LoginForm Component", () => {
  beforeEach(() => {
    component = shallow(<LoginForm fakeAuth={mockProps.fakeAuth} />);
  });

  describe("renders succesfully", () => {
    it("displays a form", () => {
      expect(component.find("form").length).toBe(1);
    });
  });

  afterEach(() => component.unmount());
});
