import config from "./config";

export const scoreRequest = (id, userId) => {
  return config.get(`/scores/${id}`, { params: { user_id: userId } });
};

export const riskFactorsRequest = () => {
  return config.get("/risk_factors/");
};
