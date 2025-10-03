import axios from "axios"
export class events{
    static SERVER_URL="http://localhost:5005"

    // // for displaying all event cards
    // static get allEvents(){
    //     const dataUrl=`${this.SERVER_URL}/events`;
    //     return axios.get(dataUrl)
    // }

    // // for crweating new data to server (i.e, getting input data and adding new event)
    // // event is state that is used to create event in eventlist
    // static createEvent(event){
    //     const dataURL=`${this.SERVER_URL}/events`
    //     return axios.post(dataURL,event)    
    // }
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