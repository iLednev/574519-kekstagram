'use strict';

/**
 * Изменяет положение ползунка
 * @param {number} shift - смещение ползунка sliderPin относительно предыдущей позиции
 */
var changePinPosition = function (shift) {
  sliderPin.style.left = (sliderPin.offsetLeft - shift) + 'px';

  if (sliderPin.offsetLeft < 0) {
    sliderPin.style.left = 0;
  } else if (sliderPin.offsetLeft > sliderLine.offsetWidth) {
    sliderPin.style.left = sliderLine.offsetWidth + 'px';
  }
  window.editPictureEffects.changeEffectLevel();
};

/**
 * @callback
 * По нажатию на sliderPin запоминает его положение, по перемещению мыши
 * высчитывает новое положение ползунка и перемещает его
 * @param {object} evt - передаётся автоматически, объект с данными о событии
 */
var onPinMouseDown = function (evt) {
  var coordX = evt.clientX;

  var calculateCoords = function (parentEvt, callback) {
    var shift = coordX - parentEvt.clientX;
    coordX = parentEvt.clientX;

    callback(shift);
  };

  var onPinMouseMove = function (moveEvt) {
    evt.preventDefault();
    calculateCoords(moveEvt, changePinPosition);
  };

  var onPinMouseUp = function (upEvt) {
    calculateCoords(upEvt, changePinPosition);

    document.removeEventListener('mousemove', onPinMouseMove);
    document.removeEventListener('mouseup', onPinMouseUp);
  };

  document.addEventListener('mousemove', onPinMouseMove);
  document.addEventListener('mouseup', onPinMouseUp);
};

var sliderLine = document.querySelector('.effect-level__line');
var sliderPin = document.querySelector('.effect-level__pin');

sliderPin.addEventListener('mousedown', onPinMouseDown);

window.slider = {
  pin: sliderPin,
  line: sliderLine
};
