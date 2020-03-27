import authReducer, { LOGIN, LOGIN_SUCCESS, LOGIN_FAIL, LOGOUT } from "../auth";

// Reducer tests

const initialState = {
  errors: [],
  messages: [],
  requesting: false,
  successful: false,
};

const payload = {
  email: "john@email.com",
  password: "12345",
  history: {
    push: jest.fn(),
    replace: jest.fn(),
  },
  from: { pathname: "/" },
};

describe("reducers", () => {
  describe("dashboard", () => {
    let updatedState = {};
    it("provides the initial state", () => {
      expect(authReducer(undefined, {})).toEqual(initialState);
    });

    it("handles LOGIN action", () => {
      updatedState = {
        ...initialState,
        messages: [
          {
            body: "Logging in...",
          },
        ],
        requesting: true,
      };
      expect(
        authReducer(
          { ...initialState },
          {
            type: LOGIN,
            payload,
          }
        )
      ).toEqual(updatedState);
    });

    it("handles LOGIN_SUCCESS action", () => {
      updatedState = { ...initialState, successful: true };
      expect(authReducer({ ...initialState }, { type: LOGIN_SUCCESS })).toEqual(
        updatedState
      );
    });

    it("handles LOGIN_FAIL action", () => {
      updatedState = {
        ...initialState,
        errors: [{ body: "Error" }],
        messages: [],
        requesting: false,
        successful: false,
      };
      expect(
        authReducer(
          { ...initialState },
          {
            type: LOGIN_FAIL,
            error: "Error",
          }
        )
      ).toEqual(updatedState);
    });

    it("handles LOGOUT action", () => {
      updatedState = {
        ...initialState,
      };
      expect(
        authReducer(
          { ...initialState },
          {
            type: LOGOUT,
          }
        )
      ).toEqual(updatedState);
    });
  });
});
