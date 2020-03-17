'use strict';
(function () {

  // export window gallery: функция возращает полученные данные с сервера getDataPosts
  // import window backend: используем функцию load(callback)
  //        window utility: используем функцию debounce(callback) для устранения эффеткта дребежжания

  var MAX_POSTS = 25;
  var RANDOM_POSTS = 10;

  var dataPosts;
  var activeFilter = 'img-filters__button--active';
  var inactiveFilter = 'img-filters--inactive';

  var similarListPosts = document.querySelector('.pictures');
  var templatePost = document.querySelector('#picture')
    .content
    .querySelector('.picture');
  var filterBlock = document.querySelector('.img-filters');
  var filterButtons = filterBlock.querySelectorAll('.img-filters__button');
  var defaultButton = filterBlock.querySelector('#filter-default');
  var randomButton = filterBlock.querySelector('#filter-random');
  var discussedButton = filterBlock.querySelector('#filter-discussed');

  var createPostElement = function (post) {
    var clonePost = templatePost.cloneNode(true);
    var postImg = clonePost.querySelector('.picture__img');
    var postLikes = clonePost.querySelector('.picture__likes');
    var postComments = clonePost.querySelector('.picture__comments');
    postImg.src = post.url;
    postLikes.textContent = post.likes;
    postComments.textContent = post.comments.length;

    return clonePost;
  };

  var getRandomIndexPosts = function (posts) {
    return Math.floor(Math.random() * posts.length);
  };

  var clearPosts = function (evt) {
    var pictures = document.querySelectorAll('.picture');
    pictures.forEach(function (picture) {
      picture.remove();
    });

    filterButtons.forEach(function (button) {
      if (button === evt.target && !button.classList.contains(activeFilter)) {
        button.classList.add(activeFilter);
      } else if (button !== evt.target && button.classList.contains(activeFilter)) {
        button.classList.remove(activeFilter);
      }
    });
  };

  var renderPosts = function (posts) {
    var fragment = document.createDocumentFragment();

    for (var i = 0; i < MAX_POSTS; i++) {
      fragment.appendChild(createPostElement(posts[i]));
    }
    similarListPosts.appendChild(fragment);
  };

  var renderRandomPosts = function (posts) {
    var fragment = document.createDocumentFragment();
    var copyPosts = posts.slice();

    for (var i = 0; i < RANDOM_POSTS; i++) {
      var indexPost = getRandomIndexPosts(copyPosts);
      fragment.appendChild(createPostElement(copyPosts[indexPost]));
      copyPosts.splice(indexPost, 1);
    }
    similarListPosts.appendChild(fragment);
  };

  var renderDiscussedPosts = function (posts) {
    var copyPosts = posts.slice();

    copyPosts.sort(function (activePost, nextPost) {
      return nextPost.comments.length - activePost.comments.length;
    });
    renderPosts(copyPosts);
  };

  filterBlock.addEventListener('click', function (evt) {
    if (evt.target === randomButton) {
      debouncePosts(renderRandomPosts, evt);
    } else if (evt.target === discussedButton) {
      debouncePosts(renderDiscussedPosts, evt);
    } else if (evt.target === defaultButton) {
      debouncePosts(renderPosts, evt);
    }
  });

  var debouncePosts = window.utility.debounce(function (postRenderHandler, evt) {
    clearPosts(evt);
    postRenderHandler(dataPosts);
  });

  var getServerData = function (data) {
    if (data) {
      renderPosts(data);
      filterBlock.classList.remove(inactiveFilter);
    }
    dataPosts = data;
  };

  var getDataPosts = function () {
    return dataPosts;
  };

  window.backend.load(getServerData);

  window.gallery = {
    getDataPosts: getDataPosts
  };

})();
