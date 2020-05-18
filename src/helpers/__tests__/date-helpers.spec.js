import * as dateHelpers from "../date-helpers";

describe("Date Helpers", () => {
  describe("Timezones", () => {
    it("should always be UTC", () => {
      expect(new Date().getTimezoneOffset()).toBe(0);
    });
  });

  describe("getIsoDatesFromInterval", () => {
    const parsedStartStringDate = "2019-11-07";
    const parsedEndStringDate = "2019-11-09";
    const startDate = new Date(parsedStartStringDate);
    const endDate = new Date(parsedEndStringDate);
    it("formats a date object to an iso date string without the time and timezone", () => {
      expect(dateHelpers.getIsoDatesFromInterval(startDate, endDate)).toEqual([
        parsedStartStringDate,
        "2019-11-08",
        parsedEndStringDate,
      ]);
    });
  });

  describe("monthYearOrDay", () => {
    describe("valid date", () => {
      const validDate = "2019-11-07";
      it("returns the day of the iso date", () => {
        expect(dateHelpers.monthYearOrDay(validDate, "day")).toEqual("7");
      });

      it("returns the month of the iso date", () => {
        expect(dateHelpers.monthYearOrDay(validDate, "month")).toEqual("nov");
      });

      it("returns the year of the iso date", () => {
        expect(dateHelpers.monthYearOrDay(validDate, "year")).toEqual("2019");
      });

      it("returns the full of the iso date if unit is not passed", () => {
        expect(dateHelpers.monthYearOrDay(validDate, "")).toEqual("2019-11-07");
      });
    });

    describe("invalid date", () => {
      const invalidDate = "2019-13-50";
      it("returns an empty string", () => {
        expect(dateHelpers.monthYearOrDay(invalidDate, "day")).toEqual("");
      });
    });
  });
});
