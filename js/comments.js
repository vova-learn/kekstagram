'use strict';
(function () {

  // export window.comments: renderComments()

  var STEP_OPEN_COMMENTS = 5;

  var postCommentBlock = document.querySelector('.social__comments');
  var commentCount = document.querySelector('.social__comment-count');
  var commentLoadMore = document.querySelector('.social__comments-loader');

  var createCommentElement = function (comment) {
    var commentElement = postCommentBlock.querySelector('.social__comment').cloneNode(true);
    var commentAvatar = commentElement.querySelector('.social__picture');
    var commentMessage = commentElement.querySelector('.social__text');

    commentAvatar.src = comment.avatar;
    commentAvatar.alt = comment.name;
    commentMessage.textContent = comment.message;

    return commentElement;
  };

  var renderComments = function (comments) {
    // создаём фрагмент комментария
    var fragment = document.createDocumentFragment();
    // общее количество комментариев для данного поста
    var quantityComments = comments.length;
    // открываем кнопку «еще», если она была скрыта
    if (commentLoadMore.classList.contains('hidden')) {
      commentLoadMore.classList.remove('hidden');
    }
    // если общее количество комментариев > заданного количества для отображения,
    // то указываем и рендерим минимальное количество комментариев,
    // иначе рендерим все комментарии и скрываем кнопку «еще»
    if (quantityComments > STEP_OPEN_COMMENTS) {
      for (var i = 0; i < STEP_OPEN_COMMENTS; i++) {
        commentCount.firstChild.textContent = STEP_OPEN_COMMENTS + ' из ';
        fragment.appendChild(createCommentElement(comments[i]));
      }
    } else {
      for (var j = 0; j < quantityComments; j++) {
        commentCount.firstChild.textContent = quantityComments + ' из ';
        fragment.appendChild(createCommentElement(comments[j]));
        commentLoadMore.classList.add('hidden');
      }
    }
    // действие по клику на кнопку «еще»
    commentLoadMore.addEventListener('click', function () {
      // общее количество видимых комментариев
      var quantityOpenComments = postCommentBlock.children.length;
      // сколько комментариев будет открыто
      var openComments;
      // проверям сколько еще нужно открыть комментариев
      if (quantityComments <= quantityOpenComments + STEP_OPEN_COMMENTS) {
        openComments = quantityComments;
        commentLoadMore.classList.add('hidden');
      } else {
        openComments = quantityOpenComments + STEP_OPEN_COMMENTS;
      }
      // рендерим порцию комментариев
      for (var i = quantityOpenComments; i < openComments && i < quantityComments; i++) {
        postCommentBlock.appendChild(createCommentElement(comments[i]));
      }
      // показываем сколько комментариев открыто
      commentCount.firstChild.textContent = openComments + ' из ';
    });
    // очищаем комментарии для следующего открытия
    postCommentBlock.textContent = '';
    // вставляем фрагмент в блок с комментариями
    postCommentBlock.appendChild(fragment);
  };

  window.comments = {
    renderComments: renderComments
  };

})();
