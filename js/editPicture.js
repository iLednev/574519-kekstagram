'use strict';

(function () {
  var openEditPicture = function () {
    editPictureOverlay.classList.remove('hidden');
    document.addEventListener('keydown', onEditPictureEscPress);
  };

  var closeEditPicture = function () {
    editPictureOverlay.classList.add('hidden');
    window.uploadFile.uploadFileInput.value = null;
    document.removeEventListener('keydown', onEditPictureEscPress);
  };

  var onEditPictureOverlayClick = function (evt) {
    if (evt.target.classList.contains('img-upload__overlay') && !document.activeElement.classList.contains('effect-level__pin')) {
      closeEditPicture();
    }
  };

  var onEditPictureEscPress = function (evt) {
    if (evt.code === 'Escape' && !document.activeElement.classList.contains('text__hashtags') && !document.activeElement.classList.contains('text__description')) {
      closeEditPicture();
    }
  };

  var closeEditPictureButton = document.querySelector('#upload-cancel');
  var pictureContainer = document.querySelector('.img-upload__preview');
  var editPictureElement = pictureContainer.querySelector('img');
  var editPictureOverlay = document.querySelector('.img-upload__overlay');

  editPictureOverlay.addEventListener('click', onEditPictureOverlayClick);
  closeEditPictureButton.addEventListener('click', closeEditPicture);

  window.editPicture = {
    editPictureElement: editPictureElement,
    openEditPicture: openEditPicture
  };
})();
