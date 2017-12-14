// key - AIzaSyCukEN2AlPAsJeZZ5cULDFFGFv5J4dsXS0

function initMap() {
    var map = new google.maps.Map(document.getElementById('map'), {
      zoom: 13,
      center: {lat: 34.04924594193164, lng: -118.24104309082031}
    });
    var trafficLayer = new google.maps.TrafficLayer();
    google.maps.event.trigger(map, 'resize');
    trafficLayer.setMap(map);
  }
