'use strict';
(function () {

  // import window.utility: getRandomNumber, getRandomElement
  // export window.comments: createComments, renderComments

  var COMMENT_MIN_AVATAR_URL = 1;
  var COMMENT_MAX_AVATAR_URL = 6;
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
  var postCommentBlock = document.querySelector('.social__comments');
  var commentCount = document.querySelector('.social__comment-count');
  var commentLoadMore = document.querySelector('.comments-loader');

  commentCount.classList.add('hidden');
  commentLoadMore.classList.add('hidden');

  var createComment = function () {
    var commentAvatar = 'img/avatar-' + window.utility.getRandomNumber(COMMENT_MIN_AVATAR_URL, COMMENT_MAX_AVATAR_URL) + '.svg';
    var commentName = window.utility.getRandomElement(commentNames);
    var commentMessage = window.utility.getRandomElement(commentMessages);

    return {
      avatar: commentAvatar,
      name: commentName,
      message: commentMessage
    };
  };

  var createComments = function (amount) {
    var comments = [];

    for (var i = 1; i <= amount; i++) {
      comments.push(createComment());
    }
    return comments;
  };

  var createCommentElement = function (comment) {
    var commentElement = postCommentBlock.querySelector('.social__comment').cloneNode(true);
    var commentAvatar = commentElement.querySelector('.social__picture');
    var commentMessage = commentElement.querySelector('.social__text');

    commentAvatar.src = comment.avatar;
    commentAvatar.alt = comment.name;
    commentMessage.textContent = comment.message;

    return commentElement;
  };

  var renderComments = function (post) {
    var fragment = document.createDocumentFragment();

    for (var i = 0; i < post.comments.length; i++) {
      fragment.appendChild(createCommentElement(post.comments[i]));
    }

    for (var j = 0; j < postCommentBlock.childElementCount; j++) {
      if (postCommentBlock.childElementCount > 1) {
        postCommentBlock.firstChild.remove();
      }
    }
    postCommentBlock.replaceChild(fragment, postCommentBlock.querySelector('.social__comment'));
  };

  window.comments = {
    createComments: createComments,
    renderComments: renderComments
  };

})();
