'use strict';
(function () {

  // export window backend: функция получения данных с сервера load(callback)
  //        window backend: функция отправки данных на сервер upload(data, callback, callback)

  var URL = 'https://js.dump.academy/kekstagram/';
  var STATUS_OK = 200;
  var TIMEOUT_REQUEST = 10000;

  var doServerRequest = function (loadHandler, errorHandler) {
    var xhr = new XMLHttpRequest();
    xhr.responseType = 'json';
    xhr.timeout = TIMEOUT_REQUEST;

    var eventLoadXHRHandler = function () {
      if (xhr.status === STATUS_OK) {
        loadHandler(xhr.response);
      } else {
        throw new Error('Ошибка запроса данных ' + xhr.status);
      }
    };

    var eventErrorXHRHandler = function () {
      errorHandler();
    };

    var eventTimeoutXHRHandler = function () {
      errorHandler();
    };

    xhr.addEventListener('load', eventLoadXHRHandler);
    xhr.addEventListener('error', eventErrorXHRHandler);
    xhr.addEventListener('timeout', eventTimeoutXHRHandler);

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
