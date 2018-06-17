let restaurants,
  neighborhoods,
  cuisines
var map
var markers = []

/**
 * Fetch neighborhoods and cuisines as soon as the page is loaded.
 */
document.addEventListener('DOMContentLoaded', (event) => {

  fetchNeighborhoods();
  fetchCuisines();
});

/**
 * Fetch all neighborhoods and set their HTML.
 */
fetchNeighborhoods = () => {

  DBHelper.fetchNeighborhoods((error, neighborhoods) => {
    //["Manhattan", "Brooklyn", "Queens"]
    if (error) { // Got an error
      console.error(error);
    } else {
      self.neighborhoods = neighborhoods;
      //self.neighborhoods = ["Manhattan", "Brooklyn", "Queens"]
      fillNeighborhoodsHTML();
    }
  });
  //})
}

/**
 * Set neighborhoods HTML.
 */
fillNeighborhoodsHTML = (neighborhoods = self.neighborhoods) => {

  const select = document.getElementById('neighborhoods-select');
  neighborhoods.forEach(neighborhood => {
    const option = document.createElement('option');
    option.innerHTML = neighborhood;
    option.value = neighborhood;
    select.append(option);
  });
}

/**
 * Fetch all cuisines and set their HTML.
 */
fetchCuisines = () => {
  DBHelper.fetchCuisines((error, cuisines) => {
    //["Asian", "Pizza", "American", "Mexican"]
    if (error) { // Got an error!
      console.error(error);
    } else {
      self.cuisines = cuisines;
      fillCuisinesHTML();
    }
  });
}

/**
 * Set cuisines HTML.
 */
fillCuisinesHTML = (cuisines = self.cuisines) => {
  const select = document.getElementById('cuisines-select');
  cuisines.forEach(cuisine => {
    const option = document.createElement('option');
    option.innerHTML = cuisine;
    option.value = cuisine;
    select.append(option);
  });
}

/**
 * Initialize Google map, called from HTML.
 */
window.initMap = () => {
  let loc = {
    lat: 40.722216,
    lng: -73.987501
  };
  const map = document.getElementById('map');
  map.title="restaurants map"
  self.map = new google.maps.Map(map, {
    zoom: 12,
    center: loc,
    scrollwheel: false
  });

  updateRestaurants();
}

/**
 * Update page and map for current restaurants.
 */
updateRestaurants = () => {

  const cSelect = document.getElementById('cuisines-select');
  const nSelect = document.getElementById('neighborhoods-select');

  const cIndex = cSelect.selectedIndex;
  const nIndex = nSelect.selectedIndex;

  const cuisine = cSelect[cIndex].value;
  const neighborhood = nSelect[nIndex].value;
  
  DBHelper.fetchRestaurantByCuisineAndNeighborhood(cuisine, neighborhood, (error, restaurants) => {


    /*

    0: {id: 1, name: "Mission Chinese Food", neighborhood: "Manhattan", photograph: "1.jpg", address: "171 E Broadway, New York, NY 10002", …}
1: {id: 2, name: "Emily", neighborhood: "Brooklyn", photograph: "2.jpg", address: "919 Fulton St, Brooklyn, NY 11238", …}
2: {id: 3, name: "Kang Ho Dong Baekjeong", neighborhood: "Manhattan", photograph: "3.jpg", address: "1 E 32nd St, New York, NY 10016", …}
3: {id: 4, name: "Katz's Delicatessen", neighborhood: "Manhattan", photograph: "4.jpg", address: "205 E Houston St, New York, NY 10002", …}
4: {id: 5, name: "Roberta's Pizza", neighborhood: "Brooklyn", photograph: "5.jpg", address: "261 Moore St, Brooklyn, NY 11206", …}
5: {id: 6, name: "Hometown BBQ", neighborhood: "Brooklyn", photograph: "6.jpg", address: "454 Van Brunt St, Brooklyn, NY 11231", …}
6: {id: 7, name: "Superiority Burger", neighborhood: "Manhattan", photograph: "7.jpg", address: "430 E 9th St, New York, NY 10009", …}
7: {id: 8, name: "The Dutch", neighborhood: "Manhattan", photograph: "8.jpg", address: "131 Sullivan St, New York, NY 10012", …}
8: {id: 9, name: "Mu Ramen", neighborhood: "Queens", photograph: "9.jpg", address: "1209 Jackson Ave, Queens, NY 11101", …}
9: {id: 10, name: "Casa Enrique", neighborhood: "Queens", photograph: "10.jpg", address: "5-48 49th Ave, Queens, NY 11101", …}
length: 10



    */
    if (error) { // Got an error!
      console.error(error);
    } else {
      resetRestaurants(restaurants);
      fillRestaurantsHTML();
    }
  })
}

/**
 * Clear current restaurants, their HTML and remove their map markers.
 */
resetRestaurants = (restaurants) => {
  // Remove all restaurants
  self.restaurants = [];
  const ul = document.getElementById('restaurants-list');
  ul.innerHTML = '';

  // Remove all map markers
  self.markers.forEach(m => m.setMap(null));
  self.markers = [];
  self.restaurants = restaurants;
}

/**
 * Create all restaurants HTML and add them to the webpage.
 */
fillRestaurantsHTML = (restaurants = self.restaurants) => {
  const ul = document.getElementById('restaurants-list');
  restaurants.forEach(restaurant => {
    ul.append(createRestaurantHTML(restaurant));
  });
  addMarkersToMap();
}

/**
 * Create restaurant HTML.
 */
createRestaurantHTML = (restaurant) => {
  const li = document.createElement('li');
  const picture = document.createElement('picture');
  const source = document.createElement('source');
 // source.media = "(min-width: 224px)"
 source.media = "(min-width: 320px)"
  picture.append(source);


  const image = document.createElement('img');
  image.className = 'restaurant-img';
  image.alt = "restaurant "+restaurant.name;

  const img_name = restaurant.photograph;

//  const img_num=img_name.split('.')[0].toString()
  const img_num = restaurant.id;
  image.srcset  =
  "destmin/img/"+img_num+"-256.jpg 256w, "
  "destmin/img/"+img_num+"-320.jpg 320w, "+
  "destmin/img/"+img_num+"-640.jpg 640w,"+"destmin/img/"+img_num+"-1024.jpg 1024w";
  image.sizes="50vw"
  /* vw: hundredths of the viewport width. so 10vw is 10% of viewport size */

  image.src = DBHelper.imageUrlForRestaurant(restaurant);

  //image.srcset = "dest/320/1.jpg 100w, dest/640/1.jpg 200w"
  picture.append(image)
  console.log(picture)

  li.append(picture);


  const name = document.createElement('h3');
  name.innerHTML = restaurant.name;
  li.append(name);

  const neighborhood = document.createElement('p');
  neighborhood.innerHTML = restaurant.neighborhood;
  li.append(neighborhood);

  const address = document.createElement('p');
  address.innerHTML = restaurant.address;
  li.append(address);

  const more = document.createElement('a');
  //console.log(restaurant.name)
  more.innerHTML = restaurant.name+" info";
  more.href = DBHelper.urlForRestaurant(restaurant);
  li.append(more)

  return li
}

/**
 * Add markers for current restaurants to the map.
 */
addMarkersToMap = (restaurants = self.restaurants) => {
  restaurants.forEach(restaurant => {
    // Add marker to the map
    const marker = DBHelper.mapMarkerForRestaurant(restaurant, self.map);
    google.maps.event.addListener(marker, 'click', () => {
      window.location.href = marker.url
    });
    self.markers.push(marker);
  });
}
