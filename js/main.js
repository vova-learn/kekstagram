'use strict';

(function () {
  var ESC_KEY = 27;
  var ENTER_KEY = 13;

  var AMOUNT_PHOTOS = 25;
  var PHOTO_MIN_LIKE = 15;
  var PHOTO_MAX_LIKE = 200;
  var COMMENT_MIN_AVATAR_URL = 1;
  var COMMENT_MAX_AVATAR_URL = 6;
  var COMMENTS_MIN_AMOUNT = 1;
  var COMMENTS_MAX_AMOUNT = 3;
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
    return Math.round((Math.random() * (max - min)) + min);
  };

  var createComment = function () {
    var commentAvatar = 'img/avatar-' + getRandomNumber(COMMENT_MIN_AVATAR_URL, COMMENT_MAX_AVATAR_URL) + '.svg';
    var commentName = getRandomElement(commentNames);
    var commentMessage = getRandomElement(commentMessages);

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
    var commentsAmount = getRandomNumber(COMMENTS_MIN_AMOUNT, COMMENTS_MAX_AMOUNT);
    var postComments = createComments(commentsAmount);

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

  var bodyTag = document.querySelector('body');
  var postModal = document.querySelector('.big-picture');
  var postCommentBlock = postModal.querySelector('.social__comments');
  var commentCount = postModal.querySelector('.social__comment-count');
  var commentLoadMore = postModal.querySelector('.comments-loader');

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

  var setDataPost = function (post) {
    var postPhoto = postModal.querySelector('.big-picture__img img');
    var postLikes = postModal.querySelector('.likes-count');
    var postComments = postModal.querySelector('.comments-count');
    var postDesctiption = postModal.querySelector('.social__caption');

    postPhoto.src = post.url;
    postLikes.textContent = post.likes;
    postComments.textContent = post.comments.length;
    postDesctiption.textContent = post.descriptions;
    renderComments(post);
  };

  // Для того, чтобы открыть окно поста нужно:
  // в postModal удалить hidden и в body добавить modal-open

  commentCount.classList.add('hidden');
  commentLoadMore.classList.add('hidden');

  // Для принудительного показа поста выззвать функцию setDataPost с аргументом posts[От 0 до 25]

  // ---------- MODULE4-TASK2 ----------

  var uploadFile = document.querySelector('#upload-file');
  var modalPhotoModification = document.querySelector('.img-upload__overlay');
  var closeButton = modalPhotoModification.querySelector('#upload-cancel');
  var scaleControl = modalPhotoModification.querySelector('.scale');
  var scaleValue = scaleControl.querySelector('.scale__control--value');
  var scaleValuePlus = scaleControl.querySelector('.scale__control--bigger');
  var scaleValueMinus = scaleControl.querySelector('.scale__control--smaller');
  var photoPreview = modalPhotoModification.querySelector('.img-upload__preview img');
  var effectsButtons = modalPhotoModification.querySelectorAll('.effects__radio');
  var effectLevel = modalPhotoModification.querySelector('.effect-level');
  var effectLevelValue = effectLevel.querySelector('.effect-level__value');
  var levelControl = effectLevel.querySelector('.effect-level__pin');
  var hashtagInput = modalPhotoModification.querySelector('.text__hashtags');
  var commentInput = modalPhotoModification.querySelector('.text__description');

  var checkSpace = function (checkValue) {
    return checkValue !== '';
  };

  var checkHashtagInputHandler = function () {
    var hashtagInputValue = hashtagInput.value;
    var hashtags = hashtagInputValue.trim().toLowerCase().split(' ').filter(checkSpace);
    var removeSymbol = /[^a-zA-Zа-яА-Я0-9ё#]/g;

    var checkUpLowCase = function () {
      var checkCase;
      for (var j = 0; j < hashtags.length; j++) {
        if (hashtags[i] === hashtags[j] && j !== i) {
          checkCase = true;
        }
      }
      return checkCase;
    };

    var checkDoubleHash = function () {
      var checkHash;
      for (var j = 1; j < hashtags[i].length; j++) {
        if (hashtags[i][j] === '#') {
          checkHash = true;
        }
      }
      return checkHash;
    };

    for (var i = 0; i < hashtags.length; i++) {
      if (hashtags[i][0] !== '#') {
        hashtagInput.setCustomValidity('Хэш-тег должен начинаться с решётки (#)');
      } else if (hashtags[i].search(removeSymbol) > 0) {
        hashtagInput.setCustomValidity('После решётки (#) хэш-тег должен состоять только из букв и чисел');
      } else if (checkDoubleHash()) {
        hashtagInput.setCustomValidity('Может быть использована только одна решётка (#)');
      } else if (hashtags[i].length <= 1) {
        hashtagInput.setCustomValidity('Хеш-тег не может состоять только из одного символа');
      } else if (hashtags[i].length > 20) {
        hashtagInput.setCustomValidity('Хеш-тег не может быть длинее 20 символов');
      } else if (checkUpLowCase()) {
        hashtagInput.setCustomValidity('Один и тот же хэш-тег не может быть использован дважды без учёта регистра: #ХэшТег и #хэштег считаются одним и тем же тегом');
      } else if (hashtags.length > 5) {
        hashtagInput.setCustomValidity('Использование больше пяти хэш-тегов невозможно');
      } else {
        hashtagInput.setCustomValidity('');
      }
    }
  };

  hashtagInput.addEventListener('input', checkHashtagInputHandler);

  var checkLevelIntensityHandler = function () {
    var intensity = effectLevelValue.value;
    if (photoPreview.classList.contains('effects__preview--chrome')) {
      photoPreview.style.filter = 'grayscale(' + intensity / 100 + ')';
    } else if (photoPreview.classList.contains('effects__preview--sepia')) {
      photoPreview.style.filter = 'sepia(' + intensity / 100 + ')';
    } else if (photoPreview.classList.contains('effects__preview--marvin')) {
      photoPreview.style.filter = 'invert(' + intensity + '%)';
    } else if (photoPreview.classList.contains('effects__preview--phobos')) {
      photoPreview.style.filter = 'blur(' + 3 * intensity / 100 + 'px)';
    } else if (photoPreview.classList.contains('effects__preview--heat')) {
      photoPreview.style.filter = 'brightness(' + 3 * intensity / 100 + ')';
    }
  };

  levelControl.addEventListener('mouseup', checkLevelIntensityHandler);

  var checkSetAtribute = function (element, elements, atribute) {
    if (element.hasAttribute(atribute) !== true) {
      for (var i = 0; i < elements.length; i++) {
        elements[i].removeAttribute(atribute);
      }
      element.setAttribute(atribute, '');
    }
  };

  var checkClassEffect = function (element, atribute, img) {
    if (element.getAttribute(atribute) === 'effect-chrome') {
      img.removeAttribute('class');
      img.style.filter = '';
      img.classList.add('effects__preview--chrome');
    } else if (element.getAttribute(atribute) === 'effect-sepia') {
      img.removeAttribute('class');
      img.style.filter = '';
      img.classList.add('effects__preview--sepia');
    } else if (element.getAttribute(atribute) === 'effect-marvin') {
      img.removeAttribute('class');
      img.style.filter = '';
      img.classList.add('effects__preview--marvin');
    } else if (element.getAttribute(atribute) === 'effect-phobos') {
      img.removeAttribute('class');
      img.style.filter = '';
      img.classList.add('effects__preview--phobos');
    } else if (element.getAttribute(atribute) === 'effect-heat') {
      img.removeAttribute('class');
      img.style.filter = '';
      img.classList.add('effects__preview--heat');
    } else if (element.getAttribute(atribute) === 'effect-none') {
      img.removeAttribute('class');
      img.style.filter = '';
      img.classList.add('effects__preview--none');
    }
  };

  var addEffectClickHandler = function (effect, effectAll) {
    effect.addEventListener('click', function () {
      checkSetAtribute(effect, effectAll, 'checked');
      checkClassEffect(effect, 'id', photoPreview);
      if (effect.getAttribute('id') !== 'effect-none') {
        effectLevel.classList.remove('hidden');
      } else {
        effectLevel.classList.add('hidden');
      }
    });
  };

  (function (buttons) {
    for (var i = 0; i < buttons.length; i++) {
      addEffectClickHandler(buttons[i], buttons);
    }
  })(effectsButtons);


  var getScaleValue = function (value) {
    return parseInt(value, 10);
  };

  scaleControl.addEventListener('click', function (evt) {
    if (evt.target === scaleValuePlus) {
      if (getScaleValue(scaleValue.value) >= 0 && getScaleValue(scaleValue.value) < 25) {
        scaleValue.value = 25 + '%';
        photoPreview.style.transform = 'scale(0.25)';
      } else if (getScaleValue(scaleValue.value) >= 25 && getScaleValue(scaleValue.value) < 50) {
        scaleValue.value = 50 + '%';
        photoPreview.style.transform = 'scale(0.50)';
      } else if (getScaleValue(scaleValue.value) >= 50 && getScaleValue(scaleValue.value) < 75) {
        scaleValue.value = 75 + '%';
        photoPreview.style.transform = 'scale(0.75)';
      } else if (getScaleValue(scaleValue.value) >= 75 && getScaleValue(scaleValue.value) < 100) {
        scaleValue.value = 100 + '%';
        photoPreview.style.transform = 'scale(1)';
      }
    } else if (evt.target === scaleValueMinus) {
      if (getScaleValue(scaleValue.value) >= 0 && getScaleValue(scaleValue.value) <= 50) {
        scaleValue.value = 25 + '%';
        photoPreview.style.transform = 'scale(0.25)';
      } else if (getScaleValue(scaleValue.value) > 50 && getScaleValue(scaleValue.value) <= 75) {
        scaleValue.value = 50 + '%';
        photoPreview.style.transform = 'scale(0.50)';
      } else if (getScaleValue(scaleValue.value) > 75 && getScaleValue(scaleValue.value) <= 100) {
        scaleValue.value = 75 + '%';
        photoPreview.style.transform = 'scale(0.75)';
      }
    }
  });

  var modificationPhotoHandler = function () {
    modalPhotoModification.classList.remove('hidden');
    bodyTag.classList.add('modal-open');
    effectLevel.classList.add('hidden');
  };

  uploadFile.addEventListener('change', modificationPhotoHandler);

  var setDefaultSettings = function () {
    modalPhotoModification.classList.add('hidden');
    bodyTag.classList.remove('modal-open');
    checkSetAtribute(effectsButtons[0], effectsButtons, 'checked');
    photoPreview.removeAttribute('class');
    photoPreview.removeAttribute('style');
    uploadFile.value = '';
  };

  closeButton.addEventListener('click', function () {
    setDefaultSettings();
  });

  document.addEventListener('keydown', function (evt) {
    if (evt.keyCode === ESC_KEY && evt.target !== hashtagInput && evt.target !== commentInput) {
      setDefaultSettings();
    }
  });

  // ---------- MODULE4-TASK3 ----------

  var postsPreview = document.querySelectorAll('.picture');
  var postModalClose = postModal.querySelector('.big-picture__cancel');

  var hiddenPostModal = function () {
    postModal.classList.add('hidden');
    bodyTag.classList.remove('modal-open');
  };

  postModalClose.addEventListener('click', function () {
    hiddenPostModal();
  });

  document.addEventListener('keydown', function (evt) {
    var openPostModal = document.querySelector('.big-picture').classList.contains('hidden');
    if (evt.keyCode === ESC_KEY && !openPostModal) {
      hiddenPostModal();
    }
  });

  var showPostModal = function (posts, imgSrc) {
    for (var i = 0; i < posts.length; i++) {
      if (imgSrc === posts[i].url) {
        setDataPost(posts[i]);
        postModal.classList.remove('hidden');
        bodyTag.classList.add('modal-open');
      }
    }
  };

  var postPreviewClick = function (post) {
    post.addEventListener('click', function (evt) {
      if (evt.target.tagName.toLowerCase() === 'img') {
        var imgSrc = evt.target.getAttribute('src');
        showPostModal(posts, imgSrc);
      }
    });
  };

  var postPreviewKeydown = function (post) {
    post.addEventListener('keydown', function (evt) {
      if (evt.keyCode === ENTER_KEY) {
        var imgSrc = evt.target.querySelector('img').getAttribute('src');
        showPostModal(posts, imgSrc);
      }
    });
  };

  (function (posts) {
    for (var i = 0; i < posts.length; i++) {
      postPreviewClick(posts[i]);
      postPreviewKeydown(posts[i]);
    }
  })(postsPreview);

})();
