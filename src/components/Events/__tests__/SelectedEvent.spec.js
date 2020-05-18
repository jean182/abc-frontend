import React from "react";
import { render, cleanup } from "@testing-library/react";
import { SelectedEvent } from "../SelectedEvent";

afterEach(cleanup);

describe("SelectedEvent", () => {
  describe("valid event", () => {
    const validSelectedEvent = {
      id: 12,
      approvalDate: "2019-11-07",
      "approvalDate?": true,
      description:
        "Exp. 21.213: Ley para la defensa del consumidor de productos y servicios financieros",
      fileNumber: 21213,
      impactAverage: "3.0",
      probabilityAverage: "7.3333333333333333",
      procedureType: "ordinary_after",
      proposedBy: "María Inés Solís",
      stage: "pending",
      state: "current",
      createdAt: "2019-10-15T17:33:51.000Z",
      updatedAt: "2020-05-15T18:00:34.000Z",
      voteType: "simple_majority",
    };
    const setup = (dataId) => {
      const utils = render(
        <SelectedEvent selectedEvent={validSelectedEvent} />
      );
      const input = utils.getByTestId(dataId);
      return {
        input,
        ...utils,
      };
    };

    it("puts the description as a value in the form.", () => {
      const { input } = setup("read-only-description");
      expect(input.defaultValue).toBe(validSelectedEvent.description);
    });

    it("puts the proposedBy as a value in the form.", () => {
      const { input } = setup("read-only-proposedBy");
      expect(input.defaultValue).toBe(validSelectedEvent.proposedBy);
    });

    it("puts the proposedBy as a value in the form.", () => {
      const { input } = setup("read-only-approvalDate-day");
      expect(input.defaultValue).toBe("7");
    });

    it("puts the day based on the proposedBy attribute as a value in the form.", () => {
      const { input } = setup("read-only-approvalDate-day");
      expect(input.defaultValue).toBe("7");
    });

    it("puts the month based on the proposedBy attribute as a value in the form.", () => {
      const { input } = setup("read-only-approvalDate-month");
      expect(input.defaultValue).toBe("nov");
    });

    it("puts the month based on the proposedBy attribute as a value in the form.", () => {
      const { input } = setup("read-only-approvalDate-year");
      expect(input.defaultValue).toBe("2019");
    });
  });

  describe("invalid event attributes", () => {
    const invalidSelectedEvent = {
      id: 12,
      approvalDate: "",
      "approvalDate?": true,
      description: "",
      fileNumber: 21213,
      impactAverage: "3.0",
      probabilityAverage: "7.3333333333333333",
      procedureType: "ordinary_after",
      proposedBy: "",
      stage: "pending",
      state: "current",
      createdAt: "2019-10-15T17:33:51.000Z",
      updatedAt: "2020-05-15T18:00:34.000Z",
      voteType: "simple_majority",
    };
    const setup = (dataId) => {
      const utils = render(
        <SelectedEvent selectedEvent={invalidSelectedEvent} />
      );
      const input = utils.getByTestId(dataId);
      return {
        input,
        ...utils,
      };
    };

    it("puts the description as a value in the form.", () => {
      const { input } = setup("read-only-description");
      expect(input.defaultValue).toBe(invalidSelectedEvent.description);
    });

    it("puts the proposedBy as a value in the form.", () => {
      const { input } = setup("read-only-proposedBy");
      expect(input.defaultValue).toBe(invalidSelectedEvent.proposedBy);
    });

    it("puts the proposedBy as a value in the form.", () => {
      const { input } = setup("read-only-approvalDate-day");
      expect(input.defaultValue).toBe("");
    });

    it("puts the day based on the proposedBy attribute as a value in the form.", () => {
      const { input } = setup("read-only-approvalDate-day");
      expect(input.defaultValue).toBe("");
    });

    it("puts the month based on the proposedBy attribute as a value in the form.", () => {
      const { input } = setup("read-only-approvalDate-month");
      expect(input.defaultValue).toBe("");
    });

    it("puts the month based on the proposedBy attribute as a value in the form.", () => {
      const { input } = setup("read-only-approvalDate-year");
      expect(input.defaultValue).toBe("");
    });
  });
});
