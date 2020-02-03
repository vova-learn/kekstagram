'use strict';

(function () {

  var countCreateImageElements = 25;
  var minLikes = 15;
  var maxLikes = 200;
  var minCommentsAvatar = 1;
  var maxCommentsAvatar = 6;

  var imageDescriptions = ['Сколько слов должно быть в заголовке', 'Классное фото без фотошопа? Я научу!', 'Беги, Форест!', 'Только одна из пяти женщин помнит об…', 'Срочно удаляйте свой браузер!'];
  var commentsMessages = ['Всё отлично!', 'В целом всё неплохо. Но не всё.', 'Когда вы делаете фотографию, хорошо бы убирать палец из кадра. В конце концов это просто непрофессионально.', 'Моя бабушка случайно чихнула с фотоаппаратом в руках и у неё получилась фотография лучше.', 'Я поскользнулся на банановой кожуре и уронил фотоаппарат на кота и у меня получилась фотография лучше.',  'Лица у людей на фотке перекошены, как будто их избивают. Как можно было поймать такой неудачный момент?!'];
  var commentsNames = ['@leomesssi', '@tailorswift', '@miesthecat', '@kendalljennner', '@kevinhartNoreal'];

  // создаём массив для выбора случайного числа
  var createArray = function (counter) {
    var arr = [];
    for (var i = 1; i <= counter; i++) {
      arr.push(i);
    }
    return arr;
  };

  var srcImgs = createArray(countCreateImageElements);

  // функция min max случайного числа
  var getRandomNumber = function (min, max) {
    return Math.floor((Math.random() * (max - min)) + min);
  };

  // функция случайного числа из массива
  var getRandomIndex = function (arr) {
    return Math.floor(Math.random() * arr.length);
  };

  // функция генерации объекта
  var createPictureObject = function () {
    var picture = {};
    var randomIndex = getRandomIndex(srcImgs);
    picture.url = 'photos/' + srcImgs[randomIndex] + '.jpg';
    srcImgs.splice(randomIndex, 1);
    picture.descriptions = imageDescriptions[getRandomIndex(imageDescriptions)];
    picture.likes = getRandomNumber(minLikes, maxLikes);
    picture.comments = [
      {
        avatar: 'img/avatar-' + getRandomNumber(minCommentsAvatar, maxCommentsAvatar) + '.svg',
        message: commentsMessages[getRandomIndex(commentsMessages)],
        name: commentsNames[getRandomIndex(commentsNames)]
      },
      {
        avatar: 'img/avatar-' + getRandomNumber(minCommentsAvatar, maxCommentsAvatar) + '.svg',
        message: commentsMessages[getRandomIndex(commentsMessages)],
        name: commentsNames[getRandomIndex(commentsNames)]
      }
    ];
    return picture;
  };

  // функция создания общего массива объектов
  var createPictures = function (count) {
    var pictures = [];
    for (var i = 0; i < count; i++) {
      pictures.push(createPictureObject());
    }
    return pictures;
  };

  // получаем фрагмент
  var pictureTemplate = document.querySelector('#picture')
    .content
    .querySelector('.picture');

  // получаем элемент для вставки фрагмента
  var similarListPictures = document.querySelector('.pictures');

  // функция формирования элемента картинки
  var renderPicture = function (picture) {
    var pictureElement = pictureTemplate.cloneNode(true);
    var pictureImg = pictureElement.querySelector('.picture__img');
    var pictureLikes = pictureElement.querySelector('.picture__likes');
    var pictureComments = pictureElement.querySelector('.picture__comments');
    pictureImg.src = picture.url;
    pictureLikes.textContent = picture.likes;
    pictureComments.textContent = picture.comments.length;
    return pictureElement;
  };

  // функция-цикл вставки всех картинок
  var renderPictures = function (pictures) {
    var fragment = document.createDocumentFragment();

    for (var i = 0; i < pictures.length; i++) {
      fragment.appendChild(renderPicture(pictures[i]));
    }
    similarListPictures.appendChild(fragment);
  };

  var pictures = createPictures(countCreateImageElements);
  renderPictures(pictures);

})();
