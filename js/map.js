'use strict';
(function () {
  // Mocks
  var mock = {
    avatars: ['img/avatars/user01.png', 'img/avatars/user02.png', 'img/avatars/user03.png', 'img/avatars/user04.png', 'img/avatars/user05.png', 'img/avatars/user06.png', 'img/avatars/user07.png', 'img/avatars/user08.png'],
    title: ['Большая уютная квартира', 'Маленькая неуютная квартира', 'Огромный прекрасный дворец', 'Маленький ужасный дворец', 'Красивый гостевой домик', 'Некрасивый негостеприимный домик', 'Уютное бунгало далеко от моря', 'Неуютное бунгало по колено в воде'],
    address: ['600, 350', '1100, 350', '900, 550', '800, 400', '500, 550', '200, 700', '350, 600', '1000, 700'],
    type: ['palace', 'flat', 'house', 'bungalo'],
    typeRu: ['Замок', 'Квартира', 'Дом', 'Бунгало'],
    checkin: ['12:00', '13:00', '14:00'],
    checkout: ['12:00', '13:00', '14:00'],
    features: ['wifi', 'dishwasher', 'parking', 'washer', 'elevator', 'conditioner'],
    photos: ['http://o0.github.io/assets/images/tokyo/hotel1.jpg', 'http://o0.github.io/assets/images/tokyo/hotel2.jpg', 'http://o0.github.io/assets/images/tokyo/hotel3.jpg']
  };

  // Vars

  var userMap = document.querySelector('.map');
  var mapContainer = userMap.querySelector('.map__filters-container');
  var mapPins = userMap.querySelector('.map__pins');
  var pinTemplate = document.querySelector('#pinTemplate');
  var mapPin = pinTemplate.content.querySelector('.map__pin');
  var mapCard = pinTemplate.content.querySelector('.map__card');

  var pins = [];


  // Get Random
  var getRandom = function (array) {
    return array[Math.floor(Math.random() * array.length)];
  };

  // Get Random int
  var getRandomInt = function (min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  };

  // Array shuffle
  function shuffleArray(array) {
    var y;
    var z;
    var v;
    for (v = array.length - 1; v > 0; v--) {
      y = Math.floor(Math.random() * (v + 1));
      z = array[v];
      array[v] = array[y];
      array[y] = z;
    }
    return array;
  }

  function getRandomFeature(array) {
    var clone = Object.create(array);
    var features = [];
    var maxFeatures = getRandomInt(1, clone.length);

    for (var x = 0; x < maxFeatures; x++) {
      var featureItem = getRandom(clone);
      var elementIndex = array.indexOf(featureItem);
      clone.splice(elementIndex, 1);
      features.push(featureItem);
    }
    return features;
  }


  // Create data
  var createData = function (count) {

    var items = [];
    for (var i = 0; i < count; i++) {
      var item = {};

      // Author
      item.author = {};
      item.author.avatar = mock.avatars[i];

      // Offer
      item.offer = {};
      item.offer.title = mock.title[i];
      item.offer.address = mock.address[i];
      item.offer.price = getRandomInt(1000, 1000000);
      item.offer.type = getRandom(mock.type);
      item.offer.rooms = getRandomInt(1, 5);
      item.offer.guests = getRandomInt(1, 10);
      item.offer.checkin = getRandom(mock.checkin);
      item.offer.checkout = getRandom(mock.checkout);
      item.offer.features = getRandomFeature(mock.features);
      item.offer.description = '';
      item.offer.photos = shuffleArray(mock.photos);

      // Location
      item.location = {};
      item.location.x = getRandomInt(300, 900);
      item.location.y = getRandomInt(150, 500);


      items[i] = item;

    }
    return items;

  };

  // Render pin
  var renderPin = function (pin) {
    var element = mapPin.cloneNode(true);

    element.style.left = pin.location.x + 'px';
    element.style.top = pin.location.y + 'px';
    element.querySelector('img').src = pin.author.avatar;
    element.querySelector('img').alt = pin.offer.title;

    return element;
  };

  // Create pins

  var createPins = function () {

    for (var i = 0; i < 8; i++) {
      pins.push(data[i]);
    }

    var fragmentPin = document.createDocumentFragment();
    for (var j = 0; j < pins.length; j++) {
      fragmentPin.appendChild(renderPin(pins[j]));
    }
    mapPins.appendChild(fragmentPin);
  };


  var fillCard = function (pin) {
    var element = userMap.querySelector('.map__card');

    element.querySelector('.popup__title').textContent = pin.offer.title;
    element.querySelector('.popup__text--address').textContent = '';
    element.querySelector('.popup__text--price').textContent = pin.offer.price + '₽/ночь';
    element.querySelector('.popup__text--capacity').textContent = mock.typeRu[mock.type.indexOf(pin.offer.type)];
    element.querySelector('.popup__text--capacity').textContent = pin.offer.rooms + ' комнаты для ' + pin.offer.guests + ' гостей';
    element.querySelector('.popup__text--time').textContent = 'Заезд после ' + pin.offer.checkin + ' , выезд до ' + pin.offer.checkout;

    var featuresList = element.querySelector('.popup__features');

    for (var z = 0; z < mock.features.length; z++) {
      var elementFeature = pin.offer.features.indexOf(mock.features[z]);

      if (elementFeature < 0) {
        featuresList.querySelector('.popup__feature--' + mock.features[z]).style.display = 'none';
      } else {
        featuresList.querySelector('.popup__feature--' + mock.features[z]).style.display = 'inline-block';
      }
    }

    element.querySelector('.popup__description').textContent = pin.offer.description;

    var cardImages = element.querySelector('.popup__photos');
    cardImages.innerHTML = '';
    var fragmentPinImages = document.createDocumentFragment();

    for (var p = 0; p < pin.offer.photos.length; p++) {
      var pinImage = mapCard.querySelector('.popup__photo').cloneNode(true);
      pinImage.src = pin.offer.photos[p];
      fragmentPinImages.appendChild(pinImage);
    }

    cardImages.appendChild(fragmentPinImages);

    element.querySelector('.popup__avatar').src = pin.author.avatar;
  };

  // Show map
  var showMap = function () {
    userMap.classList.remove('map--faded');
  };

  var showCard = function () {
    userMap.insertBefore(mapCard.cloneNode(true), mapContainer);
    fillCard(pins[0]);
  };


  // ---- Start ----- //

  // Generate data
  var data = createData(8);

  // Show map
  showMap();

  // Create Pins
  createPins();

  // Show card
  showCard();


})();
