
var route = null;
var lastMarker = null;
var thisMap = null;

function initMap() {
  console.log("initializing map");
  var directionsService = new google.maps.DirectionsService();
  var directionsDisplay = new google.maps.DirectionsRenderer();

  thisMap = new google.maps.Map(document.getElementById('map'));
  directionsDisplay.setMap(thisMap);

  var request = {
    origin: 'Synålsvägen 19, Bromma, Stockholm',
    destination: 'Räntans Gård',
    travelMode: 'WALKING'
  }
  directionsService.route(request, function(response, status) {
    if (status == 'OK') {
      route = response['routes'][0]['legs'][0];
      var totalDistance = route['distance']['value'];
      console.log("Total distance in meters is: " + totalDistance);
      directionsDisplay.setDirections(response);
    }
  });
}

function addMarker(lat, lng) {
  /* Remove previous marker */
  if (lastMarker)
    lastMarker.setMap(null);
  var position = {lat: lat, lng: lng};
  lastMarker = new google.maps.Marker({
    position: position,
    map: thisMap,
    title: "Här är vi nu!"
  });
}

function updateMap(totalSteps) {
  if (route == null) {
    setInterval(function() { updateMap(totalSteps); }, 5000); /* Try again in 5 sec */
  }
  console.log("Updating map w/ total " + totalSteps + " steps.");
  var coveredDistance = 0;
  var routeSteps = route['steps'];
  var prevStep = null;

  for (var i = 0; i < routeSteps.length; i++) {
    var routeStep = routeSteps[i];
    prevStep = routeStep;

    coveredDistance += routeStep['distance']['value'];
    if (coveredDistance >= totalSteps)
      break;
  }

  console.log("Made it to " + prevStep['end_location']);
  addMarker(prevStep['end_location'].lat(), prevStep['end_location'].lng());
}
