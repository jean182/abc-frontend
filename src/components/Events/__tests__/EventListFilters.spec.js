import React from "react";
import { cleanup, render, fireEvent } from "@testing-library/react";
import { EventListFilters } from "../EventListFilters";
import translate from "../../../helpers/i18n";

describe("Displays two input tags", () => {
  const mockProps = {
    dispatch: jest.fn(),
  };

  describe("Commission Date filter", () => {
    afterEach(() => {
      cleanup();
    });

    const setup = () => {
      const utils = render(<EventListFilters dispatch={mockProps.dispatch} />);
      const stageSelect = utils.getByLabelText(translate("eventFilters.stage"));
      return {
        stageSelect,
        ...utils,
      };
    };
    const { stageSelect } = setup();
    fireEvent.change(stageSelect, { target: { value: "commission" } });

    it("changes the stage input value", () => {
      expect(stageSelect.value).toBe("commission");
    });

    it("dispatches 1 actions to redux", () => {
      expect(mockProps.dispatch).toHaveBeenCalledWith({
        payload: "commission",
        type: "abc-frontend/filters/FILTER_BY_STAGE",
      });
    });
  });

  describe("Approval Date filter", () => {
    afterEach(() => {
      cleanup();
    });

    const setup = () => {
      const utils = render(<EventListFilters dispatch={mockProps.dispatch} />);
      const dateInput = utils.getByLabelText(
        translate("eventFilters.approvalDate")
      );
      return {
        dateInput,
        ...utils,
      };
    };
    const { dateInput } = setup();
    fireEvent.change(dateInput, { target: { value: "2019-06-02" } });

    it("changes the approvalDate input value", () => {
      expect(dateInput.value).toBe("2019-06-02");
    });
  });
});
