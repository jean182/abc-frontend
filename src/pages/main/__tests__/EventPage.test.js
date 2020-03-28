import React from "react";
import { shallow } from "enzyme";

import EventPage from "../EventPage";

let component;

describe("EventPage Component", () => {
  beforeEach(() => {
    component = shallow(<EventPage />);
  });

  describe("renders succesfully", () => {
    it("displays children content", () => {
      expect(component.find("Connect(EventListContainer)").length).toEqual(1);
    });
  });

  afterEach(() => component.unmount());
});
