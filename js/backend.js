'use strict';

(function () {
  var TIMEOUT = 3000;

  /**
   * Получает изображения с сервера
   * @param {function} onLoad - функция, вызываемая в случае успешной загрузки данных с сервера
   * @param {function} onError - функция, вызываемя в случае ошибки
   */
  var load = function (onLoad, onError) {
    var xhr = new XMLHttpRequest();

    xhr.responseType = 'json';

    xhr.addEventListener('load', function () {
      if (xhr.status === CodeStatus.OK) {
        onLoad(xhr.response);
      } else {
        onError(CodeValue[xhr.status]);
      }
    });

    xhr.addEventListener('error', function () {
      onError('Ошибка соединения с сервером');
    });

    xhr.addEventListener('timeout', function () {
      onError('Ответа нет, всё упало');
    });

    xhr.timeout = TIMEOUT;

    xhr.open('GET', 'https://js.dump.academy/kekstagram/data');
    xhr.send();
  };

  /**
   * Отправляет данные формы на сервер
   * @param {function} data - данные формы, отправляемые на сервер
   * @param {function} onLoad - функция, вызываемая в случае успешной загрузки данных с сервера
   * @param {function} onError - функция, вызываемя в случае ошибки
   */
  var upload = function (data, onLoad, onError) {
    var xhr = new XMLHttpRequest();
    xhr.responseType = 'json';

    xhr.addEventListener('load', function () {
      if (xhr.status === CodeStatus.OK) {
        onLoad(xhr.response);
      } else {
        onError(CodeValue[xhr.status]);
      }
    });

    xhr.addEventListener('error', function () {
      onError('Ошибка соединения с сервером');
    });

    xhr.addEventListener('timeout', function () {
      onError('Ответа нет, всё упало');
    });

    xhr.timeout = TIMEOUT;

    xhr.open('POST', 'https://js.dump.academy/kekstagram');
    xhr.send(data);
  };

  var CodeStatus = {
    OK: 200,
    BAD_REQUEST: 400,
    NOT_FOUND: 404,
    INTERNAL_ERROR: 500
  };

  var CodeValue = {
    400: 'Это не тот файл',
    404: 'Извините, Кекс всё сожрал',
    500: 'Извините, Кекс уронил сервер'
  };

  window.backend = {
    load: load,
    upload: upload
  };

})();
