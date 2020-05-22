import config from "./config";

export const scoreRequest = (id, userId) => {
  return config.get(`/scores/${id}`, { params: { user_id: userId } });
};

export const createScoreRequest = (data) => {
  return config.post("scores", data);
};

export const updateScoreRequest = (id, data) => {
  return config.put(`scores/${id}`, data);
};

export const riskFactorsRequest = () => {
  return config.get("/risk_factors/");
};
