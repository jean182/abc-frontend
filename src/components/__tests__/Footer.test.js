import React from "react";
import { shallow } from "enzyme";

import Footer from "../Footer";

let component;

describe("Footer Component", () => {
  beforeEach(() => {
    component = shallow(<Footer />);
  });

  describe("renders succesfully", () => {
    it("displays a nav node", () => {
      expect(component.find("nav").length).toBe(1);
    });

    it("displays a footer node", () => {
      expect(component.find("footer").length).toBe(1);
    });
  });

  afterEach(() => component.unmount());
});
