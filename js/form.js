'use strict';

(function () {

  window.form = {
    setAddress: function () {
      adAddress.value = window.pin.mapPinMain.style.left.slice(0, -2) + ', ' + window.pin.mapPinMain.style.top.slice(0, -2);
    },
    showAD: function () {
      adForm.classList.remove('ad-form--disabled');
      window.utils.setElementEnabled(adFormFieldset);
    },
  };

  var adForm = document.querySelector('.ad-form');
  var adAddress = adForm.querySelector('#address');
  var adFormFieldset = adForm.querySelectorAll('fieldset');
  var adFormType = adForm.querySelector('#type');
  var adFormPrice = adForm.querySelector('#price');
  var adFormRoomNumber = adForm.querySelector('#room_number');
  var adFormCapacity = adForm.querySelector('#capacity');

  var adFormTimeIn = adForm.querySelector('#timein');
  var adFormTimeOut = adForm.querySelector('#timeout');

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

  // Event handlers

  adFormRoomNumber.addEventListener('change', function () {
    capacityChangeHanlder(+adFormRoomNumber.value);
  });

  adFormType.addEventListener('change', function () {
    roomChangeHandler(adFormType.value);
  });

  adFormTimeIn.addEventListener('change', timeChangeHanlder);
  adFormTimeOut.addEventListener('change', timeChangeHanlder);


})();
