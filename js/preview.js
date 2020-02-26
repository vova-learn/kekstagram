'use strict';
(function () {

  // import window.utility: bodyTag, ESCAPE, ENTER
  //        window.comments: renderComments

  var postsPreview = document.querySelectorAll('.picture');
  var postModal = document.querySelector('.big-picture');
  var postModalClose = postModal.querySelector('.big-picture__cancel');

  var setDataPost = function (post) {
    var postPhoto = postModal.querySelector('.big-picture__img img');
    var postLikes = postModal.querySelector('.likes-count');
    var postComments = postModal.querySelector('.comments-count');
    var postDesctiption = postModal.querySelector('.social__caption');

    postPhoto.src = post.url;
    postLikes.textContent = post.likes;
    postComments.textContent = post.comments.length;
    postDesctiption.textContent = post.descriptions;
    window.comments.renderComments(post);
  };

  var hiddenPostModal = function () {
    postModal.classList.add('hidden');
    window.utility.bodyTag.classList.remove('modal-open');
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
        window.utility.bodyTag.classList.add('modal-open');
      }
    }
  };

  var postPreviewClick = function (post) {
    post.addEventListener('click', function (evt) {
      if (evt.target.tagName.toLowerCase() === 'img') {
        var imgSrc = evt.target.getAttribute('src');
        showPostModal(window.gallery.posts, imgSrc);
      }
    });
  };

  var postPreviewKeydown = function (post) {
    post.addEventListener('keydown', function (evt) {
      if (evt.keyCode === window.utility.ENTER) {
        var imgSrc = evt.target.querySelector('img').getAttribute('src');
        showPostModal(window.gallery.posts, imgSrc);
      }
    });
  };

  for (var i = 0; i < postsPreview.length; i++) {
    postPreviewClick(postsPreview[i]);
    postPreviewKeydown(postsPreview[i]);
  }

})();
