import React from "react";
import { shallow } from "enzyme";

import LoginPage from "../LoginPage";

let component;

const mockProps = {
  fakeAuth: {
    authenticate: jest.fn(),
  },
};

describe("LoginPage Component", () => {
  beforeEach(() => {
    component = shallow(<LoginPage fakeAuth={mockProps.fakeAuth} />);
  });

  describe("renders succesfully", () => {
    it("displays a div with row classname", () => {
      expect(component.find(".row").length).toBe(1);
    });
  });

  afterEach(() => component.unmount());
});
