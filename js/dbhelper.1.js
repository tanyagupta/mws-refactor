/**
 * Common database helper functions.
 */


/* global fetch */

var idb =

function(){

   'use strict';

   //check for support
   if (!('indexedDB' in window)) {
     console.log('This browser doesn\'t support IndexedDB');
     return;
   }

   var dbPromise = idb.open('restaurants', 3, function(upgradeDb) {

     switch (upgradeDb.oldVersion) {
     case 0:

     if (!upgradeDb.objectStoreNames.contains('restaurants')) {
       upgradeDb.createObjectStore('restaurants', {keyPath: 'id'});
       addRestaurants();


      // upgradeDb.createObjectStore('reviews', {keyPath: 'id'})
      // addReviews()

       //upgradeDb.createObjectStore('user_review', {keyPath: 'name'})

     }






   }
 });

  function addUserReview(review){
    return dbPromise.then(function(db)
    {
      var tx = db.transaction('user_review', 'readwrite');
      var store = tx.objectStore('user_review');
      store.add(review);
  }).catch(function(e) {
    tx.abort();
    console.log(e);
  }).then(function(e){console.log("single review added")})
  }


   function getRestaurants() {
    return dbPromise.then(function(db) {
      var tx = db.transaction('restaurants', 'readonly');
      var store = tx.objectStore('restaurants');
      return store.getAll();
    });
   }

 function getRestaurantById(id){

   return dbPromise.then(function(db) {
     var tx = db.transaction('restaurants', 'readonly');
     var store = tx.objectStore('restaurants');
     return store.get(id);
   });
 }

 function addReviewsByRestId(restaurant_id){
   const api_url = 'http://localhost:1337/reviews/?restaurant_id='+restaurant_id;
   fetch(api_url)
     .then (response => {

                           return response.json()
                         })  // .then(function(response){return response.json}
     .then(items => {
                    console.log(items)
     dbPromise.then(function(db)
     {
       var tx = db.transaction('reviews', 'readwrite');
       var store = tx.objectStore('reviews');
       return Promise.all(items.map(function(item) {
         return store.add(item);
       })
     ).catch(function(e) {
       tx.abort();
       console.log(e);
     }).then(function() {
       console.log('All reviews for restarant '+restaurant_id+' added successfully!');
     });


   });

 });
 }


    function getReviews() {
     return dbPromise.then(function(db) {
      var tx = db.transaction('reviews', 'readonly');
      var store = tx.objectStore('reviews');
      return store.getAll();
    });


   }

   function addReviews(){
  //      const api_url = 'https://projects-2018-tanyagupta.c9users.io:8080/reviews';
          const api_url = 'http://localhost:1337/reviews/';
           fetch(api_url)
             .then (response => {

                                   return response.json()
                                 })  // .then(function(response){return response.json}
             .then(items => {
             dbPromise.then(function(db)
             {

                   var tx = db.transaction('reviews', 'readwrite');
                   var store = tx.objectStore('reviews');


                 return Promise.all(items.map(function(item) {

                     return store.add(item);
                   })
                 ).catch(function(e) {
                   tx.abort();
                   console.log(e);
                 }).then(function() {
                   console.log('All reviews added successfully!');
                 });


           });

         });


   }
   function test(id){

     return id+" here";

   }

   function addRestaurants(){
            const api_url = "http://localhost:1337/restaurants/"
           //const api_url = 'https://projects-2018-tanyagupta.c9users.io:8080/restaurants';
           fetch(api_url)
             .then (response => {

                                   return response.json()
                                 })  // .then(function(response){return response.json}
             .then(items => {
             dbPromise.then(function(db)
             {

                   var tx = db.transaction('restaurants', 'readwrite');
                   var store = tx.objectStore('restaurants');


                 return Promise.all(items.map(function(item) {

                     return store.add(item);
                   })
                 ).catch(function(e) {
                   tx.abort();
                   console.log(e);
                 }).then(function() {
                   console.log('All restaurants added successfully!');
                 });


           });

         });
         }


 return {
     dbPromise: (dbPromise),
      fetchRestaurants: (getRestaurants),
      addRestaurants: (addRestaurants),
      addReviews: (addReviews),
      getReviews: (getReviews),
      getRestaurantById: (getRestaurantById),
//      fetchReviewsByRestId: (getReviewsByRestId),
      addReviewsByRestId: (addReviewsByRestId),
      addUserReview: (addUserReview),
      test:(test)
     }



}()



//idb.addReviewsByRestId(3)

//idb.addRestaurants()
//idb.addReviews();



class DBHelper {

  static fetchRestaurants(callback) {
    idb.fetchRestaurants().then(function(restaurants){

      return restaurants;
    })

  }

  /**
   * Fetch a restaurant by its ID.
   */
  static fetchRestaurantById(id, callback) {
    // fetch all restaurants with proper error handling.
     idb.fetchRestaurants().then(function(restaurants,error){
      if (error) {
        callback(error, null);
      } else {
        const restaurant = restaurants.find(r => r.id == id);
        if (restaurant) { // Got the restaurant

          callback(null, restaurant);
        } else { // Restaurant does not exist in the database
          callback('Restaurant does not exist', null);
        }
      }
    });
  }

  static getReviewsById(id,callback){
        // fetch all restaurants by id with proper error handling.

     idb.getReviews().then(function(restaurants,error){

      if (error) {
        callback(error, null);
      } else {
          const restaurant = restaurants.filter(r => r.restaurant_id == id);

        if (restaurant) { // Got the restaurant
          //console.log(restaurant)
          callback(null, restaurant);
        } else { // Restaurant does not exist in the database
          callback('Restaurant does not exist', null);
        }
      }
    });




  }

  /**
   * Fetch restaurants by a cuisine type with proper error handling.
   */
  static fetchRestaurantByCuisine(cuisine, callback) {
    // Fetch all restaurants  with proper error handling
    idb.fetchRestaurants().then(function(restaurants,error){
      if (error) {
        callback(error, null);
      } else {
        // Filter restaurants to have only given cuisine type
        const results = restaurants.filter(r => r.cuisine_type == cuisine);
        callback(null, results);
      }
    });
  }

  /**
   * Fetch restaurants by a neighborhood with proper error handling.
   */
  static fetchRestaurantByNeighborhood(neighborhood, callback) {
    // Fetch all restaurants
    idb.fetchRestaurants().then(function(restaurants,error){
      if (error) {
        callback(error, null);
      } else {
        // Filter restaurants to have only given neighborhood
        const results = restaurants.filter(r => r.neighborhood == neighborhood);
        callback(null, results);
      }
    });
  }

  /**
   * Fetch restaurants by a cuisine and a neighborhood with proper error handling.
   */
  static fetchRestaurantByCuisineAndNeighborhood(cuisine, neighborhood, callback) {
    // Fetch all restaurants

    idb.fetchRestaurants().then(function(restaurants,error){


      if (error) {
        callback(error, null);
      } else {
        let results = restaurants
        if (cuisine != 'all') { // filter by cuisine
          results = results.filter(r => r.cuisine_type == cuisine);
        }
        if (neighborhood != 'all') { // filter by neighborhood
          results = results.filter(r => r.neighborhood == neighborhood);
        }

        callback(null, results);
      }
    });
  }

  /**
   * Fetch all neighborhoods with proper error handling.
   */
  static fetchNeighborhoods(callback) {
    // Fetch all restaurants


    idb.fetchRestaurants().then(function(restaurants,error){


    //DBHelper.fetchRestaurants((error, restaurants) => {

      if (error) {
        callback(error, null);
      } else {
        // Get all neighborhoods from all restaurants

        const neighborhoods = restaurants.map((v, i) => restaurants[i].neighborhood)

        //["Manhattan", "Brooklyn", "Manhattan", "Manhattan", "Brooklyn", "Brooklyn", "Manhattan", "Manhattan", "Queens", "Queens"]
        // Remove duplicates from neighborhoods
        const uniqueNeighborhoods = neighborhoods.filter((v, i) => neighborhoods.indexOf(v) == i)
        //console.log(uniqueNeighborhoods)
        //["Manhattan", "Brooklyn", "Queens"]
        callback(null, uniqueNeighborhoods);
      }
    })
    //});
  }

  /**
   * Fetch all cuisines with proper error handling.
   */
  static fetchCuisines(callback) {
    // Fetch all restaurants
    idb.fetchRestaurants().then(function(restaurants,error){
      if (error) {
        callback(error, null);
      } else {
        // Get all cuisines from all restaurants

        const cuisines = restaurants.map((v, i) => restaurants[i].cuisine_type)
        //cuisines ["Asian", "Pizza", "Asian", "American", "Pizza", "American", "American", "American", "Asian", "Mexican"]
        // Remove duplicates from cuisines
        const uniqueCuisines = cuisines.filter((v, i) => cuisines.indexOf(v) == i)

        //unique ["Asian", "Pizza", "American", "Mexican"]
        callback(null, uniqueCuisines);
      }
    });
  }


  /**
   * Restaurant page URL.
   */
  static urlForRestaurant(restaurant) {
    /* id is 1 to 10 */
    return (`./restaurant.html?id=${restaurant.id}`);
  }

  /**
   * Restaurant image URL.
   */
  static imageUrlForRestaurant(restaurant) {

    return (`basicimages/${restaurant.photograph}`);
  }

  /**
   * Map marker for a restaurant.
   */
  static mapMarkerForRestaurant(restaurant, map) {
    const marker = new google.maps.Marker({
      position: restaurant.latlng,
      title: restaurant.name,
      url: DBHelper.urlForRestaurant(restaurant),
      map: map,
      animation: google.maps.Animation.DROP}
    );
    return marker;
  }

}
