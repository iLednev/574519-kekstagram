'use strict';

(function () {
  var COMMENTS__AMOUNT = 5;

  var BigPicture = function (data) {
    this.loadComments = function () {
      if ((++this.state.counter + 1) * COMMENTS__AMOUNT >= data.comments.length) {
        commentsLoader.classList.add('hidden');
      }
      this.renderComments();
    };

    this.onContainerClick = function (evt) {
      if (evt.target.classList.contains('big-picture')) {
        this.close();
      }
    };

    this.onPictureEscPress = function (evt) {
      if (evt.code === 'Escape') {
        this.close();
      }
    };

    this.open = function () {
      bigPictureContainer.classList.remove('hidden');
      window.pictures.body.classList.add('modal-open');
      commentsLoader.addEventListener('click', this.state.onCommentsLoaderClick);
      document.addEventListener('keydown', this.state.onBigPictureEscPress);
      bigPictureContainer.addEventListener('click', this.state.onOverlayClick);
      bigPictureCancel.addEventListener('click', this.state.close);
      this.render();
    };

    this.close = function () {
      bigPictureContainer.classList.add('hidden');
      commentsContainer.innerHTML = '';
      window.pictures.body.classList.remove('modal-open');
      commentsLoader.removeEventListener('click', this.state.onCommentsLoaderClick);
      document.removeEventListener('keydown', this.state.onBigPictureEscPress);
      bigPictureContainer.removeEventListener('click', this.state.onOverlayClick);
      commentsLoader.classList.remove('hidden');
      bigPictureCancel.removeEventListener('click', this.state.close);
    };

    this.state = {
      counter: 0,
      onOverlayClick: this.onContainerClick.bind(this),
      onCommentsLoaderClick: this.loadComments.bind(this),
      onBigPictureEscPress: this.onPictureEscPress.bind(this),
      close: this.close.bind(this)
    };


    this.getComment = function (comment) {
      var node = commentNode.cloneNode(true);

      var commentImage = node.querySelector('.social__picture');
      var commentText = node.querySelector('.social__text');

      commentImage.src = comment.avatar;
      commentText.textContent = comment.message;

      return node;
    };

    this.renderComments = function () {
      var getComment = this.getComment;

      data.comments.slice(this.state.counter * COMMENTS__AMOUNT, (this.state.counter + 1) * COMMENTS__AMOUNT).forEach(function (item) {
        commentsContainer.appendChild(getComment(item));
      });
      currentCommentsCount.textContent = commentsContainer.children.length;
    };

    this.render = function () {
      description.textContent = data.description;
      bigPictureImage.src = data.url;
      likesCount.textContent = data.likes;
      commentsCount.textContent = data.comments.length;
      this.renderComments();
    };
  };

  var bigPictureContainer = document.querySelector('.big-picture');
  var bigPictureImage = bigPictureContainer.querySelector('.big-picture__img img');
  var bigPictureCancel = bigPictureContainer.querySelector('.big-picture__cancel');
  var likesCount = bigPictureContainer.querySelector('.likes-count');
  var description = bigPictureContainer.querySelector('.social__caption');
  var commentNode = document.querySelector('#comment').content.querySelector('.social__comment');
  var commentsCount = bigPictureContainer.querySelector('.comments-count');
  var commentsContainer = bigPictureContainer.querySelector('.social__comments');
  var commentsLoader = bigPictureContainer.querySelector('.comments-loader');
  var currentCommentsCount = bigPictureContainer.querySelector('.current-comment-count');

  window.bigPicture = {
    container: bigPictureContainer,
    Open: BigPicture
  };
})();
