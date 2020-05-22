import * as localStorageHelper from "../local-storage";

describe("Locale Storage Helper", () => {
  describe("getAuthTOken", () => {
    it("returns the token value", () => {
      localStorageHelper.setAuthToken("12345");
      expect(localStorageHelper.getAuthToken()).toEqual("12345");
    });

    it("returns null if there's no value", () => {
      localStorageHelper.removeAuthToken();
      expect(localStorageHelper.getAuthToken()).toEqual(null);
    });
  });
});
