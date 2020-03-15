'use strict';
(function () {

  // import window.utility: var ESCAPE, var ENTER;
  //        window.comments: renderComments();
  //        window.gallery: getDataPosts();

  var bodyTag = document.querySelector('body');
  var postsPreview = document.querySelector('.pictures');
  var postModal = document.querySelector('.big-picture');
  var postModalClose = postModal.querySelector('.big-picture__cancel');

  var setDataPost = function (post) {
    var postPhoto = postModal.querySelector('.big-picture__img img');
    var postLikes = postModal.querySelector('.likes-count');
    var postComments = postModal.querySelector('.comments-count');
    var postDescription = postModal.querySelector('.social__caption');

    postPhoto.src = post.url;
    postLikes.textContent = post.likes;
    postComments.textContent = post.comments.length;
    postDescription.textContent = post.descriptions;
    window.comments.renderComments(post.comments);
  };

  var hiddenPostModal = function () {
    postModal.classList.add('hidden');
    bodyTag.classList.remove('modal-open');
  };

  postModalClose.addEventListener('click', function () {
    hiddenPostModal();
  });

  document.addEventListener('keydown', function (evt) {
    var openPostModal = document.querySelector('.big-picture').classList.contains('hidden');
    if (evt.keyCode === window.utility.ESCAPE && !openPostModal) {
      hiddenPostModal();
    }
  });

  var showPostModal = function (postsGenerate, imgSrc) {
    for (var i = 0; i < postsGenerate.length; i++) {
      if (imgSrc === postsGenerate[i].url) {
        setDataPost(postsGenerate[i]);
        postModal.classList.remove('hidden');
        bodyTag.classList.add('modal-open');
        break;
      }
    }
  };

  var postPreviewClickHandler = function (evt) {
    if (evt.target.tagName.toLowerCase() === 'img') {
      var imgSrc = evt.target.getAttribute('src');
      showPostModal(window.gallery.getDataPosts(), imgSrc);
    }
  };


  var postPreviewKeydownHandler = function (evt) {
    if (evt.keyCode === window.utility.ENTER) {
      var imgSrc = evt.target.querySelector('img').getAttribute('src');
      showPostModal(window.gallery.getDataPosts(), imgSrc);
    }
  };

  postsPreview.addEventListener('click', postPreviewClickHandler);
  postsPreview.addEventListener('keydown', postPreviewKeydownHandler);

})();
