'use strict';
(function () {

  // export window.backend: load(callback);

  var URL = 'https://js.dump.academy/kekstagram/';
  var STATUS_OK = 200;
  var TIMEOUT_REQUEST = 10000;

  var doServerRequest = function (loadHandler, errorHandler) {
    var xhr = new XMLHttpRequest();
    xhr.responseType = 'json';
    xhr.timeout = TIMEOUT_REQUEST;

    var eventLoadXHRHandler = function () {
      if (this.status === STATUS_OK) {
        loadHandler(this.response);
      } else {
        throw new Error('Ошибка запроса данных ' + this.status);
      }
    };

    var eventErrorXHRHandler = function () {
      errorHandler();
    };

    xhr.addEventListener('load', eventLoadXHRHandler);
    xhr.addEventListener('error', eventErrorXHRHandler);
    xhr.addEventListener('timeout', eventErrorXHRHandler);

    return xhr;
  };

  var load = function (loadHandler) {
    var xhr = doServerRequest(loadHandler);
    xhr.open('GET', URL + 'data');
    xhr.send();
  };

  var upload = function (dataForm, loadHandler, errorHandler) {
    var xhr = doServerRequest(loadHandler, errorHandler);
    xhr.open('POST', URL);
    xhr.send(dataForm);
  };

  window.backend = {
    load: load,
    upload: upload
  };

})();
