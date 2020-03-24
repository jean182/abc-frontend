import React from "react";
import { shallow } from "enzyme";

import PrivateRoute from "../PrivateRoute";

let component;

const mockProps = {
  isAuthenticated: true,
  children: <div>Hello</div>,
};

describe("PrivateRoute Component", () => {
  describe("isAuthenticated is true", () => {
    beforeEach(() => {
      component = shallow(
        <PrivateRoute isAuthenticated={mockProps.isAuthenticated}>
          {mockProps.children}
        </PrivateRoute>
      );
    });
    it("displays a route", () => {
      expect(component.find("Route").length).toBe(1);
    });
  });

  afterEach(() => component.unmount());
});
