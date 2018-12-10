'use strict';

(function () {
  var onUploadFileChange = function () {
    openEditPicture();
  };

  var openEditPicture = function () {
    window.editPictureScale.resetToDefault();
    window.editPictureEffects.hideSlider();
    editPictureOverlay.classList.remove('hidden');
    document.addEventListener('keydown', onEditPictureEscPress);

  };

  var closeEditPicture = function () {
    editPictureOverlay.classList.add('hidden');
    uploadFileInput.value = null;
    editPictureElement.classList = '';
    editPictureElement.style.filter = '';
    document.removeEventListener('keydown', onEditPictureEscPress);
  };

  var onOverlayClick = function (evt) {
    if (evt.target.classList.contains('img-upload__overlay') && !document.activeElement.classList.contains('effect-level__pin')) {
      closeEditPicture();
    }
  };

  var onEditPictureEscPress = function (evt) {
    if (evt.code === 'Escape' && !document.activeElement.classList.contains('text__hashtags') && !document.activeElement.classList.contains('text__description')) {
      closeEditPicture();
    }
  };

  var uploadFileInput = document.querySelector('#upload-file');
  var closeButton = document.querySelector('#upload-cancel');
  var pictureContainer = document.querySelector('.img-upload__preview');
  var editPictureElement = pictureContainer.querySelector('img');
  var editPictureOverlay = document.querySelector('.img-upload__overlay');

  uploadFileInput.addEventListener('change', onUploadFileChange);
  editPictureOverlay.addEventListener('click', onOverlayClick);
  closeButton.addEventListener('click', closeEditPicture);

  window.editPicture = {
    element: editPictureElement
  };
})();
