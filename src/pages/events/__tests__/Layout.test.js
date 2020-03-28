import React from "react";
import { shallow } from "enzyme";

import Layout from "../Layout";

let component;

const mockProps = <div>Content goes here!</div>;

describe("Layout Component", () => {
  beforeEach(() => {
    component = shallow(<Layout>{mockProps}</Layout>);
  });

  describe("renders succesfully", () => {
    it("displays children content", () => {
      expect(component.find(mockProps)).toBeTruthy();
    });
  });

  afterEach(() => component.unmount());
});
