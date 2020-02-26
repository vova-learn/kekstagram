'use strict';
(function () {

  // import window.utility: getRandomElement, getRandomNumber
  //        window.comments: createComments
  // export window.gallery: posts

  var AMOUNT_PHOTOS = 25;
  var PHOTO_MIN_LIKE = 15;
  var PHOTO_MAX_LIKE = 200;
  var COMMENTS_MIN_AMOUNT = 1;
  var COMMENTS_MAX_AMOUNT = 3;
  var photoDescriptions = [
    'Кажется, что-то пролетело. Это мой отпуск.',
    'По догоре на пляж!',
    'Наша первая встреча с дикими животными.',
    'Здоровое питание - прекрасное самочувствие!'
  ];

  var templatePost = document.querySelector('#picture')
    .content
    .querySelector('.picture');
  var similarListPosts = document.querySelector('.pictures');

  var createPosts = function (amount) {
    var posts = [];

    for (var i = 1; i <= amount; i++) {
      posts.push(createPost(i));
    }
    return posts;
  };

  var createPost = function (index) {
    var postPhoto = 'photos/' + index + '.jpg';
    var postDescription = window.utility.getRandomElement(photoDescriptions);
    var postLike = window.utility.getRandomNumber(PHOTO_MIN_LIKE, PHOTO_MAX_LIKE);
    var commentsAmount = window.utility.getRandomNumber(COMMENTS_MIN_AMOUNT, COMMENTS_MAX_AMOUNT);
    var postComments = window.comments.createComments(commentsAmount);

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
    postComments.textContent = post.comments.length;

    return postElement;
  };

  var renderPosts = function (posts) {
    var fragment = document.createDocumentFragment();

    for (var i = 0; i < posts.length; i++) {
      fragment.appendChild(createPostElement(posts[i]));
    }
    similarListPosts.appendChild(fragment);
  };

  var posts = createPosts(AMOUNT_PHOTOS);
  renderPosts(posts);

  window.gallery = {
    posts: posts
  };

})();
