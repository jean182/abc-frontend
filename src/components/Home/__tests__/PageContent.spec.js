import React from "react";
import { shallow } from "enzyme";

import { PageContent } from "../PageContent";
import GraphicsContainer from "../GraphicsContainer";
import EmptyHomeScreen from "../EmptyHomeScreen";

let component;

const mockProps = {
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
};

describe("PageContent", () => {
  describe("with an event object", () => {
    beforeAll(() => {
      component = shallow(<PageContent selectedEvent={mockProps} />);
    });

    it("contains a SelectedEvent connected component", () => {
      expect(component.find("Connect(SelectedEvent)").length).toBe(1);
    });

    it("contains a GraphicsContainer component", () => {
      expect(component.find(GraphicsContainer).length).toBe(1);
    });
  });

  describe("with an empty event object", () => {
    beforeAll(() => {
      component = shallow(<PageContent />);
    });

    it("contains a EmptyHomeScreen component", () => {
      expect(component.find(EmptyHomeScreen).length).toBe(1);
    });
  });
});
