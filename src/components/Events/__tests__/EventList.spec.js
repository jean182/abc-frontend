import React from "react";
import { render } from "@testing-library/react";
import EventList from "../EventList";

jest.unmock("react-redux");
const actualRedux = require("react-redux");

actualRedux.useDispatch = jest.fn();

describe("EventList", () => {
  const mockProps = {
    eventList: [
      {
        id: 9,
        fileNumber: 21177,
        description:
          "Exp. 21.177: Ley para determinar las comisiones de intercambio y adquirencia por las transacciones de compra con tarjetas de crédito y débito",
        procedureType: "Ordinario antes de reforma",
        voteType: "Mayoria simple",
        proposedBy: "Welmer Ramos",
        approvalDate: null,
        state: "Pendiente",
        createdAt: "2019-10-15T17:33:18.000Z",
        updatedAt: "2020-03-03T18:13:59.000Z",
      },
    ],
    selectedEvent: {},
  };

  describe("valid eventList", () => {
    // eslint-disable-next-line react/jsx-props-no-spreading
    const component = render(<EventList {...mockProps} />);

    it("puts the description as a value in the form.", () => {
      const { getByTestId } = component;
      const title = getByTestId("event-list-title");
      expect(title).toHaveTextContent("Administración de eventos");
    });
  });
});
