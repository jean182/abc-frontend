/* eslint-disable react/no-children-prop, prettier/prettier */
import React from "react";
import { shallow } from "enzyme";

import Sidebar from "../Sidebar";

let component;

describe("Sidebar Component", () => {
  beforeEach(() => {
    component = shallow(
      <Sidebar
        children={(
          <ul>
            <li>One</li>
          </ul>
        )}
      />
    );
  });

  describe("renders succesfully", () => {
    it("displays a ul", () => {
      expect(component.find("ul").length).toBe(1);
    });
  });

  afterEach(() => component.unmount());
});
