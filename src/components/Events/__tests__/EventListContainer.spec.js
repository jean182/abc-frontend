/* eslint-disable react/jsx-props-no-spreading */
import React from "react";
import { shallow } from "enzyme";

import { EventListContainer } from "../EventListContainer";
import EventList from "../EventList";
import Loading from "../../Shared/Loading";

let component;

const mockProps = {
  eventList: [
    {
      id: 9,
      file_number: 21177,
      description:
        "Exp. 21.177: Ley para determinar las comisiones de intercambio y adquirencia por las transacciones de compra con tarjetas de crédito y débito",
      procedure_type: "Ordinario antes de reforma",
      vote_type: "Mayoria simple",
      proposed_by: "Welmer Ramos",
      approval_date: null,
      state: "Pendiente",
      created_at: "2019-10-15T17:33:18.000Z",
      updated_at: "2020-03-03T18:13:59.000Z",
    },
  ],
  selectedEvent: {},
  error: null,
  loading: false,
  getEvents: jest.fn(),
};

describe("EventListContainer Component", () => {
  describe("with evenList prop with data", () => {
    beforeAll(() => {
      component = shallow(<EventListContainer {...mockProps} />);
    });

    it("wraps a EventList component", () => {
      expect(component.find(EventList).length).toBe(1);
    });
  });

  describe("when loading is true", () => {
    beforeEach(() => {
      component = shallow(<EventListContainer {...mockProps} loading />);
    });

    it("wraps a Loading component", () => {
      expect(component.find(Loading).length).toBe(1);
    });
  });

  describe("when error is present", () => {
    beforeEach(() => {
      component = shallow(<EventListContainer {...mockProps} error="404" />);
    });

    it("shows a p tag with the error message", () => {
      expect(component.find("p").text()).toBe("404");
    });
  });
});
