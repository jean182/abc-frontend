import config from "./config";

// eslint-disable-next-line import/prefer-default-export
export const loginUserRequest = (user) => {
  return config.post("/user_token/", user);
};
