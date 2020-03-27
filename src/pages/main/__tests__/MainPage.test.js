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
      expect(component.find("Connect(EventListContainer)").length).toEqual(1);
    });
  });

  afterEach(() => component.unmount());
});
