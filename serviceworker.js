(function() {
   'use strict';
   var filesToCache = [
     'index.html',
     'restaurant.html',
     'manifest.json',
     'img/1.jpg',
     'img/2.jpg',
     'img/3.jpg',
     'img/4.jpg',
     'img/5.jpg',
     'img/6.jpg',
     'img/7.jpg',
     'img/8.jpg',
     'img/9.jpg',
     'img/10.jpg',
     'css/styles.css',
     'data/restaurants.json',
     'js/dbhelper.1.js',
     'js/main.1.js',
     'js/libs.js',
     'js/restaurant_info.js',
     'pages/404.html',
     'pages/offline.html'
   ];

   var staticCacheName = 'pages-cache-v4';

   self.addEventListener('install', function(event) {
     //console.log('Attempting to install service worker and cache static assets');
     event.waitUntil(
       caches.open(staticCacheName)
       .then(function(cache) {
         return cache.addAll(filesToCache);
       })
     );
   });

   self.addEventListener('sync', function(event) {
    if (event.tag == 'review-post') {
      event.waitUntil(post_review(event))
    }
  })

   self.addEventListener('fetch', function(event) {
     //console.log('Fetch event for ', event.request.url);
     event.respondWith(
       caches.match(event.request).then(function(response) {
         //console.log(response)
         if (response) {
           //console.log('Found ', event.request.url, ' in cache');
           return response;
         }
         //console.log('Network request for ', event.request.url);
         return fetch(event.request).then(function(response) {
           //console.log("404 expected",response.status)
//           if (response.status === 404) {
//             return caches.match('pages/404.html');
//           }
           return caches.open(staticCacheName).then(function(cache) {

            // if (event.request.url.indexOf('test') < 0) {
               cache.put(event.request.url, response.clone());
           //  }
             return response;
           });
         });
       }).catch(function(error) {
         console.log('Error, ', error);
         return caches.match('pages/offline.html');
       })
     );
   });

   self.addEventListener('activate', function(event) {
   console.log('Activating new service worker...');

   var cacheWhitelist = [staticCacheName];

   event.waitUntil(
     caches.keys().then(function(cacheNames) {
       return Promise.all(
         cacheNames.map(function(cacheName) {
             console.log(cacheName)
           if (cacheWhitelist.indexOf(cacheName) === -1) {
             return caches.delete(cacheName);
           }
         })
       );
     })
   );
 });

    //  .then(response => console.log('Success:', response));




//  )}
//});

})
 ();

 function post_review(event){
   //const url = 'https://projects-2018-tanyagupta.c9users.io:8080/reviews'
/*   event.target.indexedDB.open("restaurants").onsuccess = function(event) {
  db = event.target.result;
  console.log(db)}
*/
const url = 'http://localhost:1337/reviews'
   //var data = {name: sessionStorage.getItem("name"),restaurant_id: sessionStorage.getItem("restaurant_id"),rating: sessionStorage.getItem("rating"),comments: sessionStorage.getItem("comments")};

/*
   const name = document.getElementById("name").value;
   const restaurant_id = document.getElementById("id").value;
   const rating = document.getElementById("rating").value;
   const comments = document.getElementById("comments").value;
*/
  // const data = {'name':name,'restaurant_id':restaurant_id,'rating':rating,'comments':comments}
const data ={'name':"name",'restaurant_id':"3",'rating':"rating",'comments':"comments"}
   fetch(url, {
     method: 'POST',
     body: JSON.stringify(data),
     headers:{
       'Content-Type': 'application/json'
     }
   }).then(res => res.json())
   .catch(error => console.error('Error:', error))
   .then(response => console.log('Success:', response));


 }
