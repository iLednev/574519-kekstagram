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

  var onBigPictureOverlayClick = function (evt) {
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

    descriptionAvatar.src = window.utils.getAvatarSource(window.utils.FIRST_AVATAR_NUMBER, window.utils.LAST_AVATAR_NUMBER);
    description.textContent = bigPhoto.description;
    bigPictureImage.src = bigPhoto.imageUrl;
    likesCount.textContent = bigPhoto.likes;
    commentsCount.textContent = bigPhoto.comments.length;
    if (commentsContainer.contains(commentsElement)) {
      commentsContainer.replaceChild(commentsList, commentsElement);
    }

    for (var i = 0; i < bigPhoto.comments.length; i++) {
      commentItem[i] = comment.cloneNode(true);
      var commentImage = commentItem[i].querySelector('.social__picture');
      var commentText = commentItem[i].querySelector('.social__text');
      commentImage.src = window.utils.getAvatarSource(window.utils.FIRST_AVATAR_NUMBER, window.utils.LAST_AVATAR_NUMBER);
      commentText.textContent = bigPhoto.comments[i];
      commentsList.appendChild(commentItem[i]);
    }
  };

  var bigPictureElement = document.querySelector('.big-picture');
  var bigPictureImage = bigPictureElement.querySelector('.big-picture__img img');
  var bigPictureCancel = bigPictureElement.querySelector('.big-picture__cancel');
  var likesCount = bigPictureElement.querySelector('.likes-count');
  var commentsContainer = bigPictureElement.querySelector('.big-picture__social');
  var descriptionAvatar = bigPictureElement.querySelector('.social__picture');
  var description = bigPictureElement.querySelector('.social__caption');
  var commentsCount = bigPictureElement.querySelector('.comments-count');
  var commentsElement = bigPictureElement.querySelector('.social__comments');
  var commentsList = commentsElement.cloneNode();
  var comment = bigPictureElement.querySelector('.social__comment').cloneNode(true);

  bigPictureElement.addEventListener('click', onBigPictureOverlayClick);

  bigPictureCancel.addEventListener('click', closeBigPicture);

  window.bigPicture = {
    addBigPicture: addBigPicture
  };
})();
