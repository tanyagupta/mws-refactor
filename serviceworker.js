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




   self.addEventListener('activate', function (event) {
     event.waitUntil(
       caches.keys().then(function (cacheNames) {
         return Promise.all(
           cacheNames.filter(function (cacheName) {
             return cacheName.startsWith('mws-') &&
               cacheName != staticCacheName;
           }).map(function (cacheName) {
             return caches.delete(cacheName);
           })
         );
       })
     );
   });

 self.addEventListener('fetch', function(event) {
   event.respondWith(
     fetch(event.request).then(function (response) {
       return caches.open(staticCacheName).then(function (cache) {
         cache.put(event.request, response.clone());
         return response;
         });
       }).catch(function() {
         return caches.match(event.request);
     })
   );
 });

    //  .then(response => console.log('Success:', response));




//  )}
//});

})
 ();

function postReview(event){
  event.target.indexedDB.open("restaurants").onsuccess = function(event) {
    db = event.target.result;
    var transaction = db.transaction("user_review",'readonly');
    var objectStore = transaction.objectStore("user_review");
    objectStore.getAll().onsuccess = function(reviewObject){
      console.log(reviewObject.target)
      const data = reviewObject.target.result[Number(reviewObject.target.result.length)-1]
      console.log(data)
      const url = 'http://localhost:1337/reviews'
      const name = data.name;
      const restaurant_id = data.restaurant_id;
      const rating = data.rating;
      const comments = data.comments
      const result = {'name':name,'restaurant_id':restaurant_id,'rating':rating,'comments':comments}


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
    //var objectStore = transaction.objectStore("restaurants")
    //objectStore.getAll().onsuccess = function(event){console.log(event.target.result)}
  }
}
