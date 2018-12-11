// CLASSLIST POLYFILL
// Источник: https://gist.github.com/k-gun/c2ea7c49edf7b757fe9561ba37cb19ca
;(function() {
  // helpers
  var regExp = function(name) {
    return new RegExp('(^| )' + name + '( |$)');
  };
  var forEach = function(list, fn, scope) {
    for (var i = 0; i < list.length; i++) {
      fn.call(scope, list[i]);
    }
  };

  // class list object with basic methods
  function ClassList(element) {
    this.element = element;
  }

  ClassList.prototype = {
    add: function() {
      forEach(arguments, function(name) {
        if (!this.contains(name)) {
          this.element.className += ' ' + name;
        }
      }, this);
    },
    remove: function() {
      forEach(arguments, function(name) {
        this.element.className =
          this.element.className.replace(regExp(name), '');
      }, this);
    },
    toggle: function(name) {
      return this.contains(name) ? (this.remove(name), false) : (this.add(name), true);
    },
    contains: function(name) {
      return regExp(name).test(this.element.className);
    },
    // bonus..
    replace: function(oldName, newName) {
      this.remove(oldName), this.add(newName);
    }
  };

  // IE8/9, Safari
  if (!('classList' in Element.prototype)) {
    Object.defineProperty(Element.prototype, 'classList', {
      get: function() {
        return new ClassList(this);
      }
    });
  }

  // replace() support for others
  if (window.DOMTokenList && DOMTokenList.prototype.replace == null) {
    DOMTokenList.prototype.replace = ClassList.prototype.replace;
  }
})();

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
  });
}

// modals ->
function Modal(options) {
  this.options = options;

  options.openLink.addEventListener('click', this.toggleModal.bind(this));
  options.cross && options.cross.addEventListener('click', this.toggleModal.bind(this));
  options.overlay && options.overlay.addEventListener('click', this.toggleModal.bind(this));
  window.addEventListener('keydown', function(event) {
    var modal = options.container
    var modalOpenClass = options.modalOpenClass;

    if (event.keyCode === 27 && modal.classList.contains(modalOpenClass)) {
      event.preventDefault();
      modal.classList.remove(modalOpenClass);
      if (!options.overlay || !options.overlayOpenClass) { return; }
      options.overlay.classList.remove(options.overlayOpenClass);
    }
  });
}

Modal.prototype.toggleModal = function(event) {
  event.preventDefault();
  var options = this.options;

  options.container.classList.toggle(options.modalOpenClass);
  options.overlay && options.overlay.classList.toggle(options.overlayOpenClass);
  options.fieldToFocus && options.fieldToFocus.focus();
}

new Modal({
  container: document.querySelector('.modal-login'),
  openLink: document.querySelector('.login-link'),
  modalOpenClass: 'modal-login-show',
  cross: document.querySelector('.modal-login .modal-close'),
  overlay: document.querySelector('.modal-login + .modal-overlay'),
  overlayOpenClass: 'modal-overlay-show',
  fieldToFocus: document.querySelector('#user-login')
});

new Modal({
  container: document.querySelector('.modal-map'),
  openLink: document.querySelector('.map-link'),
  modalOpenClass: 'modal-map-show',
  cross: document.querySelector('.modal-map .modal-close'),
  overlay: document.querySelector('.modal-map + .modal-overlay'),
  overlayOpenClass: 'modal-overlay-show'
});
