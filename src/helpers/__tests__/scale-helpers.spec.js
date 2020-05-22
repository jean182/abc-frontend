import * as scaleHelpers from "../scale-helpers";

describe("Date Helpers", () => {
  describe("getVoteTypeValue", () => {
    it("formats according the enum passed", () => {
      expect(scaleHelpers.getVoteTypeValue("qualified_majority")).toEqual(1);
    });

    it("formats by default to 10", () => {
      expect(scaleHelpers.getVoteTypeValue("simple_majority")).toEqual(10);
    });
  });

  describe("getProcedureTypeValue", () => {
    it("formats according the ordinary_before enum passed", () => {
      expect(scaleHelpers.getProcedureTypeValue("ordinary_before")).toEqual(1);
    });

    it("formats according the ordinary_after enum passed", () => {
      expect(scaleHelpers.getProcedureTypeValue("ordinary_after")).toEqual(3);
    });

    it("formats according the two_hundred_eight enum passed", () => {
      expect(scaleHelpers.getProcedureTypeValue("two_hundred_eight")).toEqual(
        7
      );
    });

    it("formats by default to 10", () => {
      expect(scaleHelpers.getVoteTypeValue("not_a_valid_enum")).toEqual(10);
    });
  });
});
