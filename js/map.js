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

  var mapPinMain = userMap.querySelector('.map__pin--main');

  var adForm = document.querySelector('.ad-form');
  var adAddress = adForm.querySelector('#address');
  var adFormFieldset = adForm.querySelectorAll('fieldset');
  var adFormType = adForm.querySelector('#type');
  var adFormPrice = adForm.querySelector('#price');
  var adFormRoomNumber = adForm.querySelector('#room_number');
  var adFormCapacity = adForm.querySelector('#capacity');

  var adFormTimeIn = adForm.querySelector('#timein');
  var adFormTimeOut = adForm.querySelector('#timeout');

  var startCoords;
  var pins = [];

  var moveLimits = {
    top: userMap.offsetTop + 150,
    right: userMap.offsetWidth - 65,
    bottom: userMap.offsetTop + 500,
    left: 0
  };

  var settings = {
    roomPrice: {
      flat: 1000,
      bungalo: 0,
      house: 5000,
      palace: 10000
    }
  };


  var timeChangeHanlder = function (evt) {
    var index = evt.target.selectedIndex;
    adFormTimeIn.selectedIndex = index;
    adFormTimeOut.selectedIndex = index;
  };


  var roomChangeHandler = function (value) {
    adFormPrice.min = settings.roomPrice[value];
    adFormPrice.placeholder = settings.roomPrice[value];
  };

  var capacityChangeHanlder = function (value) {
    switch (value) {
      case 1:
        capacityDisabler([1]);
        break;
      case 2:
        capacityDisabler([2, 1]);
        break;
      case 3:
        capacityDisabler([3, 2, 1]);
        break;
      case 4:
        capacityDisabler([0]);
        break;
      default:
        capacityDisabler([0]);
        break;
    }
  };

  var capacityDisabler = function (values) {
    var options = adFormCapacity.querySelectorAll('option');

    for (var i = 0, isDisabled, enableOption; i < options.length; i++) {
      isDisabled = values.indexOf(+options[i].value) !== -1;
      if (!isDisabled) {
        options[i].disabled = true;
      } else {
        enableOption = options[i].value;
        options[i].disabled = false;
      }
    }

    adFormCapacity.value = enableOption;
  };

  // Get Random
  var getRandom = function (array) {
    return array[Math.floor(Math.random() * array.length)];
  };

  // Get Random int
  var getRandomInt = function (min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  };

  // Enable fieldsets
  var setElementEnabled = function (nodeList) {
    for (var i = 0; i < nodeList.length; i++) {
      nodeList[i].disabled = false;
    }
    return true;
  };

  // Array shuffle
  function shuffleArray(array) {
    for (var i = array.length - 1, j, k; i > 0; i--) {
      j = Math.floor(Math.random() * (i + 1));
      k = array[i];
      array[i] = array[j];
      array[j] = k;
    }
    return array;
  }

  // Randomize Features
  function getRandomFeature(array) {
    var features = shuffleArray(array.slice());
    features.length = getRandomInt(1, array.length);
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

    // add open event
    element.addEventListener('click', function () {
      deleteCard();
      renderCard(pin);
    });

    return element;
  };

  // Create pins
  var createPins = function (count) {
    var fragmentPin = document.createDocumentFragment();

    for (var i = 0; i < count; i++) {
      pins.push(data[i]);
      fragmentPin.appendChild(renderPin(data[i]));
    }

    mapPins.appendChild(fragmentPin);
  };

  var setAddress = function () {
    adAddress.value = mapPinMain.style.left.slice(0, -2) + ', ' + mapPinMain.style.top.slice(0, -2);
  };

  var createCardTemplate = function () {
    userMap.insertBefore(mapCard.cloneNode(true), mapContainer);
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
    element.querySelector('.popup__text--capacity').textContent = mock.typeRu[mock.type.indexOf(pin.offer.type)];
    element.querySelector('.popup__text--capacity').textContent = pin.offer.rooms + ' комнаты для ' + pin.offer.guests + ' гостей';
    element.querySelector('.popup__text--time').textContent = 'Заезд после ' + pin.offer.checkin + ' , выезд до ' + pin.offer.checkout;
    element.querySelector('.popup__description').textContent = pin.offer.description;
    element.querySelector('.popup__avatar').src = pin.author.avatar;
  };

  var fillCardFeatureList = function (element, pin) {
    var featuresList = element.querySelector('.popup__features');

    for (var i = 0; i < mock.features.length; i++) {
      var featureElement = featuresList.querySelector('.popup__feature--' + mock.features[i]);
      var isFeatureExist = pin.offer.features.indexOf(mock.features[i]) !== -1;

      if (isFeatureExist) {
        showElement(featureElement);
      } else {
        hideElement(featureElement);
      }
    }
  };

  var setElementDisplayStyle = function (element, style) {
    element.style.display = style;
  };

  var hideElement = function (el) {
    setElementDisplayStyle(el, 'none');
  };

  var showElement = function (el) {
    setElementDisplayStyle(el, 'inline-block');
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
      deleteCard();
    });
  };

  var getCardElement = function () {
    return userMap.querySelector('.map__card');
  };

  // Render card
  var renderCard = function (pin) {
    createCardTemplate();

    var cardElement = getCardElement();

    fillCard(cardElement, pin);
    addCardCloseHandler(cardElement);
  };

  // Delete card
  var deleteCard = function () {
    var el = userMap.querySelector('.map__card');
    if (el) {
      el.parentNode.removeChild(el);
    }
  };

  // Show map
  var showMap = function () {
    userMap.classList.remove('map--faded');
  };

  // Show AD form
  var showAD = function () {
    adForm.classList.remove('ad-form--disabled');
    setElementEnabled(adFormFieldset);
  };

  // Event handlers
  mapPinMain.addEventListener('mouseup', function () {
    showMap();
    createPins(8);
    showAD();

  });

  adFormRoomNumber.addEventListener('change', function () {
    capacityChangeHanlder(+adFormRoomNumber.value);
  });

  adFormType.addEventListener('change', function () {
    roomChangeHandler(adFormType.value);
  });

  adFormTimeIn.addEventListener('change', timeChangeHanlder);
  adFormTimeOut.addEventListener('change', timeChangeHanlder);


  mapPinMain.addEventListener('mousedown', function (evt) {
    evt.preventDefault();
    startCoords = {
      x: evt.clientX,
      y: evt.clientY
    };

    document.addEventListener('mousemove', pinMoveHandler);
    document.addEventListener('mouseup', onMouseUp);
  });

  var onMouseUp = function (evt) {
    evt.preventDefault();
    setAddress();
    document.removeEventListener('mousemove', pinMoveHandler);
    document.removeEventListener('mouseup', onMouseUp);
  };

  var pinMoveHandler = function (evt) {
    evt.preventDefault();
    var shift = {
      x: startCoords.x - evt.clientX,
      y: startCoords.y - evt.clientY
    };
    startCoords = {
      x: evt.clientX,
      y: evt.clientY
    };

    var pinPosition = {
      top: mapPinMain.offsetTop - shift.y,
      left: mapPinMain.offsetLeft - shift.x
    };

    mapPinMain.style.left = mapPinMain.offsetLeft - shift.x + 'px';

    if (pinPosition.left < moveLimits.left) {
      mapPinMain.style.left = moveLimits.left + 'px';
    } else if (pinPosition.left > moveLimits.right) {
      mapPinMain.style.left = moveLimits.right + 'px';
    }

    mapPinMain.style.top = (pinPosition.top) + 'px';

    if (pinPosition.top > moveLimits.bottom) {
      mapPinMain.style.top = moveLimits.bottom + 'px';
    } else if (pinPosition.top < moveLimits.top) {
      mapPinMain.style.top = moveLimits.top + 'px';
    }

    setAddress();
  };

  // ---- Start ----- //

  // Generate data
  var data = createData(8);


})();
