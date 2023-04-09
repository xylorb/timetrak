/**
 *  sw.js
 *  2023-03-07
 *  Service Worker PWA Administration
 **/ 


var GHPATH = '/timetrak';
var APP_PREFIX = 'ttrk_';


// The version of the cache. Every time you change any of the files
// you need to change this version (version_01, version_02…). 
// If you don't change the version, the service worker will give your
// users the old files!
var VERSION = 'version_102';

// The files to make available for offline use. make sure to add 
// others to this list
var URLS = [    
  `${GHPATH}/`,
  `${GHPATH}/index.html`,
  `${GHPATH}/main.js`,
  `${GHPATH}/style/base_app.css`,
  `${GHPATH}/style/base_style.css`,
  `${GHPATH}/style/main_view.css`,
  `${GHPATH}/assets/icon.png`,
  `${GHPATH}/app/timetrak/TimeTrakApp.js`,
  `${GHPATH}/app/timetrak/ttkEvents.js`,
  `${GHPATH}/app/timetrak/ttkMainView.js`,
  `${GHPATH}/app/timetrak/ttkModel.js`,
  `${GHPATH}/app/base/Controller.js`,
  `${GHPATH}/app/base/Element.js`,
  `${GHPATH}/app/base/Event.js`,
  `${GHPATH}/app/base/Model.js`,
  `${GHPATH}/app/base/View.js`
]




var CACHE_NAME = APP_PREFIX + VERSION
self.addEventListener('fetch', function (e) {
  console.log('Fetch request : ' + e.request.url);
  e.respondWith(
    caches.match(e.request).then(function (request) {
      if (request) { 
        console.log('Responding with cache : ' + e.request.url);
        return request
      } else {       
        console.log('File is not cached, fetching : ' + e.request.url);
        return fetch(e.request)
      }
    })
  )
})

self.addEventListener('install', function (e) {
  e.waitUntil(
    caches.open(CACHE_NAME).then(function (cache) {
      console.log('Installing cache : ' + CACHE_NAME);
      return cache.addAll(URLS)
    })
  )
})

self.addEventListener('activate', function (e) {
  e.waitUntil(
    caches.keys().then(function (keyList) {
      var cacheWhitelist = keyList.filter(function (key) {
        return key.indexOf(APP_PREFIX)
      })
      cacheWhitelist.push(CACHE_NAME);
      return Promise.all(keyList.map(function (key, i) {
        if (cacheWhitelist.indexOf(key) === -1) {
          console.log('Deleting cache : ' + keyList[i] );
          return caches.delete(keyList[i])
        }
      }))
    })
  )
})