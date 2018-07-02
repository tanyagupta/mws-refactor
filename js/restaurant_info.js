let restaurant;
var map;

/**
 * Initialize Google map, called from HTML.
 */



window.initMap = () => {

  fetchRestaurantFromURL((error, restaurant) => {

    if (error) { // Got an error!
      console.error(error);
    } else {
      //console.log(restaurant)
      self.map = new google.maps.Map(document.getElementById('map'), {
        zoom: 16,
        center: restaurant.latlng,
        scrollwheel: false
      });

      fillBreadcrumb();
      DBHelper.mapMarkerForRestaurant(self.restaurant, self.map);
    }
  });
}

/**
 * Get current restaurant from page URL.
 */
fetchRestaurantFromURL = (callback) => {

  if (self.restaurant) { // restaurant already fetched!
    callback(null, self.restaurant)
    return;
  }

  const id = getParameterByName('id');

//  const id = (self.window.location.href).substring((self.window.location.href).indexOf("=")+1,(self.window.location.href).length)
  if (!id) { // no id found in URL
    error = 'No restaurant id in URL'
    callback(error, null);
  } else {
       DBHelper.fetchRestaurantById(id, (error, restaurant) => {
      self.restaurant = restaurant;

      if (!restaurant) {
        console.log(error);
        return;
      }

      fillRestaurantHTML();
      callback(null, restaurant)
    });
  }
}

/**
 * Create restaurant HTML and add it to the webpage
 */
fillRestaurantHTML = (restaurant = self.restaurant) => {
  const name = document.getElementById('restaurant-name');
  name.innerHTML = restaurant.name;

  const address = document.getElementById('restaurant-address');
  address.innerHTML = restaurant.address;

  const image = document.getElementById('restaurant-img');
  image.className = 'restaurant-img';
  image.alt = "restaurant "+restaurant.name;
  const img_name = restaurant.photograph;
  //console.log(img_name);
  const img_num=img_name.split('.')[0].toString()
   image.srcset  =
  "destmin/img/"+img_num+"-256.jpg 256w, "
  "destmin/img/"+img_num+"-320.jpg 320w, "+
  "destmin/img/"+img_num+"-640.jpg 640w,"+"destmin/img/"+img_num+"-1024.jpg 1024w";
  image.sizes="10vw"


  image.src = DBHelper.imageUrlForRestaurant(restaurant);

  const cuisine = document.getElementById('restaurant-cuisine');
  cuisine.innerHTML = restaurant.cuisine_type;

  // fill operating hours
  if (restaurant.operating_hours) {
    fillRestaurantHoursHTML();
  }
  // fill reviews
  fillReviewsHTML();
}

/**
 * Create restaurant operating hours HTML table and add it to the webpage.
 */
fillRestaurantHoursHTML = (operatingHours = self.restaurant.operating_hours) => {
  const hours = document.getElementById('restaurant-hours');
  for (let key in operatingHours) {
    const row = document.createElement('tr');

    const day = document.createElement('td');
    day.innerHTML = key;
    row.appendChild(day);

    const time = document.createElement('td');
    time.innerHTML = operatingHours[key];
    row.appendChild(time);

    hours.appendChild(row);
  }
}

/**
 * Create all reviews HTML and add them to the webpage.
 */
fillReviewsHTML = (reviews = self.restaurant.reviews) => {

  const container = document.getElementById('reviews-container');
  const title = document.createElement('h2');
  title.innerHTML = 'Reviews';
  container.appendChild(title);

 //DBHelper.getReviewsById(self.restaurant.id)
 const id = self.restaurant.id
  DBHelper.getReviewsById(id, (error, reviews) => {
   // console.log(reviews)
  if (!reviews) {
    const noReviews = document.createElement('p');
    noReviews.innerHTML = 'No reviews yet!';
    container.appendChild(noReviews);
    return;
  }
  const ul = document.getElementById('reviews-list');
  //console.log(reviews)
  reviews.forEach(review => {
    ul.appendChild(createReviewHTML(review));
  });
  container.appendChild(ul);

  })
}

/**
 * Create review HTML and add it to the webpage.
 */
createReviewHTML = (review) => {

  const months = ["January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December"
];


  const li = document.createElement('li');
  li.classList.add("full_review")
  const holder = document.createElement('p')
  holder.classList.add("name_date");
  const name = document.createElement('p');
  name.classList.add("review_name");
  name.innerHTML = review.name;

  holder.appendChild(name);
//  li.appendChild(name);

  const date = document.createElement('p');
  date.classList.add("review_date")
  //console.log(review.updatedAt)
  const dateObj = new Date(review.updatedAt);
  const month = months[dateObj.getUTCMonth()];
  const day = dateObj.getUTCDate()
  const year = dateObj.getFullYear()

  date.innerHTML = day+" "+month+", "+year

  holder.appendChild(date);

  li.appendChild(holder);

  const rating = document.createElement('p');
  rating.classList.add("review_score")
  rating.innerHTML = `Rating: ${review.rating}`;
  li.appendChild(rating);

  const comments = document.createElement('p');
  comments.classList.add("review_text")
  comments.innerHTML = review.comments;
  li.appendChild(comments);

  return li;
}

/**
 * Add restaurant name to the breadcrumb navigation menu
 */
fillBreadcrumb = (restaurant=self.restaurant) => {
  const breadcrumb = document.getElementById('breadcrumb');
  const li = document.createElement('li');
  li.innerHTML = restaurant.name;
  li.setAttribute("aria-current","page")
  breadcrumb.appendChild(li);

}

/**
 * Get a parameter by name from page URL.
 */
getParameterByName = (name, url) => {
  //console.log(name);
  //console.log(url)
  if (!url)
    url = window.location.href;
  name = name.replace(/[\[\]]/g, '\\$&');
  const regex = new RegExp(`[?&]${name}(=([^&#]*)|&|#|$)`),
    results = regex.exec(url);
  if (!results)
    return null;
  if (!results[2])
    return '';
  return decodeURIComponent(results[2].replace(/\+/g, ' '));
}
