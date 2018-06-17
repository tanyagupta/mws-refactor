/**
 * Common database helper functions.
 */

/* global fetch */




class DBHelper {

  /**
   * Database URL.
   * Change this to restaurants.json file location on your server.
   */

  static data(){
   const url = "https://projects-2018-tanyagupta.c9users.io:8080/restaurants"

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



  }
  static get DATABASE_URL() {
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
    return "https://projects-2018-tanyagupta.c9users.io:8082/data/restaurants.json"  /* server location */
  }

  /**
   * Fetch all restaurants.
   */
  static fetchRestaurants(callback) {

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
  }

  /**
   * Fetch a restaurant by its ID.
   */
  static fetchRestaurantById(id, callback) {
    // fetch all restaurants with proper error handling.
     DBHelper.fetchRestaurants((error, restaurants) => {
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

  /**
   * Fetch restaurants by a cuisine type with proper error handling.
   */
  static fetchRestaurantByCuisine(cuisine, callback) {
    // Fetch all restaurants  with proper error handling
    DBHelper.fetchRestaurants((error, restaurants) => {
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
    DBHelper.fetchRestaurants((error, restaurants) => {
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

    DBHelper.fetchRestaurants((error, restaurants) => {
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




    DBHelper.fetchRestaurants((error, restaurants) => {



      if (error) {
        callback(error, null);
      } else {
        // Get all neighborhoods from all restaurants

        const neighborhoods = restaurants.map((v, i) => restaurants[i].neighborhood)

        //["Manhattan", "Brooklyn", "Manhattan", "Manhattan", "Brooklyn", "Brooklyn", "Manhattan", "Manhattan", "Queens", "Queens"]
        // Remove duplicates from neighborhoods
        const uniqueNeighborhoods = neighborhoods.filter((v, i) => neighborhoods.indexOf(v) == i)

        //["Manhattan", "Brooklyn", "Queens"]
        callback(null, uniqueNeighborhoods);
      }
    });
  }

  /**
   * Fetch all cuisines with proper error handling.
   */
  static fetchCuisines(callback) {
    // Fetch all restaurants
    DBHelper.fetchRestaurants((error, restaurants) => {
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