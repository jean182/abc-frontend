import config from "./config";

export const loginUserRequest = (user) => {
  return config.post("/user_token/", user);
};

export const currentUser = () => {
  return config.get(`users/current`);
};

export const allUsers = () => {
  return config.get(`users`);
};

export const getPendingUsers = (id) => {
  return config.get(`events/${id}/pending_users`);
};
