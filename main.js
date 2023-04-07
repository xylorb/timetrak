/**
 *  main.js
 *  2023-03-07
 *  Entry Point for the TimeTrak Application
 **/


import TimeTrakApp from './app/timetrak/TimeTrakApp.js'


let app = new TimeTrakApp()

app.start()

console.log('I am running!')