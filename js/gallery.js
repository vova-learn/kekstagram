'use strict';
(function () {

  // export window.gallery: getDataPosts();
  // import window.backend: load(callback);

  var dataPosts;
  var similarListPosts = document.querySelector('.pictures');
  var templatePost = document.querySelector('#picture')
    .content
    .querySelector('.picture');

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

  var getServerData = function (data) {
    renderPosts(data);
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
