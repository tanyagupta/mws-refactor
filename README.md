# Mobile Web Specialist Certification Course
---
#### _Three Stage Course Material Project - Restaurant Reviews_

## Project Overview: Stage 3

### Set up

1. You need to have two servers running. One is the client server and the other is the data server


#### Set up data server

3. For the data server git clone https://github.com/tanyagupta/mws-restaurant-stage-3 and Install project dependancies
# npm i
Install Sails.js globally
# npm i sails -g
Start the server
# node server
Note the server runs on port 1337 by default

#### Set up client server
2. For the client sever, check the version of Python you have: `python -V`. If you have Python 2.x, spin up the server with `python -m SimpleHTTPServer 8080`
2. With your server running, visit the site: `http://localhost:8000`, to see what the current experience looks like
3. Note that the data comes from the server so you have to run the data server first to see the restaurant details

### What does this project do ?
1. Fully offline
2. PWA scores of 90 plus
3. Background sync for reviews and starring restaurants
4. New review added without hard reload
