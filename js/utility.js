'use strict';
(function () {

  // export window.utility: var ESCAPE, var ENTER, var bodyTag, getRandomElement, getRandomNumber

  var ESC_KEY = 27;
  var ENTER_KEY = 13;
  var bodyTag = document.querySelector('body');

  window.utility = {
    ESCAPE: ESC_KEY,
    ENTER: ENTER_KEY,
    bodyTag: bodyTag
  };

})();
