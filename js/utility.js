'use strict';
(function () {

  // export window.utility: ESCAPE, ENTER, bodyTag, getRandomElement, getRandomNumber

  var ESC_KEY = 27;
  var ENTER_KEY = 13;
  var bodyTag = document.querySelector('body');

  var getRandomIndex = function (array) {
    return Math.floor(Math.random() * array.length);
  };

  var getRandomElement = function (array) {
    return array[getRandomIndex(array)];
  };

  var getRandomNumber = function (min, max) {
    return Math.round((Math.random() * (max - min)) + min);
  };

  window.utility = {
    ESCAPE: ESC_KEY,
    ENTER: ENTER_KEY,
    bodyTag: bodyTag,
    getRandomElement: getRandomElement,
    getRandomNumber: getRandomNumber
  };

})();
