'use strict';
(function () {

  // export window.backend: load(callback)

  var URL = 'https://js.dump.academy/kekstagram/data';
  var STATUS_OK = 200;
  var TIMEOUT_REQUEST = 10000;

  var serverRequest = function (getResponse) {
    var xhr = new XMLHttpRequest();
    xhr.responseType = 'json';
    xhr.timeout = TIMEOUT_REQUEST;

    xhr.addEventListener('load', function () {
      switch (xhr.status) {
        case STATUS_OK:
          getResponse(xhr.response);
          break;
        default:
          throw new Error('Ошибка запроса данных ' + xhr.status);
      }
    });
    return xhr;
  };

  var load = function (getResponse) {
    var xhr = serverRequest(getResponse);
    xhr.open('GET', URL);
    xhr.send();
  };

  window.backend = {
    load: load
  };

})();
