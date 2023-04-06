/**
 *  app/base/View.js
 *  2023-03-24
 *  "Basic View" components for an application
 **/


import Element from './Element'

class View extends Element {
  constructor(id, className) {
    super(id, 'div', className)
  }
  init() {}
  registerController(controller) {
    this.controller = controller
  }
}

export default View




