/**
 *  ttkActivityRecord.js
 *  2023-04-12
 *  Record for a particular timed Activity 
 **/


export class ttkActivityRecord {
  constructor(name) {
    this.name = name
    this.msTotalTime = 0
    this.periods = []   /* list of entries: {start ms from epoch, stop ms from epoch, period total ms} */
  }
  openPeriod(start) {
    this.currentPeriodStart = start
  }
  closePeriod(stop) {
    let msTime = stop - this.currentPeriodStart
    this.periods.push({start_time:this.currentPeriodStart,stop_time:stop,period_total:msTime})

    var totalTime = 0
    for (let p of this.periods) {
      totalTime = totalTime + p.period_total
    }
    this.msTotalTime = totalTime
  }
  editPeriod(start, stop) {

  }
  listPeriods() {

  }
}


export default ttkActivityRecord