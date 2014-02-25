 function initializeMap(markerData) {

   function initializeMarkers() {
   var markers = [];

   // Prepare the map canvas
   var map = new google.maps.Map( document.getElementById("map_canvas"), { 
     zoom: 1,
     center: new google.maps.LatLng(40.4419, -72.1419),
     disableDefaultUI: false,
   });

   // Now for each markerData passed, prepare a marker
   for (var i = 0; i < markerData.length; ++i) {
     var marker = new MarkerWithLabel({
       position: new google.maps.LatLng(markerData[i].location.lat, markerData[i].location.lng),
       draggable: false,
       raiseOnDrag: false,
       map: map,
       labelContent: markerData[i].label,
       labelAnchor: new google.maps.Point(22, 0),
       labelClass: "labels",
       labelStyle: {opacity: 1}
     });

     // Associate the marker with a click handler
     google.maps.event.addListener(marker, "click", function (e) { location.href=markerData[i].href});

     // Add the marker to the markers list
     markers.push(marker);
  }

  // Prepare a markerCluster with the markers
  var markerCluster = new MarkerClusterer(map, markers);
  };
  // When googlemaps is loaded 
  google.maps.event.addDomListener(window, 'load', initializeMarkers);

};
