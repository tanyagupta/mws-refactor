/**
 * Common database helper functions.
 */

/* global fetch */

/*const GLOBALS = {
  all_data:[]
}

/* global fetch */

var idb =

function(){

   'use strict';

   //check for support
   if (!('indexedDB' in window)) {
     console.log('This browser doesn\'t support IndexedDB');
     return;
   }

   var dbPromise = idb.open('restaurants', 1, function(upgradeDb) {

     switch (upgradeDb.oldVersion) {
     case 0:

     if (!upgradeDb.objectStoreNames.contains('restaurants')) {
       upgradeDb.createObjectStore('restaurants', {keyPath: 'id'});
       addRestaurants();


       upgradeDb.createObjectStore('reviews', {keyPath: 'id'})
       addReviews()

     }






   }
 });




   function getRestaurants() {
    return dbPromise.then(function(db) {
      var tx = db.transaction('restaurants', 'readonly');
      var store = tx.objectStore('restaurants');
      return store.getAll();
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

                             let data_mod = [];
                            //console.log(items)
                             for (let i in items)
                             {

                               let one_data={};
                               one_data["id"]=items[i]["id"];
                                one_data["restaurant_id"]=items[i]["restaurant_id"];
                               one_data["name"]=items[i]["name"];
                               one_data["createdAt"]=items[i]["createdAt"];
                               one_data["updatedAt"]=items[i]["updatedAt"];
                               one_data["rating"]=items[i]["rating"];
                               one_data["comments"]=items[i]["comments"];

                               data_mod.push(one_data)


                             }
                           var items=data_mod;
                          // console.log(items)




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

   function addRestaurants(){
            const api_url = "http://localhost:1337/restaurants/"
           //const api_url = 'https://projects-2018-tanyagupta.c9users.io:8080/restaurants';
           fetch(api_url)
             .then (response => {

                                   return response.json()
                                 })  // .then(function(response){return response.json}
             .then(items => {

                             let data_mod = [];
                             //console.log(items)
                             for (let i in items)
                             {

                               let one_data={};
                               one_data["id"]=Number(i)+1
                               one_data["name"]=items[i]["name"]
                               one_data["neighborhood"]=items[i]["neighborhood"]
                               one_data["photograph"]=items[i]["photograph"]
                               one_data["address"]=items[i]["address"]
                               one_data["latlng"]=items[i]["latlng"]
                               one_data["cuisine_type"]=items[i]["cuisine_type"]
                               one_data["operating_hours"]=items[i]["operating_hours"]
                               one_data["reviews"]=items[i]["reviews"]

                               data_mod.push(one_data)

                             }
                           var items=data_mod;
                           //console.log(items)




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
      getReviews: (getReviews)
     }



}()





//idb.addRestaurants()




class DBHelper {

  /**
   * Database URL.
   * Change this to restaurants.json file location on your server.
   */

/*  static data(){
   const url = 'http://localhost:1337/restaurants'

   fetch(url)
    .then (response => {return response.json()})
    .then(data => {
      console.log(data)
    return data

      })
    .catch (err => {
      console.log("===we have an error===")
      console.log(err.stack)
    })



  }*/
 // static get DATABASE_URL() {
    //const port = 8000 // Change this to your server port
    //return  "https://projects-2018-tanyagupta.c9users.io/MWS/mws-restaurant-stage-1/data/restaurants.json"
    //http://projects-2018-tanyagupta.c9users.io:8080/restaurants
    //const url = "http://localhost:8080/restaurants";

   // const url="https://projects-2018-tanyagupta.c9users.io:8080/restaurants"
    //return url;

    /*
    fetch(url)
    .then (response => {return response.json()})
    .then(data => {console.log(data);return data;})
    .catch (err => {
      console.log("===we have an error===")
      console.log(err.stack)
    })
    */

    //return "https://projects-2018-tanyagupta.c9users.io:8080/restaurants"


    //return 'https://127.0.0.1:8082/data/restaurants.json'
    //return `http://localhost:${port}/data/restaurants.json`;
    //return "https://projects-2018-tanyagupta.c9users.io:8082/data/restaurants.json"  /* server location */
   // return 'http://localhost:1337/restaurants'
 // }

  /**
   * Fetch all restaurants.
   */
  static fetchRestaurants(callback) {
    idb.fetchRestaurants().then(function(restaurants){

      return restaurants;
    })

    /*
    let xhr = new XMLHttpRequest();
    xhr.open('GET', DBHelper.DATABASE_URL);
    console.log(DBHelper.DATABASE_URL);
    xhr.onload = () => {
      if (xhr.status === 200) { // Got a success response from server!

        const json = JSON.parse(xhr.responseText);
        const restaurants = json.restaurants;
        DBHelper.data.all_data=restaurants


        callback(null, restaurants);
      } else { // Oops!. Got an error from server.
        const error = (`Request failed. Returned status of ${xhr.status}`);
        callback(error, null);
      }
    };
    xhr.send();
    */
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
