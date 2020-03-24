import React from "react";
import { shallow } from "enzyme";

import MainPage from "../MainPage";

let component;

describe("MainPage Component", () => {
  beforeEach(() => {
    component = shallow(<MainPage />);
  });

  describe("renders succesfully", () => {
    it("displays children content", () => {
      expect(component.find("h1").text()).toEqual("ABC Frontend");
    });
  });

  afterEach(() => component.unmount());
});
