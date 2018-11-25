// map ->
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
  }, { passive: true });
}

// modals ->
function modalConstructor(modal, openLink, cross, openClass) {
  var self = this;
  this.openClass = openClass;
  this.modal = modal;

  openLink.addEventListener('click', function(event) {
    event.preventDefault();
    self.toggleModal();
  });

  cross.addEventListener('click', self.toggleModal.bind(self));
}

modalConstructor.prototype.toggleModal = function() {
  var classList = this.modal.className.split(' ');
  var index = classList.indexOf(this.openClass);

  if (index != -1) {
    classList.splice(index, 1);
    this.modal.className = classList.join(' ');
  } else {
    this.modal.className += ' ' + this.openClass;
  }
}

new modalConstructor(
  document.querySelector('.modal-login'),
  document.querySelector('.login-link'),
  document.querySelector('.modal-login .modal-close'),
  'modal-login-show'
);

new modalConstructor(
  document.querySelector('.modal-map'),
  document.querySelector('.map-link'),
  document.querySelector('.modal-map .modal-close'),
  'modal-map-show'
);
