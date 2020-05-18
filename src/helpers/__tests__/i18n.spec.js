import translate from "../i18n";
import locales from "../../locales/locales.json";

describe("Locale Helpers", () => {
  describe("valid locale string", () => {
    it("returns the locale value", () => {
      expect(translate("eventsEnum.stage.pending", locales)).toEqual(
        "Pendiente de asignar"
      );
    });
  });

  describe("invalid locale string", () => {
    it("returns the locale value", () => {
      expect(translate("eventsEnum.stage.balde", locales)).toEqual(
        "Missing translation for eventsEnum.stage.balde"
      );
    });
  });
});
