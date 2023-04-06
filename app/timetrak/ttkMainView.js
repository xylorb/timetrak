/**
 *  ttkMainView.js
 *  2023-03-12
 *  The main view of the TimeTrak App
 **/


import View from '../base/View'
import Event from '../base/Event'
import ttkEvents from './ttkEvents'


class ttkMainView extends View {
  constructor() {
    super('main_view', 'main_view')
    this.view_actions = []

    this.main_view = this.createElement('div', 'main_view')

    this.timer_text = this.createElement('div', 'timer_text')
    this.timer_text.innerHTML = "00:00:00"

    this.timer_toggle_btn = this.createElement('button','timer_toggle_btn')
    this.timer_toggle_btn.innerHTML = "START"
    this.timer_toggle_btn.addEventListener('click', event => this.toggleTimer())

    this.main_view.append(this.timer_text)
    this.main_view.append(this.timer_toggle_btn)

    this.element.append(this.main_view)
  }
  toggleTimer() {
    if (this.timer_toggle_btn.innerHTML == "START") {
      this.timer_toggle_btn.innerHTML = "STOP"
      this.controller.registerAppEventListener(ttkEvents.TIMER.TICK, this.updateTimerText.bind(this))
      let ae = new Event(ttkEvents.TIMER.START, 'timer_toggle_btn')
      this.controller.postAppEvent(ae)
    } else {
      this.timer_toggle_btn.innerHTML = "START"
      let ae = new Event(ttkEvents.TIMER.STOP, 'timer_toggle_btn')
      this.controller.postAppEvent(ae)
    }
  }
  updateTimerText(timer_count) {
    this.timer_text.innerHTML = timer_count.toString()
  }
}


export default ttkMainView



