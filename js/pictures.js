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
  effectLevelValue.value = pinCoords;
  effectLevelPin.style.left = pinCoords + '%';
  effectLevelDepth.style.width = pinCoords + '%';
  if (picture.classList.contains('effects__preview--chrome')) {
    picture.style.filter = 'grayscale(' + pinCoords / 100 + ')';
  } else if (picture.classList.contains('effects__preview--sepia')) {
    picture.style.filter = 'sepia(' + pinCoords / 100 + ')';
  } else if (picture.classList.contains('effects__preview--marvin')) {
    picture.style.filter = 'invert(' + pinCoords + '%)';
  } else if (picture.classList.contains('effects__preview--phobos')) {
    picture.style.filter = 'blur(' + pinCoords * 3 / 100 + 'px)';
  } else if (picture.classList.contains('effects__preview--heat')) {
    picture.style.filter = 'brightness(' + pinCoords * 2 / 100 + 1 + ')';
  } else {
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

var onBigPictureEscPress = function (evt) {
  if (evt.code === 'Escape') {
    closeBigPicture();
  }
};

var onEditPictureEscPress = function (evt) {
  if (evt.code === 'Escape') {
    closeEditPicture();
  }
};

var onPhotoClick = function (index) {
  mainPicturesList[index].addEventListener('click', function () {
    addBigPicture(photos[index]);
  });
};

var onEffectClick = function (index) {
  effectsPreview[index].addEventListener('click', function () {
    if (index === 0) {
      pictureEffectSlider.classList.add('hidden');
    } else if (index !== 0 && pictureEffectSlider.classList.contains('hidden')) {
      pictureEffectSlider.classList.remove('hidden');
    }
    picture.classList = '';
    picture.classList.add(effects[index]);
    changeEffectLevel();
  });
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
      description: getRandomDescription()
    });
  }
  return photos;
};

var createElements = function (index) {
  var picture = pictureElement.cloneNode(true);
  picture.querySelector('.picture__img').src = photos[index].imageUrl;
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
var closeEditPictureButton = document.querySelector('#upload-cancel');
var effectLevelValue = document.querySelector('.effect-level__value');
var effectLevelPin = document.querySelector('.effect-level__pin');
var effects = [
  'effects__preview--none',
  'effects__preview--chrome',
  'effects__preview--sepia',
  'effects__preview--marvin',
  'effects__preview--phobos',
  'effects__preview--heat'
];
var effectsPreview = document.querySelectorAll('.effects__preview');
var pictureContainer = document.querySelector('.img-upload__preview');
var picture = pictureContainer.querySelector('img');
var pictureEffectSlider = document.querySelector('.img-upload__effect-level');
var scaleControlValue = document.querySelector('.scale__control--value');
var scaleControlSmaller = document.querySelector('.scale__control--smaller');
var scaleControlBigger = document.querySelector('.scale__control--bigger');
var scaleValue = 100;
var effectLevelDepth = document.querySelector('.effect-level__depth');

addElements();
var mainPicturesList = document.querySelectorAll('.picture__img');

for (var i = 0; i < photos.length; i++) {
  onPhotoClick(i);
}

bigPictureCancel.addEventListener('click', function () {
  closeBigPicture();
});

uploadFile.addEventListener('change', function () {
  scaleValue = 100;
  picture.style.transform = 'scale(' + scaleValue / 100 + ')';
  scaleControlValue.value = scaleValue + '%';
  openEditPicture();
});

scaleControlBigger.addEventListener('click', function () {
  scaleValue += 25;
  if (scaleValue > 100) {
    scaleValue = 100;
  }
  picture.style.transform = 'scale(' + scaleValue / 100 + ')';
  scaleControlValue.value = scaleValue + '%';
});

scaleControlSmaller.addEventListener('click', function () {
  scaleValue -= 25;
  if (scaleValue < 0) {
    scaleValue = 0;
  }
  picture.style.transform = 'scale(' + scaleValue / 100 + ')';
  scaleControlValue.value = scaleValue + '%';
});

pictureEffectSlider.classList.add('hidden');

for (i = 0; i < effects.length; i++) {
  onEffectClick(i);
}

effectLevelPin.addEventListener('mouseup', function () {
  changeEffectLevel();
});

closeEditPictureButton.addEventListener('click', function () {
  closeEditPicture();
});
