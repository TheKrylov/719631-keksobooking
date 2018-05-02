'use strict';
(function () {
  window.map = {
    userMap: document.querySelector('.map'),
    showMap: function () {
      window.map.userMap.classList.remove('map--faded');
    },
  };
})();
