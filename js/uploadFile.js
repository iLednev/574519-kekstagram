'use strict';

(function () {
  var onUploadFileChange = function () {
    window.editPictureScale.scaleValue = 100;
    window.editPicture.editPictureElement.style.transform = 'scale(' + window.editPictureScale.scaleValue / 100 + ')';
    window.editPictureScale.scaleControlValue.value = window.editPictureScale.scaleValue + '%';
    window.editPicture.openEditPicture();
  };

  var uploadFileInput = document.querySelector('#upload-file');

  uploadFileInput.addEventListener('change', onUploadFileChange);

  window.uploadFile = {
    uploadFileInput: uploadFileInput
  };
})();
