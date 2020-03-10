'use strict';
(function () {

  // export window.backend: load(callback);

  var URL = 'https://js.dump.academy/kekstagram/data';
  var STATUS_OK = 200;
  var TIMEOUT_REQUEST = 10000;

  var doServerRequest = function (callback) {
    var xhr = new XMLHttpRequest();
    xhr.responseType = 'json';
    xhr.timeout = TIMEOUT_REQUEST;

    var eventLoadXHRHandler = function () {
      if (this.status === STATUS_OK) {
        callback(this.response);
      } else {
        throw new Error('Ошибка запроса данных ' + this.status);
      }
    };

    xhr.addEventListener('load', eventLoadXHRHandler);

    return xhr;
  };

  var load = function (callback) {
    var xhr = doServerRequest(callback);
    xhr.open('GET', URL);
    xhr.send();
  };

  window.backend = {
    load: load
  };

})();
