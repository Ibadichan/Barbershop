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
function modalConstructor(modal, openLink, cross, overlay, openClass) {
  var self = this;
  this.openClass = openClass;
  this.modal = modal;
  this.overlay = overlay;

  openLink.addEventListener('click', function(event) {
    event.preventDefault();
    self.toggleModal();
  });

  overlay.addEventListener('click', this.toggleModal.bind(this));
  cross.addEventListener('click', this.toggleModal.bind(this));
}

modalConstructor.prototype.toggleModal = function() {
  var classList = this.modal.className.split(' ');
  var index = classList.indexOf(this.openClass);

  if (index != -1) {
    classList.splice(index, 1);
    this.modal.className = classList.join(' ');
    this.overlay.style.display = 'none';
  } else {
    this.modal.className += ' ' + this.openClass;
    this.overlay.style.display = 'block';
  }
}

new modalConstructor(
  document.querySelector('.modal-login'),
  document.querySelector('.login-link'),
  document.querySelector('.modal-login .modal-close'),
  document.querySelector('.modal-login + .modal-overlay'),
  'modal-login-show'
);

new modalConstructor(
  document.querySelector('.modal-map'),
  document.querySelector('.map-link'),
  document.querySelector('.modal-map .modal-close'),
  document.querySelector('.modal-map + .modal-overlay'),
  'modal-map-show'
);
