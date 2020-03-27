import config from "./config";

export const getEvents = () => config.get("/events/");

export const getEvent = (id) => config.get("/events/", id);
