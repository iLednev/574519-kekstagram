'use strict';

(function () {
  var onHashtagsInput = function () {
    var hashtagsArray = hashtags.value.toLowerCase().split(' ');
    checkHashtags(hashtagsArray);
  };

  var checkHashtags = function (array) {
    var errors = 0;
    var repeats = 0;
    if (array.length > 5) {
      hashtags.setCustomValidity('Хэш-теги не должны содержать пробелы и их должно быть не больше пяти');
    } else if (array.length === 0 || array[0] === '') {
      hashtags.setCustomValidity('');
    } else {
      array.forEach(function (item, index) {
        if (array.includes(item, index + 1)) {
          repeats++;
        }
        if (item === '#') {
          hashtags.setCustomValidity('Хэш-тег не может состоять только из решётки');
          errors++;
        } else if (item[0] !== '#') {
          hashtags.setCustomValidity('Хэш-тег должен начинаться с решётки');
          errors++;
        } else if (item.includes('#', 1)) {
          hashtags.setCustomValidity('Хэш-теги должны разделяться пробелами');
          errors++;
        } else if (item.length > 20) {
          hashtags.setCustomValidity('Хэш-тег должен быть не длиннее 20 символов (вместе с решёткой)');
          errors++;
        } else if (repeats) {
          hashtags.setCustomValidity('Хэш-теги не должны повторяться');
          errors++;
        } else if (!errors) {
          hashtags.setCustomValidity('');
        }
      });
    }
  };

  var hashtags = document.querySelector('.text__hashtags');

  hashtags.addEventListener('input', onHashtagsInput);
})();
