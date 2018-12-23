'use strict';

(function () {
  /**
   * Наполняет элемент bigPicture принятыми данными - картинкой, комментариями, лайками и т.д.
   * Выводит только первые 5 комментариев.
   * @param {object} bigPhoto - объект с информацией и адресом картинки, которая будет добавлена
   */
  var addBigPicture = function (bigPhoto) {
    /**
     * Открывает bigPicture
     */
    var openBigPicture = function () {
      bigPictureElement.classList.remove('hidden');
      document.addEventListener('keydown', onBigPictureEscPress);
      bigPictureElement.addEventListener('click', onOverlayClick);
      bigPictureCancel.addEventListener('click', closeBigPicture);
    };

    /**
     * Закрывает bigPicture
     */
    var closeBigPicture = function () {
      bigPictureElement.classList.add('hidden');
      commentsLoader.removeEventListener('click', onCommentsLoaderClick);
      document.removeEventListener('keydown', onBigPictureEscPress);
      bigPictureElement.removeEventListener('click', onOverlayClick);
      bigPictureCancel.removeEventListener('click', closeBigPicture);
    };

    /**
     * @callback
     * Закрывает bigPicture по клику на оверлей
     * @param {object} evt - передаётся автоматически, объект с данными о событии
     */
    var onOverlayClick = function (evt) {
      if (evt.target.classList.contains('big-picture')) {
        closeBigPicture();
      }
    };

    /**
     * @callback
     * Закрывает bigPicture по нажатию на Escape
     * @param {object} evt - передаётся автоматически, объект с данными о событии
     */
    var onBigPictureEscPress = function (evt) {
      if (evt.code === 'Escape') {
        closeBigPicture();
      }
    };

    var commentItems = [];
    commentsLoader.classList.remove('hidden');
    commentsElement.innerHTML = '';
    openBigPicture();

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
    currentCommentsCount.textContent = commentsElement.childNodes.length;

    if (commentItems.length === commentsElement.childNodes.length) {
      commentsLoader.classList.add('hidden');
    }

    /**
     * @callback
     * Подгружает следующие 5 комментариев при нажатии на commentsLoader
     */
    var onCommentsLoaderClick = function () {
      var startCount = commentsElement.childNodes.length;
      var remainder = commentItems.length - startCount;
      var count = remainder >= 5 ? 5 : remainder;
      for (i = startCount; i < startCount + count; i++) {
        commentsElement.appendChild(commentItems[i]);
      }
      if (commentItems.length === commentsElement.childNodes.length) {
        commentsLoader.classList.add('hidden');
      }
      currentCommentsCount.textContent = commentsElement.childNodes.length;
    };
    commentsLoader.addEventListener('click', onCommentsLoaderClick);
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
  var currentCommentsCount = bigPictureElement.querySelector('.current-comment-count');

  window.bigPicture = {
    add: addBigPicture
  };
})();
