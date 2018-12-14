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
    while (commentsList.firstChild) {
      commentsList.removeChild(commentsList.firstChild);
    }
    openBigPicture();
    var commentItem = [];

    description.textContent = bigPhoto.description;
    bigPictureImage.src = bigPhoto.url;
    likesCount.textContent = bigPhoto.likes;
    commentsCount.textContent = bigPhoto.comments.length;
    if (commentsContainer.contains(commentsElement)) {
      commentsContainer.replaceChild(commentsList, commentsElement);
    }

    for (var i = 0; i < bigPhoto.comments.length; i++) {
      commentItem[i] = comment.cloneNode(true);
      var commentImage = commentItem[i].querySelector('.social__picture');
      var commentText = commentItem[i].querySelector('.social__text');
      commentImage.src = bigPhoto.comments[i].avatar;
      commentText.textContent = bigPhoto.comments[i].message;
      commentsList.appendChild(commentItem[i]);
    }
  };

  var bigPictureElement = document.querySelector('.big-picture');
  var bigPictureImage = bigPictureElement.querySelector('.big-picture__img img');
  var bigPictureCancel = bigPictureElement.querySelector('.big-picture__cancel');
  var likesCount = bigPictureElement.querySelector('.likes-count');
  var commentsContainer = bigPictureElement.querySelector('.big-picture__social');
  var description = bigPictureElement.querySelector('.social__caption');
  var commentsCount = bigPictureElement.querySelector('.comments-count');
  var commentsElement = bigPictureElement.querySelector('.social__comments');
  var commentsList = commentsElement.cloneNode();
  var comment = bigPictureElement.querySelector('.social__comment').cloneNode(true);

  bigPictureElement.addEventListener('click', onOverlayClick);

  bigPictureCancel.addEventListener('click', closeBigPicture);

  window.bigPicture = {
    add: addBigPicture
  };
})();
