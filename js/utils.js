'use strict';

window.utils = {
  shuffleArray: function (array) {
    for (var i = array.length - 1, j, k; i > 0; i--) {
      j = Math.floor(Math.random() * (i + 1));
      k = array[i];
      array[i] = array[j];
      array[j] = k;
    }
    return array;
  },
  getRandom: function (array) {
    return array[Math.floor(Math.random() * array.length)];
  },
  getRandomInt: function (min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  },
  getRandomFeature: function (array) {
    var features = window.utils.shuffleArray(array.slice());
    features.length = window.utils.getRandomInt(1, array.length);
    return features;
  },
  setElementEnabled: function (nodeList) {
    for (var i = 0; i < nodeList.length; i++) {
      nodeList[i].disabled = false;
    }
    return true;
  },
  setElementDisplayStyle: function (element, style) {
    element.style.display = style;
  },
  hideElement: function (el) {
    window.utils.setElementDisplayStyle(el, 'none');
  },
  showElement: function (el) {
    window.utils.setElementDisplayStyle(el, 'inline-block');
  }
};
