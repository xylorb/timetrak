/**
 *  app/base/Controller.js
 *  2023-03-24
 *  "Basic Controller" components for an application
 **/


/*  Model control for an application  */
export class ModelControl {
  constructor() {
    this.models = []
  }
  init() {
    for (let i of this.models) {
      i.init()
    }
  }
  registerController(controller) {
    this.controller = controller
  }
  addModel(model) {
    model.registerController(this.controller)
    this.models.push(model)
  }
}
  
  /*  View control for an application  */
  export class ViewControl {
    constructor() {
      this.selector = '#root'
      this.root = document.querySelector(this.selector)
      this.views = []
    }
    init() {
      for (let i of this.views) {
        i.init()
      }
    }
    registerController(controller) {
      this.controller = controller
    }
    addView(view) {
      view.appendTo(this.selector)
      view.registerController(this.controller)
      this.views.push(view)
    }
  }
  
  /*  MVC Controller for an application  */
  export class Controller {
    constructor(app_model, app_main_view) {
      this.models = new ModelControl(this)
      this.models.registerController(this)
      this.models.addModel(app_model)
      
      this.views = new ViewControl()
      this.views.registerController(this)
      this.views.addView(app_main_view)

      this.listeners = []
    }
    init() {
      this.models.init()
      this.views.init()
    }
    start() {
      this.init()
    }
    registerAppEventListener(forEventType, callback) {
      this.listeners.push({event_type:forEventType,callback:callback})
    }
    postAppEvent(ae) {
      for (let l of this.listeners) {
        if (l.event_type == ae.event_type) {
          l.callback(ae.data, l.withThis)
        } else {}
      }
    }
    addModel(model) {
      this.models.addModel(model)
    }
    addView(view) {
      this.views.addView(view)
    }
  }
  
  
  export default Controller
  
  
  
