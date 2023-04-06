/**
 *  app/base/Model.js
 *  2023-03-24
 *  "Basic Model" components for an application
 **/


class Model {
    constructor(name, config, context) {
      this.name = name
      this.config = config || {}
      this.context = context || {}
    }
    init() {}
    registerController(controller) {
      this.controller = controller
    }
  }
  
  export default Model
  
  
  
