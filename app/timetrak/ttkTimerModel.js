/**
 *  ttkTimerModel.js
 *  2023-03-24
 *  Model for tracking time in the app (aka: Timer)
 **/


import Model from '../base/Model.js'
import Event from '../base/Event.js'

import ttkEvents from './ttkEvents.js'


export class ttkTimerModel extends Model {
  constructor(name, config, context) {
    super(name, config, context)
    
    this.msPerTick = 1000  /* timer set to 1 tick = 1 second */
    this.totalTicks = 0
    this.startTime = Date.now()
  }
  init() {
    super.init()
    this.controller.registerAppEventListener(ttkEvents.TIMER.START, this.startTimer.bind(this))
    this.controller.registerAppEventListener(ttkEvents.TIMER.STOP, this.stopTimer.bind(this))
    this.controller.registerAppEventListener(ttkEvents.TIMER.RESET, this.resetTimer.bind(this))
  }
  startTimer = () => {
    if (this.totalTicks == 0) {
      this.startTime = Date.now()
    }
    this.currentTimer = window.setInterval(this.tickTimer, this.msPerTick)
  }
  stopTimer = () => {
    window.clearInterval(this.currentTimer)
  }
  resetTimer = () => {
    this.totalTicks = 0
  }
  tickTimer = () => {
    this.totalTicks = Math.trunc((Date.now() - this.startTime) / 1000)

    let ae = new Event(ttkEvents.TIMER.TICK, this.ticksToString())
    this.controller.postAppEvent(ae)
  }
  ticksToString() {
    var rawHours = Math.trunc(this.totalTicks / 3600)
    var minutes = String(Math.trunc(this.totalTicks / 60) - (rawHours * 60))

    var hours = String(rawHours)
    var seconds = String(this.totalTicks % 60)
  
  return hours.padStart(2, '0') + ":" + minutes.padStart(2, '0') + ":" + seconds.padStart(2, '0')
  }
}


export default ttkTimerModel