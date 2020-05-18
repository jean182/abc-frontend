import React from "react";
import { mount } from "enzyme";

import Chart from "../Chart";
import bubbleConfig from "../../../data/bubble-config";

let component;

describe("Chart", () => {
  beforeAll(() => {
    component = mount(<Chart chartConfig={bubbleConfig} />);
  });

  it("contains a canvas element", () => {
    expect(component.find("canvas").length).toBe(1);
  });
});
