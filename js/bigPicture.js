'use strict';

(function () {
  var COMMENTS__AMOUNT = 5;

  var BigPicture = function (data) {
    this.state = {
      counter: 1
    };

    this.open = function () {
      bigPictureElement.classList.remove('hidden');
      commentsLoader.addEventListener('click', this.loadComments.bind(this));
      document.addEventListener('keydown', this.onBigPictureEscPress.bind(this));
      bigPictureElement.addEventListener('click', this.onOverlayClick.bind(this));
      bigPictureCancel.addEventListener('click', this.close);
      this.render();
    };

    this.close = function () {
      bigPictureElement.classList.add('hidden');
      window.pictures.body.classList.remove('modal-open');
      commentsLoader.removeEventListener('click', this.loadComments);
      document.removeEventListener('keydown', this.onBigPictureEscPress);
      bigPictureElement.removeEventListener('click', this.onOverlayClick);
      bigPictureCancel.removeEventListener('click', this.close);

      commentsLoader.classList.remove('hidden');
      commentsElement.innerHTML = '';
    };

    this.onBigPictureEscPress = function (evt) {
      if (evt.code === 'Escape') {
        this.close();
      }
    };

    this.onOverlayClick = function (evt) {
      if (evt.target.classList.contains('big-picture')) {
        this.close();
      }
    };

    this.getComment = function (comment) {
      var node = document.querySelector('#comment').content.querySelector('.social__comment').cloneNode(true);

      var commentImage = node.querySelector('.social__picture');
      var commentText = node.querySelector('.social__text');

      commentImage.src = comment.avatar;
      commentText.textContent = comment.message;

      return node;
    };

    this.renderComments = function () {
      var getComment = this.getComment;

      data.comments.slice((this.state.counter - 1) * COMMENTS__AMOUNT, this.state.counter * COMMENTS__AMOUNT).forEach(function (item) {
        commentsElement.appendChild(getComment(item));
      });
    };

    this.loadComments = function () {
      if ((this.state.counter + 1) * COMMENTS__AMOUNT >= data.comments.length) {
        commentsLoader.classList.add('hidden');
      }

      this.state.counter++;
      this.renderComments();
    };

    this.render = function () {
      description.textContent = data.description;
      bigPictureImage.src = data.url;
      likesCount.textContent = data.likes;
      commentsCount.textContent = data.comments.length;
      this.renderComments();
    };
  };

  var bigPictureElement = document.querySelector('.big-picture');
  var bigPictureImage = bigPictureElement.querySelector('.big-picture__img img');
  var bigPictureCancel = bigPictureElement.querySelector('.big-picture__cancel');
  var likesCount = bigPictureElement.querySelector('.likes-count');
  var description = bigPictureElement.querySelector('.social__caption');
  var commentsCount = bigPictureElement.querySelector('.comments-count');
  var commentsElement = bigPictureElement.querySelector('.social__comments');
  var commentsLoader = bigPictureElement.querySelector('.comments-loader');
  // var currentCommentsCount = bigPictureElement.querySelector('.current-comment-count');

  window.bigPicture = {
    Open: BigPicture
  };
})();
