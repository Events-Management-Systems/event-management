import axios from "axios"
export class events{
    static SERVER_URL="http://localhost:5005"


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

  // Update event (partial update) - used to add participants
  static updateEvent(id, data) {
    return axios.patch(`${this.SERVER_URL}/events/${id}`, data);
  }
}