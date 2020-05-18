import clientReducer, { SET_CLIENT, UNSET_CLIENT } from "../client";

// Reducer tests

const initialState = {
  token: null,
};

describe("reducers", () => {
  describe("dashboard", () => {
    let updatedState = {};
    it("provides the initial state", () => {
      expect(clientReducer(undefined, {})).toEqual(initialState);
    });

    it("handles SET_CLIENT action", () => {
      const token = "12345";
      updatedState = { ...initialState, token };
      expect(
        clientReducer(
          { ...initialState },
          {
            type: SET_CLIENT,
            payload: token,
          }
        )
      ).toEqual(updatedState);
    });

    it("handles UNSET_CLIENT action", () => {
      const token = "12345";
      updatedState = { ...initialState, token: null };
      expect(
        clientReducer({ ...initialState, token }, { type: UNSET_CLIENT })
      ).toEqual(updatedState);
    });
  });
});
