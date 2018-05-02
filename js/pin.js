'use strict';

(function () {
  window.pin = {
    mapPinMain: window.map.userMap.querySelector('.map__pin--main'),
  };

  var mapPinMain = window.pin.mapPinMain;
  var moveLimits = {
    top: window.map.userMap.offsetTop + 150,
    right: window.map.userMap.offsetWidth - 65,
    bottom: window.map.userMap.offsetTop + 500,
    left: 0
  };
  var startCoords;

  mapPinMain.addEventListener('mouseup', function () {
    window.map.showMap();
    window.mapPins.createPins(8);
    window.form.showAD();
  });

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
    window.form.setAddress();
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

    window.form.setAddress();
  };

})();
