import axios from "axios";

export class events {
  static SERVER_URL = "http://localhost:8000";

  // Fetch all events
  static get allEvents() {
    return axios.get(`${this.SERVER_URL}/events`);
  }

  // Create new event
  static createEvent(event) {
    return axios.post(`${this.SERVER_URL}/events`, event);
  }

  // Optional: get event by ID
  static getEventById(id) {
    return axios.get(`${this.SERVER_URL}/events/${id}`);
  }
}
