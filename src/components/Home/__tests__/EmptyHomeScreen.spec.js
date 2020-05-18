import React from "react";
import { shallow } from "enzyme";

import EmptyHomeScreen from "../EmptyHomeScreen";

let component;

describe("EmptyHomeScreen", () => {
  beforeAll(() => {
    component = shallow(<EmptyHomeScreen />);
  });

  it("contains a row class", () => {
    expect(component.find("div.row").length).toBe(1);
  });
});
