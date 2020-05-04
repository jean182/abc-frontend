import config from "./config";

export const loginUserRequest = (user) => {
  return config.post("/user_token/", user);
};

export const currentUser = () => {
  return config.get("users/current");
};

export const allUsers = () => {
  return config.get("users");
};

export const createUserRequest = (data) => {
  return config.post("users", data);
};

export const updateUserRequest = (id, data) => {
  return config.put(`users/${id}`, data);
};

export const getPendingUsers = (id) => {
  return config.get(`events/${id}/pending_users`);
};
