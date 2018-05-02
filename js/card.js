'use strict';

(function () {

  var mapCard = document.querySelector('#pinTemplate').content.querySelector('.map__card');
  var mapContainer = window.map.userMap.querySelector('.map__filters-container');

  var createCardTemplate = function () {
    window.map.userMap.insertBefore(mapCard.cloneNode(true), mapContainer);
  };

  var fillCard = function (element, pin) {
    fillCardFields(element, pin);
    fillCardFeatureList(element, pin);
    fillCardPhotos(element, pin);
  };

  var fillCardFields = function (element, pin) {
    element.querySelector('.popup__title').textContent = pin.offer.title;
    element.querySelector('.popup__text--address').textContent = '';
    element.querySelector('.popup__text--price').textContent = pin.offer.price + '₽/ночь';
    element.querySelector('.popup__text--capacity').textContent = window.data.mock.typeRu[window.data.mock.type.indexOf(pin.offer.type)];
    element.querySelector('.popup__text--capacity').textContent = pin.offer.rooms + ' комнаты для ' + pin.offer.guests + ' гостей';
    element.querySelector('.popup__text--time').textContent = 'Заезд после ' + pin.offer.checkin + ' , выезд до ' + pin.offer.checkout;
    element.querySelector('.popup__description').textContent = pin.offer.description;
    element.querySelector('.popup__avatar').src = pin.author.avatar;
  };

  var fillCardFeatureList = function (element, pin) {
    var featuresList = element.querySelector('.popup__features');

    for (var i = 0; i < window.data.mock.features.length; i++) {
      var featureElement = featuresList.querySelector('.popup__feature--' + window.data.mock.features[i]);
      var isFeatureExist = pin.offer.features.indexOf(window.data.mock.features[i]) !== -1;

      if (isFeatureExist) {
        window.utils.showElement(featureElement);
      } else {
        window.utils.hideElement(featureElement);
      }
    }
  };

  var fillCardPhotos = function (element, pin) {
    var cardImages = element.querySelector('.popup__photos');

    cardImages.innerHTML = '';
    cardImages.appendChild(generateCardPhotosElement(pin));
  };

  var generateCardPhotosElement = function (pin) {
    var photosCount = pin.offer.photos.length;
    var fragmentPinImages = document.createDocumentFragment();

    for (var i = 0; i < photosCount; i++) {
      var pinImage = mapCard.querySelector('.popup__photo').cloneNode(true);
      pinImage.src = pin.offer.photos[i];
      fragmentPinImages.appendChild(pinImage);
    }

    return fragmentPinImages;
  };

  var addCardCloseHandler = function (element) {
    var close = element.querySelector('.popup__close');
    close.addEventListener('click', function () {
      window.card.deleteCard();
    });
  };

  var getCardElement = function () {
    return window.map.userMap.querySelector('.map__card');
  };

  window.card = {
    renderCard: function (pin) {
      createCardTemplate();

      var cardElement = getCardElement();

      fillCard(cardElement, pin);
      addCardCloseHandler(cardElement);
    },
    deleteCard: function () {
      var el = window.map.userMap.querySelector('.map__card');
      if (el) {
        el.parentNode.removeChild(el);
      }
    }
  };

})();
