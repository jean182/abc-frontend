import config from "./config";

export const getEvents = () => config.get("/events/");

export const getEvent = (id) => config.get("/events/", id);

export const getEvaluations = (ids) =>
  config.get("/evaluations/", { params: { evaluation_ids: ids } });

export const createEventRequest = (data) => {
  return config.post("events", data);
};

export const updateEventRequest = (id, data) => {
  return config.put(`events/${id}`, data);
};

export const deleteEventRequest = (id) => {
  return config.delete(`events/${id}`);
};

export const getBubbleChart = (id) => config.get(`events/${id}/bubble_chart`);

export const getBarChart = (id) => config.get(`events/${id}/bar_chart`);

export const getRadarChart = (id) => config.get(`events/${id}/radar_chart`);
