'use strict';

(function () {
  var openBigPicture = function () {
    bigPictureElement.classList.remove('hidden');
    document.addEventListener('keydown', onBigPictureEscPress);
  };

  var closeBigPicture = function () {
    bigPictureElement.classList.add('hidden');
    document.removeEventListener('keydown', onBigPictureEscPress);
  };

  var onOverlayClick = function (evt) {
    if (evt.target.classList.contains('big-picture')) {
      closeBigPicture();
    }
  };

  var onBigPictureEscPress = function (evt) {
    if (evt.code === 'Escape') {
      closeBigPicture();
    }
  };

  var addBigPicture = function (bigPhoto) {
    commentsElement.innerHTML = '';
    openBigPicture();
    var commentItems = [];

    description.textContent = bigPhoto.description;
    bigPictureImage.src = bigPhoto.url;
    likesCount.textContent = bigPhoto.likes;
    commentsCount.textContent = bigPhoto.comments.length;

    for (var i = 0; i < bigPhoto.comments.length; i++) {
      commentItems[i] = comment.cloneNode(true);
      var commentImage = commentItems[i].querySelector('.social__picture');
      var commentText = commentItems[i].querySelector('.social__text');
      commentImage.src = bigPhoto.comments[i].avatar;
      commentText.textContent = bigPhoto.comments[i].message;
      if (i < 5) {
        commentsElement.appendChild(commentItems[i]);
      }
    }

    commentsLoader.addEventListener('click', function () {
      // debugger;
      var startCount = commentsElement.childNodes.length;

      for (i = startCount; i <= startCount + 4; i++) {
        commentsElement.appendChild(commentItems[i]);
      }
    });

  };

  var bigPictureElement = document.querySelector('.big-picture');
  var bigPictureImage = bigPictureElement.querySelector('.big-picture__img img');
  var bigPictureCancel = bigPictureElement.querySelector('.big-picture__cancel');
  var likesCount = bigPictureElement.querySelector('.likes-count');
  var description = bigPictureElement.querySelector('.social__caption');
  var commentsCount = bigPictureElement.querySelector('.comments-count');
  var commentsElement = bigPictureElement.querySelector('.social__comments');
  var comment = bigPictureElement.querySelector('.social__comment').cloneNode(true);
  var commentsLoader = bigPictureElement.querySelector('.comments-loader');

  bigPictureElement.addEventListener('click', onOverlayClick);

  bigPictureCancel.addEventListener('click', closeBigPicture);

  window.bigPicture = {
    add: addBigPicture
  };
})();
