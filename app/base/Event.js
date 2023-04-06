/**
 *  app/base/Event.js
 *  2023-03-24
 *  "Basic Event" components for an application 
 **/


export class Event {
    constructor(event_type, data) {
      this.event_type = event_type
      this.data = data
    }
  }
  
  export default Event