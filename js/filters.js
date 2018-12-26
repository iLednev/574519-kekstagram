'use strict';

var filtersElement = document.querySelector('.img-filters');
var filterButtons = document.querySelectorAll('.img-filters__button');
var fragment = document.createDocumentFragment();

/**
 * Добавляет обработчик событий, отвечающий за сортировку картинок при клике на фильтр
 * @param {array} data - массив объектов, загружаемый с сервера
 * @param {object} pictures - элемент, содержащий картинки
 */
var filtersListener = function (data, pictures) {
  filtersElement.addEventListener('click', function (evt) {
    var target = evt.target;
    var childs = pictures.querySelectorAll('.picture');

    if (target.classList.contains('img-filters__button')) {
      filterButtons.forEach(function (item) {
        item.classList.remove('img-filters__button--active');
      });
      target.classList.add('img-filters__button--active');

      var currentFilter = data;

      childs.forEach(function (item) {
        item.remove();
      });

      if (target.id === 'filter-popular') {
        currentFilter = data;
      } else if (target.id === 'filter-new') {
        currentFilter = filterNew(data);
      } else if (target.id === 'filter-discussed') {
        currentFilter = filterDiscussed(data);
      }

      currentFilter.forEach(function (item) {
        window.pictures.render(item, fragment);
      });

      window.setTimeout(function () {
        pictures.appendChild(fragment);
      }, 500);
    }
  });
};

/**
 * Сортирует картинки по убыванию количества комментариев
 * @param {array} arr - массив объектов, подвергаемый сортировке
 * @return {array} - отсортированный массив
 */
var filterDiscussed = function (arr) {
  var cloneArr = arr.slice();
  return cloneArr.sort(function (a, b) {
    return b.comments.length - a.comments.length;
  });
};

/**
 * Сортирует массив случайным образом и оставляет в нём не больше 10 картинок
 * @param {array} arr - массив объектов, подвергаемый сортировке
 * @return {array} - отсортированный массив
 */
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
  listener: filtersListener,
  element: filtersElement
};
