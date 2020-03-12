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
      commentCount.firstChild.textContent = STEP_OPEN_COMMENTS + ' из ';
      for (var i = 0; i < STEP_OPEN_COMMENTS; i++) {
        fragment.appendChild(createCommentElement(comments[i]));
      }
    } else {
      commentCount.firstChild.textContent = quantityComments + ' из ';
      commentLoadMore.classList.add('hidden');
      for (var j = 0; j < quantityComments; j++) {
        fragment.appendChild(createCommentElement(comments[j]));
      }
    }
    // слушатель для кнопки «еще»
    var commentLoadMoreHandler = function () {
      // общее количество видимых комментариев
      var quantityOpenComments = postCommentBlock.children.length;
      // сколько комментариев будет открыто
      var openComments;
      // проверям сколько еще нужно открыть комментариев
      if (quantityComments <= quantityOpenComments + STEP_OPEN_COMMENTS) {
        openComments = quantityComments;
        commentLoadMore.classList.add('hidden');
        commentLoadMore.removeEventListener('click', commentLoadMoreHandler);
      } else {
        openComments = quantityOpenComments + STEP_OPEN_COMMENTS;
      }
      // рендерим порцию комментариев
      for (var n = quantityOpenComments; n < openComments; n++) {
        fragment.appendChild(createCommentElement(comments[n]));
      }
      postCommentBlock.appendChild(fragment);
      // показываем сколько комментариев открыто
      commentCount.firstChild.textContent = openComments + ' из ';
    };
    // действие по клику на кнопку «еще»
    commentLoadMore.addEventListener('click', commentLoadMoreHandler);
    // очищаем комментарии для следующего открытия
    postCommentBlock.textContent = '';
    // вставляем фрагмент в блок с комментариями
    postCommentBlock.appendChild(fragment);
  };

  window.comments = {
    renderComments: renderComments
  };

})();
