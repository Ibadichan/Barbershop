function initMap() {
  var petersburg = { lat: 59.938794, lng: 30.323083 };

  var map = new google.maps.Map(document.getElementById('map'), {
    zoom: 17, center: petersburg
  });
  var marker = new google.maps.Marker({ 
    position: petersburg, map: map
  });
  var infowindow = new google.maps.InfoWindow({
    content: '<p>Большая Конюшенная ул., 19</p>'
  });

  infowindow.open(map, marker);
  marker.addListener('click', function() {
    infowindow.open(map, marker);
  });
}
