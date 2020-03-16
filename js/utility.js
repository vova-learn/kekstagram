'use strict';
(function () {

  // export window.utility: var ESCAPE, var ENTER, debounce(cb);

  var ESC_KEY = 27;
  var ENTER_KEY = 13;
  var DEBOUNCE_INTERVAL = 500;

  var debounce = function (cb) {
    var lastTimeout = null;

    return function () {
      var parameters = arguments;
      if (lastTimeout) {
        window.clearTimeout(lastTimeout);
      }
      lastTimeout = window.setTimeout(function () {
        cb.apply(null, parameters);
      }, DEBOUNCE_INTERVAL);
    };
  };

  window.utility = {
    ESCAPE: ESC_KEY,
    ENTER: ENTER_KEY,
    debounce: debounce
  };

})();
