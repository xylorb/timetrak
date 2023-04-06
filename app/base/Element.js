/**
 *  app/base/Element.js
 *  2023-03-12
 *  "Basic Element" in an HTML document for an application
 **/


class Element {
    constructor(id, tag, className) {
      this.id = id
      this.element = this.createElement(tag, className)
      this.element.id = this.id
    }
    appendTo(selector) {
      this.getElement(selector).append(this.element)
    }
    createElement(tag, className) {
      const element = document.createElement(tag)
  
      if (className) element.classList.add(className)
  
      return element
    }
    getElement(selector) {
      const element = document.querySelector(selector)
  
      return element
    }
  }
  
  
  
  
  export default Element
  
  
  
  
  
