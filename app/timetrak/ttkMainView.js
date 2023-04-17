/**
 *  ttkMainView.js
 *  2023-03-12
 *  The main view of the TimeTrak App
 **/


import View from '../base/View.js'
import Event from '../base/Event.js'

import ttkEvents from './ttkEvents.js'


class ttkMainView extends View {
  constructor() {
    super('main_view', 'main_view')
    this.view_actions = []

    this.main_view = this.createElement('div', 'main_view')

    /* Main Running Timer Displayed Text */
    this.timer_text = this.createElement('div', 'timer_text')
    this.timer_text.innerHTML = "00:00:00"

    /* Timer Controlling Buttons */
    this.timer_left_btn = this.createElement('button','timer_left_btn')
    this.timer_left_btn.innerHTML = "START"
    this.timer_left_btn.addEventListener('click', event => this.pressLeftButton())
    this.timer_right_btn = this.createElement('button','timer_right_btn')
    this.timer_right_btn.innerHTML = "RESET"
    this.timer_right_btn.addEventListener('click', event => this.pressRightButton())

    /* Text Displaying Activity's Sub-Periods */
    this.start_time_text = this.createElement('div', 'start_time_text')
    
    /* Add Elements to Main View */
    this.main_view.append(this.timer_text)
    this.main_view.append(this.timer_left_btn)
    this.main_view.append(this.timer_right_btn)
    this.main_view.append(this.start_time_text)

    this.element.append(this.main_view)
  }
  init() {
    super.init()
  }
  pressLeftButton() {
    /* Button to be used for starting and stopping timer */
    if (this.timer_left_btn.innerHTML == "START") {
      this.timer_left_btn.innerHTML = "STOP"
      this.controller.registerAppEventListener(ttkEvents.TIMER_MODEL.TICK_TIMER, this.updateTimerText.bind(this))
      this.controller.registerAppEventListener(ttkEvents.TIMER_MODEL.START_TIMER, this.updateTimerStartText.bind(this))
      let ae = new Event(ttkEvents.MAIN_VIEW.START_TIMER, 'timer_left_btn')
      this.controller.postAppEvent(ae)
    } else {
      this.timer_left_btn.innerHTML = "START"
      let ae = new Event(ttkEvents.MAIN_VIEW.STOP_TIMER, 'timer_left_btn')
      this.controller.postAppEvent(ae)
    }
  }
  pressRightButton() {
    /* Button to be used for resetting the Activity and Timer */
    if (this.timer_left_btn.innerHTML == "STOP") {
      this.timer_left_btn.innerHTML = "START"
    }
   
    let ae1 = new Event(ttkEvents.MAIN_VIEW.STOP_TIMER, 'timer_right_btn')
    this.controller.postAppEvent(ae1)
    let ae2 = new Event(ttkEvents.MAIN_VIEW.RESET_TIMER, 'timer_right_btn')
    this.controller.postAppEvent(ae2)
  }
  updateTimerText(timer_count) {
    this.timer_text.innerHTML = timer_count.toString()
  }
  updateTimerStartText(start_time) {
    this.start_time_text.innerHTML = start_time
  }
}


export default ttkMainView



