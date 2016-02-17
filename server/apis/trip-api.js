require('../server-helper');

var TripAPI = require('express').Router();
var Trip    = require('../../models/trip');

module.exports = TripAPI;

/*
  POST trip/

  Creates a trip

  Expects request: {
    name: String <name of trip>
  }

  Responds with the new trip: {
    id:   Number <unique id of this trip>
    name: String <name of this trip>
  }
*/
TripAPI.post('/', function(request, response) {
  var newTrip = {
    name: request.body.name
  }

  Trip.create(newTrip)
    .then(function(newTrip) {
      response.send(newTrip);
    })
    .catch(function(error) {
      console.error('ERROR POST:', request.url);
      response.status(500).send('Server error posting new trip');
    })
})

/*
  POST trip/:id_trip/user

  Adds a user to a trip

  Expects request: {
    id_user: Number <id of the user to add to trip>
    // TODO: enable adding user by email
  }

  Responds with: {
    id_trip: Number <id of trip>
    id_user: Number <id of user added to trip>
  }
*/
TripAPI.post('/:id_trip/user', function(request, response) {
  var newUserTrip = {
    id_user = request.body.id_user,
    id_trip = request.params.id_trip
  }

  Trip.addUser(newUserTrip)
    .then(function(userTrip) {
      response.send(userTrip);
    })
    .catch(function(error) {
      console.error('ERROR POST:', request.url);
      response.status(500).send('Server error posting new user to trip');
    })
})

/*
  POST trip/:id_trip/task

  Adds a task to a trip

  Expects request: {
    name: String <name of task>
  }

  Responds with: {
    id:       Number <unique id of this task>
    name:     String <name of task>
    status:   String <status of task: 'undecided' or 'decided'>
    decision: String <the decision made for a decided task>
    id_trip:  Number <the trip this task belongs to>
  }
*/
TripAPI.post('/:id_trip/task', function(request, response) {
  let newTask = {
    id_trip: request.params.id_trip,
    name:    request.body.name
  }

  Task.create(newTask)
    .then(function(newTask) {
      response.send(newTask);
    })
    .catch(function(error) {
      console.error('ERROR POST:', request.url);
      response.status(500).send('Server error posting new user to trip');
    })
})

/*
  GET trip/:tripId/tasks

  Retrieves the tasks of a trip

  Responds with: [
    {
      id:       Number <unique id of this task>
      name:     String <name of task>
      status:   String <status of task: 'undecided' or 'decided'>
      decision: String <the decision made for a decided task>
      id_trip:  Number <the trip this task belongs to>
    },
    ...
  ]
*/
TripAPI.get('/:tripId/tasks', function(request, response) {
  var tripId = request.params.tripId;

  Task.allOfTrip(tripId)
    .then(function(allTasks) {
      response.send(allTasks);
    })
    .catch(function(error) {
      console.error('ERROR GET:', request.url);
      response.status(500).send('Server error getting tasks by trip id');
    })
})

/*
  NOT IMPLEMENTED

  GET trip/:tripId/users

  Retrieves the users of a trip

  Responds with: [
    {
      id:       Number <unique id of user>
      username: String <username of user>
      email:    String <email of user>
    },
    ...
  ]
*/
TripAPI.get('/:tripId/users', function(request, response) {
  var tripId = request.params.tripId;

  User.allOfTrip(tripId)
    .then(function(allUsers) {
      response.send(allUsers);
    })
    .catch(function(error) {
      console.error('ERROR GET:', request.url);
      response.status(500).send('Server error getting users by trip id');
    })
})

