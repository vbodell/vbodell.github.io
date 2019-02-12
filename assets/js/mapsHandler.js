var route = null;
var thisMap = null;
const markers = {
  [markerKeys.total]: {desc: "Här är vi nu!", marker: null, label: "Vi"},
  [markerKeys.harry]: {desc: "Här borde vi vara...", marker: null, label: "Harry"}
};

$(function(){
  updateMap(markerKeys.harry, getHarryProgress());
});

function initMap() {
  console.log("initializing map");
  var directionsService = new google.maps.DirectionsService();
  var directionsDisplay = new google.maps.DirectionsRenderer();

  thisMap = new google.maps.Map(document.getElementById('map'));
  directionsDisplay.setMap(thisMap);

  var request = {
    origin: kOrigin,
    destination: kDestination,
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

function addMarker(markerKey, lat, lng) {
  /* Remove previous marker */
  if (markers[markerKey].marker)
    markers[markerKey].marker.setMap(null);
  var position = {lat: lat, lng: lng};
  markers[markerKey].marker = new google.maps.Marker({
    position: position,
    map: thisMap,
    // icon: ,
    label: markers[markerKey].label,
    animation: google.maps.Animation.DROP,
    title: markers[markerKey].desc
  });
}

function updateMap(key, distance) {
  if (route == null) {
    setTimeout(function() { updateMap(key, distance); }, 2000); /* Try again in 5 sec */
    return;
  }

  if (distance == 0) {
    var startLoc = route['steps'][0]['start_location'];
    addMarker(key, startLoc.lat(), startLoc.lng());
    return;
  }

  var coveredDistance = 0;
  var routeSteps = route['steps'];
  var prevStep = null;

  for (var i = 0; i < routeSteps.length; i++) {
    var routeStep = routeSteps[i];
    prevStep = routeStep;

    coveredDistance += routeStep['distance']['value'];
    if (coveredDistance >= distance)
      break;
  }
  addMarker(key, prevStep['end_location'].lat(), prevStep['end_location'].lng());
}
