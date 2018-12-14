'use strict';

var Code = {
  404: 'Извините, Кекс всё сожрал',
  500: 'Извините, Кекс уронил сервер'
};

(function () {
  var load = function (onLoad, onError) {
    var xhr = new XMLHttpRequest();

    xhr.responseType = 'json';

    xhr.addEventListener('load', function () {
      if (xhr.status === 200) {
        onLoad(xhr.response);
      } else {
        onError(Code[xhr.status]);
      }
    });

    xhr.addEventListener('error', function () {
      onError('Ошибка соединения с сервером');
    });

    xhr.addEventListener('timeout', function () {
      onError('Ответа нет, всё упало');
    });

    xhr.timeout = 4000;

    xhr.open('GET', 'https://js.dump.academy/kekstagram/data');
    xhr.send();
  };

  var upload = function (data, onLoad, onError) {
    var xhr = new XMLHttpRequest();
    xhr.responseType = 'json';

    xhr.addEventListener('load', function () {
      if (xhr.status === 200) {
        onLoad(xhr.response);
      } else {
        onError(Code[xhr.status]);
      }
    });

    xhr.addEventListener('error', function () {
      onError('Ошибка соединения с сервером');
    });

    xhr.addEventListener('timeout', function () {
      onError('Ответа нет, всё упало');
    });

    xhr.timeout = 3000;

    xhr.open('POST', 'https://js.dump.academy/kekstagram');
    xhr.send(data);
  };

  window.backend = {
    load: load,
    upload: upload
  };

})();
