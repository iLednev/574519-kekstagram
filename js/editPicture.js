'use strict';

(function () {
  var onUploadFileChange = function () {
    openEditPicture();
  };

  var onCLoseButtonClick = function () {
    closeEditPicture();
    uploadForm.reset();
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

  var openErrorElement = function () {
    main.appendChild(errorElement);
    document.removeEventListener('keydown', onEditPictureEscPress);
    document.addEventListener('keydown', onErrorElementEscPress);
  };

  var closeErrorElement = function () {
    main.removeChild(errorElement);
    document.removeEventListener('keydown', onErrorElementEscPress);
    document.addEventListener('keydown', onEditPictureEscPress);
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

  var onFormLoad = function () {
    main.appendChild(successElement);
    closeEditPicture();
    uploadForm.reset();
  };

  var onFormError = function (message) {
    openErrorElement();
    errorElement.querySelector('.error__title').textContent = message;
  };

  var onFormSubmit = function (evt) {
    evt.preventDefault();
    window.backend.upload(new FormData(uploadForm), onFormLoad, onFormError);
  };

  var onSuccessButtonClick = function () {
    main.removeChild(successElement);
  };

  var onErrorRepeatClick = function () {
    closeErrorElement();
  };

  var onErrorAnotherFileClick = function () {
    closeEditPicture();
    uploadForm.reset();
    closeErrorElement();
  };

  var onErrorElementOverlayClick = function (evt) {
    if (evt.target.classList.contains('error')) {
      closeErrorElement();
    }
  };

  var onErrorElementEscPress = function (evt) {
    if (evt.code === 'Escape') {
      closeErrorElement();
    }
  };

  var uploadFileInput = document.querySelector('#upload-file');
  var closeButton = document.querySelector('#upload-cancel');
  var pictureContainer = document.querySelector('.img-upload__preview');
  var editPictureElement = pictureContainer.querySelector('img');
  var editPictureOverlay = document.querySelector('.img-upload__overlay');
  var uploadForm = document.querySelector('.img-upload__form');

  var successElement = document.querySelector('#success').content.querySelector('.success');
  var successButton = successElement.querySelector('.success__button');

  var errorElement = document.querySelector('#error').content.querySelector('.error');
  var errorRepeat = errorElement.querySelector('.js-repeat');
  var errorAnotherFile = errorElement.querySelector('.js-another');
  var main = document.querySelector('main');

  uploadFileInput.addEventListener('change', onUploadFileChange);
  editPictureOverlay.addEventListener('click', onOverlayClick);
  closeButton.addEventListener('click', onCLoseButtonClick);

  successButton.addEventListener('click', onSuccessButtonClick);

  window.editPicture = {
    element: editPictureElement
  };

  uploadForm.addEventListener('submit', onFormSubmit);
  errorRepeat.addEventListener('click', onErrorRepeatClick);
  errorAnotherFile.addEventListener('click', onErrorAnotherFileClick);
  errorElement.addEventListener('click', onErrorElementOverlayClick);
})();
