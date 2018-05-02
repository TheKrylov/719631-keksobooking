'use strict';


(function () {
  var mapPins = window.map.userMap.querySelector('.map__pins');
  var pinTemplate = document.querySelector('#pinTemplate');
  var mapPin = pinTemplate.content.querySelector('.map__pin');
  var data = window.data.create(8);

  window.mapPins = {
    pins: [],
    createPins: function (count) {
      var fragmentPin = document.createDocumentFragment();

      for (var i = 0; i < count; i++) {
        window.mapPins.pins.push(data[i]);

        fragmentPin.appendChild(window.mapPins.renderPin(data[i]));
      }

      mapPins.appendChild(fragmentPin);
    },
    renderPin: function (pin) {
      var element = mapPin.cloneNode(true);

      element.style.left = pin.location.x + 'px';
      element.style.top = pin.location.y + 'px';
      element.querySelector('img').src = pin.author.avatar;
      element.querySelector('img').alt = pin.offer.title;

      // add open event
      element.addEventListener('click', function () {
        window.card.deleteCard();
        window.card.renderCard(pin);
      });

      return element;
    },
  };
})();
