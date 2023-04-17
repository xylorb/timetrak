/**
 *  ttkTimerModel.js
 *  2023-03-24
 *  Model for tracking time in the app (aka: Timer)
 **/


import Model from '../base/Model.js'
import Event from '../base/Event.js'

import ttkEvents from './ttkEvents.js'
import ttkActivityRecord from './ttkActivityRecord.js'


export class ttkTimerModel extends Model {
  constructor(name, config, context) {
    super(name, config, context)
    
    this.msPerTick = 1000  /* timer set to 1 tick = 1 second */
    this.activity = new ttkActivityRecord("genericActivity")
  }
  init() {
    super.init()
    this.controller.registerAppEventListener(ttkEvents.MAIN_VIEW.START_TIMER, this.startTimer.bind(this))
    this.controller.registerAppEventListener(ttkEvents.MAIN_VIEW.STOP_TIMER, this.stopTimer.bind(this))
    this.controller.registerAppEventListener(ttkEvents.MAIN_VIEW.RESET_TIMER, this.resetTimer.bind(this))
  }
  startTimer = () => {
    this.currentPeriodStartTime = Date.now()  /* in milliseconds from epoch */
    this.activity.openPeriod(this.currentPeriodStartTime)
    //let ae = new Event(ttkEvents.TIMER_MODEL.START_TIMER, strStartTime.toTimeString())
    //this.controller.postAppEvent(ae)
    this.currentTimer = window.setInterval(this.tickTimer, this.msPerTick)
  }
  stopTimer = () => {
    let currentPeriodStopTime = Date.now()
    this.activity.closePeriod(currentPeriodStopTime)
    window.clearInterval(this.currentTimer)
  }
  resetTimer = () => {
    this.activity = new ttkActivityRecord("newGenericActivity")
    let ae = new Event(ttkEvents.TIMER_MODEL.TICK_TIMER, this.timeToString(this.activity.msTotalTime))
    this.controller.postAppEvent(ae)
  }
  tickTimer = () => {
    var currentPeriodTicks = Math.trunc((Date.now() - this.currentPeriodStartTime) / this.msPerTick)
    var totalTicks = Math.trunc(this.activity.msTotalTime / this.msPerTick) + currentPeriodTicks

    let ae = new Event(ttkEvents.TIMER_MODEL.TICK_TIMER, this.timeToString(totalTicks))
    this.controller.postAppEvent(ae)
  }
  timeToString(t) {
    var rawHours = Math.trunc(t / 3600)
    var minutes = String(Math.trunc(t / 60) - (rawHours * 60))

    var hours = String(rawHours)
    var seconds = String(t % 60)

    return hours.padStart(2, '0') + ":" + minutes.padStart(2, '0') + ":" + seconds.padStart(2, '0')
  }
}


export default ttkTimerModel