import config from "./config";

export const getEvents = () => config.get("/events/");

export const getEvent = (id) => config.get("/events/", id);

export const createEventRequest = (data) => {
  return config.post("events", data);
};

export const updateEventRequest = (id, data) => {
  return config.put(`events/${id}`, data);
};

export const getBubbleChart = (id) => config.get(`events/${id}/bubble_chart`);

export const getBarChart = (id) => config.get(`events/${id}/bar_chart`);
