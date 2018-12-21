'use strict';

var filtersElement = document.querySelector('.img-filters');
var filterButtons = document.querySelectorAll('.img-filters__button');
var fragment = document.createDocumentFragment();

var sss = function (data, pictures) {
  filtersElement.addEventListener('click', function (evt) {
    var target = evt.target;
    var childs = pictures.querySelectorAll('.picture');

    if (target.classList.contains('img-filters__button')) {
      filterButtons.forEach(function (item) {
        item.classList.remove('img-filters__button--active');
      });
      target.classList.add('img-filters__button--active');

      var filtersMap = {
        'filter-popular': data,
        'filter-new': filterNew(data),
        'filter-discussed': filterDiscussed(data)
      };

      childs.forEach(function (item) {
        item.remove();
      });

      filtersMap[target.id].forEach(function (item) {
        window.elementss(item, fragment);
      });
      pictures.appendChild(fragment);
    }
  });
};

var filterDiscussed = function (arr) {
  var cloneArr = arr.slice();
  return cloneArr.sort(function (a, b) {
    return b.comments.length - a.comments.length;
  });
};

var filterNew = function (arr) {
  var cloneArr = arr.slice();
  cloneArr.sort(function () {
    return Math.floor(Math.random() * (2 + 1)) - 1;
  });
  if (cloneArr.length > 10) {
    cloneArr.splice(10);
  }
  return cloneArr;
};

window.filters = {
  sss: sss,
  element: filtersElement
};
