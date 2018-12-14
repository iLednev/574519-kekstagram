'use strict';

var onPinMouseDown = function (evt) {
  var coordX = evt.clientX;

  var calculateCoords = function (parentEvt, callback) {
    var shift = coordX - parentEvt.clientX;
    coordX = parentEvt.clientX;

    callback(shift);
  };

  var onPinMouseMove = function (moveEvt) {
    evt.preventDefault();
    calculateCoords(moveEvt, window.editPictureEffects.changePinPosition);
  };

  var onPinMouseUp = function (upEvt) {
    calculateCoords(upEvt, window.editPictureEffects.changePinPosition);

    document.removeEventListener('mousemove', onPinMouseMove);
    document.removeEventListener('mouseup', onPinMouseUp);
  };

  document.addEventListener('mousemove', onPinMouseMove);
  document.addEventListener('mouseup', onPinMouseUp);
};

window.editPictureEffects.levelPin.addEventListener('mousedown', onPinMouseDown);
