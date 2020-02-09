'use strict';

(function () {
  var AMOUNT_PHOTOS = 25;
  var PHOTO_MIN_LIKE = 15;
  var PHOTO_MAX_LIKE = 200;
  var COMMENT_MIN_AVATAR_URL = 1;
  var COMMENT_MAX_AVATAR_URL = 6;
  var photoDescriptions = [
    'Кажется, что-то пролетело. Это мой отпуск.',
    'По догоре на пляж!',
    'Наша первая встреча с дикими животными.',
    'Здоровое питание - прекрасное самочувствие!'
  ];
  var commentNames = [
    'Коко',
    'Лулу',
    'Гучи',
    'Кузя',
    'Пушок'
  ];
  var commentMessages = [
    'Всё отлично!',
    'В целом всё неплохо. Но не всё.',
    'Когда вы делаете фотографию, хорошо бы убирать палец из кадра. В конце концов это просто непрофессионально.',
    'Моя бабушка случайно чихнула с фотоаппаратом в руках и у неё получилась фотография лучше.',
    'Я поскользнулся на банановой кожуре и уронил фотоаппарат на кота и у меня получилась фотография лучше.',
    'Лица у людей на фотке перекошены, как будто их избивают. Как можно было поймать такой неудачный момент?!'
  ];
  var templatePost = document.querySelector('#picture')
    .content
    .querySelector('.picture');
  var similarListPosts = document.querySelector('.pictures');

  var getRandomIndex = function (array) {
    return Math.floor(Math.random() * array.length);
  };

  var getRandomElement = function (array) {
    return array[getRandomIndex(array)];
  };

  var getRandomNumber = function (min, max) {
    return Math.floor((Math.random() * (max - min)) + min);
  };

  var createPosts = function (amount) {
    var posts = [];

    for (var i = 1; i <= amount; i++) {
      posts.push(createPost(i));
    }
    return posts;
  };

  var createPost = function (index) {
    var postPhoto = 'photos/' + index + '.jpg';
    var postDescription = getRandomElement(photoDescriptions);
    var postLike = getRandomNumber(PHOTO_MIN_LIKE, PHOTO_MAX_LIKE);
    var postComments = [
      {
        avatar: 'img/avatar-' + getRandomNumber(COMMENT_MIN_AVATAR_URL, COMMENT_MAX_AVATAR_URL) + '.svg',
        message: getRandomElement(commentNames),
        name: getRandomElement(commentMessages)
      },
      {
        avatar: 'img/avatar-' + getRandomNumber(COMMENT_MIN_AVATAR_URL, COMMENT_MAX_AVATAR_URL) + '.svg',
        message: getRandomElement(commentNames),
        name: getRandomElement(commentMessages)
      },
      {
        avatar: 'img/avatar-' + getRandomNumber(COMMENT_MIN_AVATAR_URL, COMMENT_MAX_AVATAR_URL) + '.svg',
        message: getRandomElement(commentNames),
        name: getRandomElement(commentMessages)
      }
    ];
    return {
      url: postPhoto,
      descriptions: postDescription,
      likes: postLike,
      comments: postComments
    };
  };

  var createPostElement = function (post) {
    var postElement = templatePost.cloneNode(true);
    var postImg = postElement.querySelector('.picture__img');
    var postLikes = postElement.querySelector('.picture__likes');
    var postComments = postElement.querySelector('.picture__comments');
    postImg.src = post.url;
    postLikes.textContent = post.likes;
    postComments.textContent = getRandomIndex(post.comments) + 1;
    return postElement;
  };

  var renderPosts = function (posts) {
    var fragment = document.createDocumentFragment();

    for (var i = 0; i < posts.length; i++) {
      fragment.appendChild(createPostElement(posts[i]));
    }
    similarListPosts.appendChild(fragment);
  };

  renderPosts(createPosts(AMOUNT_PHOTOS));
})();
