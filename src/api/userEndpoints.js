import config from "./config";

export const loginUserRequest = (user) => {
  return config.post("/user_token/", user);
};

export const getPendingUsers = (id) => {
  return config.get(`events/${id}/pending_users`, id);
};
