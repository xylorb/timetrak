/**
 *  TimeTrakApp.js
 *  2023-03-12
 *  Create a specific implementation of an application - TimeTrak PWA
 **/


import Controller from '../base/Controller'

import ttkMainView from './ttkMainView'
import ttkTimerModel from './ttkTimerModel'


export class TimeTrakApp extends Controller {
  constructor() {
    super(new ttkTimerModel, new ttkMainView)
  }
  init() {
    super.init()
  }
}



export default TimeTrakApp