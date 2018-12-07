'use strict';

(function () {
  var PHOTOS_COUNT = 25;
  var MIN_LIKES_COUNT = 15;
  var MAX_LIKES_COUNT = 200;
  var MIN_COMMENTS_COUNT = 1;
  var MAX_COMMENTS_COUNT = 4;
  var FIRST_AVATAR_NUMBER = 1;
  var LAST_AVATAR_NUMBER = 7;
  var DEFAULT_EFFECT_VALUE = 100;

  var getRandom = function (max, min) {
    min = min || 0;
    return Math.floor(Math.random() * (max - min) + min);
  };

  var getAvatarSource = function (lastNumber, firstNumber) {
    return 'img/avatar-' + getRandom(lastNumber, firstNumber) + '.svg';
  };

  window.utils = {
    getRandom: getRandom,
    getAvatarSource: getAvatarSource,
    PHOTOS_COUNT: PHOTOS_COUNT,
    MIN_LIKES_COUNT: MIN_LIKES_COUNT,
    MAX_LIKES_COUNT: MAX_LIKES_COUNT,
    MIN_COMMENTS_COUNT: MIN_COMMENTS_COUNT,
    MAX_COMMENTS_COUNT: MAX_COMMENTS_COUNT,
    FIRST_AVATAR_NUMBER: FIRST_AVATAR_NUMBER,
    LAST_AVATAR_NUMBER: LAST_AVATAR_NUMBER,
    DEFAULT_EFFECT_VALUE: DEFAULT_EFFECT_VALUE
  };
})();
