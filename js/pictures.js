'use strict';

var PHOTOS_COUNT = 25;
var MIN_LIKES_COUNT = 15;
var MAX_LIKES_COUNT = 200;
var MIN_COMMENTS_COUNT = 1;
var MAX_COMMENTS_COUNT = 4;
var FIRST_AVATAR_NUMBER = 1;
var LAST_AVATAR_NUMBER = 7;

var getRandom = function (max, min) {
  min = min || 0;
  return Math.floor(Math.random() * (max - min) + min);
};

var getAvatarSource = function (lastNumber, firstNumber) {
  return 'img/avatar-' + getRandom(lastNumber, firstNumber) + '.svg';
};

var changeEffectLevel = function () {
  var pinCoords = 100;
  effectLevelValue.setAttribute('value', pinCoords);
  effectLevelPin.style.left = pinCoords + '%';
  effectLevelDepth.style.width = pinCoords + '%';
  switch (picture.className) {
    case 'effects__preview--chrome':
      picture.style.filter = 'grayscale(' + pinCoords / 100 + ')';
      break;
    case 'effects__preview--sepia':
      picture.style.filter = 'sepia(' + pinCoords / 100 + ')';
      break;
    case 'effects__preview--marvin':
      picture.style.filter = 'invert(' + pinCoords + '%)';
      break;
    case 'effects__preview--phobos':
      picture.style.filter = 'blur(' + pinCoords * 3 / 100 + 'px)';
      break;
    case 'effects__preview--heat':
      picture.style.filter = 'brightness(' + pinCoords * 2 / 100 + 1 + ')';
      break;
    default:
      picture.style.filter = '';
  }
};

var openBigPicture = function () {
  bigPicture.classList.remove('hidden');
  document.addEventListener('keydown', onBigPictureEscPress);
};

var closeBigPicture = function () {
  bigPicture.classList.add('hidden');
  document.removeEventListener('keydown', onBigPictureEscPress);
};

var openEditPicture = function () {
  editPicture.classList.remove('hidden');
  document.addEventListener('keydown', onEditPictureEscPress);
};

var closeEditPicture = function () {
  editPicture.classList.add('hidden');
  uploadFile.value = null;
  document.removeEventListener('keydown', onEditPictureEscPress);
};

var onBigPictureOverlayClick = function (evt) {
  if (evt.target === bigPicture) {
    closeBigPicture();
  }
};

var onBigPictureEscPress = function (evt) {
  if (evt.code === 'Escape') {
    closeBigPicture();
  }
};

var onUploadFileChange = function () {
  scaleValue = 100;
  picture.style.transform = 'scale(' + scaleValue / 100 + ')';
  scaleControlValue.value = scaleValue + '%';
  openEditPicture();
};

var onEditPictureOverlayClick = function (evt) {
  if (evt.target === editPicture) {
    closeEditPicture();
  }
};

var onEditPictureEscPress = function (evt) {
  if (evt.code === 'Escape' && document.activeElement !== hashtags && document.activeElement !== photoDescription) {
    closeEditPicture();
  }
};

var onEffectsListClick = function (evt) {
  var effectTarget = evt.target;

  if (effectTarget.id === 'effect-none') {
    pictureEffectSlider.classList.add('hidden');
  } else if (effectTarget.id === 'effect-none' !== 0 && pictureEffectSlider.classList.contains('hidden')) {
    pictureEffectSlider.classList.remove('hidden');
  }

  if (effectTarget.classList.contains('effects__radio')) {
    picture.classList = '';
    picture.classList.add(effects[effectTarget.id]);
    changeEffectLevel();
  }
};

var onScaleControlBiggerClick = function () {
  scaleValue += 25;
  if (scaleValue > 100) {
    scaleValue = 100;
  }
  picture.style.transform = 'scale(' + scaleValue / 100 + ')';
  scaleControlValue.value = scaleValue + '%';
};

var onScaleControlSmallerClick = function () {
  scaleValue -= 25;
  if (scaleValue < 0) {
    scaleValue = 0;
  }
  picture.style.transform = 'scale(' + scaleValue / 100 + ')';
  scaleControlValue.value = scaleValue + '%';
};

var onHashtagsInput = function () {
  var hashtagsArray = hashtags.value.toLowerCase().split(' ');
  var errors = 0;
  var repeats = 0;
  if (hashtagsArray.length > 5) {
    hashtags.setCustomValidity('Хэш-теги не должны содержать пробелы и их должно быть не больше пяти');
  } else if (hashtagsArray.length === 0 || hashtagsArray[0] === '') {
    hashtags.setCustomValidity('');
  } else {
    hashtagsArray.forEach(function (item, index) {
      if (hashtagsArray.includes(item, index + 1)) {
        repeats++;
      }
      if (item === '#') {
        hashtags.setCustomValidity('Хэш-тег не может состоять только из решётки');
        errors++;
      } else if (item[0] !== '#') {
        hashtags.setCustomValidity('Хэш-тег должен начинаться с решётки');
        errors++;
      } else if (item.includes('#', 1)) {
        hashtags.setCustomValidity('Хэш-теги должны разделяться пробелами');
        errors++;
      } else if (item.length > 20) {
        hashtags.setCustomValidity('Хэш-тег должен быть не длиннее 20 символов (вместе с решёткой)');
        errors++;
      } else if (repeats) {
        hashtags.setCustomValidity('Хэш-теги не должны повторяться');
        errors++;
      } else if (!errors) {
        hashtags.setCustomValidity('');
      }
    });
  }
};

var onPicturesClick = function (evt) {
  var target = evt.target;
  if (target.classList.contains('picture__img')) {
    addBigPicture(photos[target.id]);
  }
};

// ------------------------------------------------------------------------------- //


var getRandomComments = function (times) {
  var comments = [
    'Всё отлично!',
    'В целом всё неплохо. Но не всё.',
    'Когда вы делаете фотографию, хорошо бы убирать палец из кадра. В конце концов это просто непрофессионально.',
    'Моя бабушка случайно чихнула с фотоаппаратом в руках и у неё получилась фотография лучше.',
    'Я поскользнулся на банановой кожуре и уронил фотоаппарат на кота и у меня получилась фотография лучше.',
    'Лица у людей на фотке перекошены, как будто их избивают. Как можно было поймать такой неудачный момент?!'
  ];

  var commentsArray = [];
  for (var i = 0; i < times; i++) {
    var string = comments[getRandom(comments.length)];

    if (getRandom()) {
      var secondString = comments[getRandom(comments.length)];
      string += ' ' + secondString;
    }
    commentsArray.push(string);
  }
  return commentsArray;
};

var getRandomDescription = function () {
  var descriptions = [
    'Тестим новую камеру!',
    'Затусили с друзьями на море',
    'Как же круто тут кормят',
    'Отдыхаем...',
    'Цените каждое мгновенье. Цените тех, кто рядом с вами и отгоняйте все сомненья. Не обижайте всех словами......',
    'Вот это тачка!'
  ];

  return descriptions[getRandom(descriptions.length)];
};

var createPhoto = function () {
  var photos = [];
  for (var i = 1; i <= PHOTOS_COUNT; i++) {
    photos.push({
      imageUrl: 'photos/' + i + '.jpg',
      likes: getRandom(MAX_LIKES_COUNT, MIN_LIKES_COUNT),
      comments: getRandomComments(getRandom(MAX_COMMENTS_COUNT, MIN_COMMENTS_COUNT)),
      description: getRandomDescription(),
      id: i - 1
    });
  }
  return photos;
};

var createElements = function (index) {
  var picture = pictureElement.cloneNode(true);
  picture.querySelector('.picture__img').src = photos[index].imageUrl;
  picture.querySelector('.picture__img').id = photos[index].id;
  picture.querySelector('.picture__comments').textContent = photos[index].comments.length;
  picture.querySelector('.picture__likes').textContent = photos[index].likes;
  return picture;
};

var addElements = function () {
  for (var i = 0; i < PHOTOS_COUNT; i++) {
    fragment.appendChild(createElements(i));
  }
  pictures.appendChild(fragment);
};

var addBigPicture = function (bigPhoto) {
  while (commentsList.firstChild) {
    commentsList.removeChild(commentsList.firstChild);
  }
  openBigPicture();
  var commentItem = [];

  descriptionAvatar.src = getAvatarSource(FIRST_AVATAR_NUMBER, LAST_AVATAR_NUMBER);
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
    commentImage.src = getAvatarSource(FIRST_AVATAR_NUMBER, LAST_AVATAR_NUMBER);
    commentText.textContent = bigPhoto.comments[i];
    commentsList.appendChild(commentItem[i]);
  }
};

var photos = createPhoto();

var pictureElement = document.querySelector('#picture').content.querySelector('.picture');
var pictures = document.querySelector('.pictures');
var fragment = document.createDocumentFragment();
var bigPicture = document.querySelector('.big-picture');
var bigPictureImage = bigPicture.querySelector('.big-picture__img img');
var bigPictureCancel = bigPicture.querySelector('.big-picture__cancel');
var likesCount = bigPicture.querySelector('.likes-count');

var descriptionAvatar = bigPicture.querySelector('.social__picture');
var description = bigPicture.querySelector('.social__caption');

var commentsContainer = bigPicture.querySelector('.big-picture__social');
var commentsCount = bigPicture.querySelector('.comments-count');
var commentsElement = bigPicture.querySelector('.social__comments');
var commentsList = commentsElement.cloneNode();
var comment = bigPicture.querySelector('.social__comment').cloneNode(true);
var uploadFile = document.querySelector('#upload-file');
var editPicture = document.querySelector('.img-upload__overlay');
var hashtags = document.querySelector('.text__hashtags');
var photoDescription = document.querySelector('.text__description');
var closeEditPictureButton = document.querySelector('#upload-cancel');

var effectsList = document.querySelector('.effects__list');
var effectLevelValue = document.querySelector('.effect-level__value');
var effectLevelPin = document.querySelector('.effect-level__pin');

var pictureContainer = document.querySelector('.img-upload__preview');
var picture = pictureContainer.querySelector('img');
var pictureEffectSlider = document.querySelector('.img-upload__effect-level');
var scaleControlValue = document.querySelector('.scale__control--value');
var scaleControlSmaller = document.querySelector('.scale__control--smaller');
var scaleControlBigger = document.querySelector('.scale__control--bigger');
var scaleValue = 100;
var effectLevelDepth = document.querySelector('.effect-level__depth');

var effects = {
  'effect-none': 'effects__preview--none',
  'effect-chrome': 'effects__preview--chrome',
  'effect-sepia': 'effects__preview--sepia',
  'effect-marvin': 'effects__preview--marvin',
  'effect-phobos': 'effects__preview--phobos',
  'effect-heat': 'effects__preview--heat'
};

addElements();

pictures.addEventListener('click', onPicturesClick);

bigPicture.addEventListener('click', onBigPictureOverlayClick);

bigPictureCancel.addEventListener('click', closeBigPicture);

uploadFile.addEventListener('change', onUploadFileChange);

scaleControlBigger.addEventListener('click', onScaleControlBiggerClick);

scaleControlSmaller.addEventListener('click', onScaleControlSmallerClick);

pictureEffectSlider.classList.add('hidden');

effectsList.addEventListener('click', onEffectsListClick);

effectLevelPin.addEventListener('mouseup', changeEffectLevel);

editPicture.addEventListener('click', onEditPictureOverlayClick);

closeEditPictureButton.addEventListener('click', closeEditPicture);

hashtags.addEventListener('input', onHashtagsInput);
