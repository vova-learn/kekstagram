'use strict';
(function () {

  // import window.utility: ESCAPE
  //        window.backend: upload(dataForm, loadHandler, errorHandler);

  var MAX_EFFECT_VALUE = 100;
  var LINE_WIDTH = 454;

  var bodyTag = document.querySelector('body');
  var mainTag = document.querySelector('main');
  var formImageUpload = document.querySelector('#upload-select-image');
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
  var levelControlLine = effectLevel.querySelector('.effect-level__line');
  var levelControlDepthLine = effectLevel.querySelector('.effect-level__depth');
  var levelControlPin = effectLevel.querySelector('.effect-level__pin');
  var hashtagInput = modalPhotoModification.querySelector('.text__hashtags');
  var commentInput = modalPhotoModification.querySelector('.text__description');
  var validate = true;

  var checkSpace = function (checkValue) {
    return checkValue !== '';
  };

  var checkInvalidHandler = function () {
    if (!validate && hashtagInput.value) {
      hashtagInput.style.borderColor = '#ff0000';
    }
  };

  var checkValidHandler = function () {
    hashtagInput.removeAttribute('style');
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
        validate = false;
      } else if (hashtags[i].search(removeSymbol) > 0) {
        hashtagInput.setCustomValidity('После решётки (#) хэш-тег должен состоять только из букв и чисел');
        validate = false;
      } else if (checkDoubleHash()) {
        hashtagInput.setCustomValidity('Может быть использована только одна решётка (#)');
        validate = false;
      } else if (hashtags[i].length <= 1) {
        hashtagInput.setCustomValidity('Хеш-тег не может состоять только из одного символа');
        validate = false;
      } else if (hashtags[i].length > 20) {
        hashtagInput.setCustomValidity('Хеш-тег не может быть длинее 20 символов');
        validate = false;
      } else if (checkUpLowCase()) {
        hashtagInput.setCustomValidity('Один и тот же хэш-тег не может быть использован дважды без учёта регистра: #ХэшТег и #хэштег считаются одним и тем же тегом');
        validate = false;
      } else if (hashtags.length > 5) {
        hashtagInput.setCustomValidity('Использование больше пяти хэш-тегов невозможно');
        validate = false;
      } else {
        hashtagInput.setCustomValidity('');
        validate = true;
      }
    }
  };

  hashtagInput.addEventListener('input', checkHashtagInputHandler);
  hashtagInput.addEventListener('blur', checkInvalidHandler);
  hashtagInput.addEventListener('keydown', checkValidHandler);

  var checkLevelIntensity = function () {
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
      photoPreview.style.filter = 'brightness(' + ((2 * intensity / 100) + 1) + ')';
    }
  };

  var updateEffect = function (coords, value) {
    levelControlPin.style.left = coords + 'px';
    levelControlDepthLine.style.width = coords + 'px';
    effectLevelValue.value = value;
    checkLevelIntensity();
  };

  levelControlPin.addEventListener('mousedown', function (evt) {
    evt.preventDefault();
    var startCoords = {
      x: evt.clientX
    };

    var mouseMoveHandler = function (moveEvt) {
      var shift = {
        x: startCoords.x - moveEvt.clientX
      };
      startCoords = {
        x: moveEvt.clientX
      };

      var levelEffect = levelControlPin.offsetLeft - shift.x;
      var effectValue = Math.round(levelEffect * 100 / levelControlLine.clientWidth);
      var rectLine = levelControlLine.getBoundingClientRect();

      if (levelEffect <= levelControlLine.clientWidth && levelEffect >= levelControlLine.clientLeft) {
        if (startCoords.x < rectLine.x) {
          updateEffect(0, 0);
        } else if (startCoords.x > rectLine.right) {
          updateEffect(levelControlLine.clientWidth, MAX_EFFECT_VALUE);
        } else {
          updateEffect(levelEffect, effectValue);
        }
      }
    };

    var mouseUpHandler = function () {
      document.removeEventListener('mousemove', mouseMoveHandler);
      document.removeEventListener('mouseup', mouseUpHandler);
    };

    document.addEventListener('mousemove', mouseMoveHandler);
    document.addEventListener('mouseup', mouseUpHandler);
  });

  var toggleAttribute = function (element, elements, attribute) {
    if (!element.hasAttribute(attribute)) {
      for (var i = 0; i < elements.length; i++) {
        elements[i].removeAttribute(attribute);
      }
      element.setAttribute(attribute, '');
      element.checked = true;
    }
  };

  var checkClassEffect = function (element, attribute, img) {
    if (element.getAttribute(attribute) === 'effect-chrome') {
      img.removeAttribute('class');
      img.style.filter = '';
      img.classList.add('effects__preview--chrome');
    } else if (element.getAttribute(attribute) === 'effect-sepia') {
      img.removeAttribute('class');
      img.style.filter = '';
      img.classList.add('effects__preview--sepia');
    } else if (element.getAttribute(attribute) === 'effect-marvin') {
      img.removeAttribute('class');
      img.style.filter = '';
      img.classList.add('effects__preview--marvin');
    } else if (element.getAttribute(attribute) === 'effect-phobos') {
      img.removeAttribute('class');
      img.style.filter = '';
      img.classList.add('effects__preview--phobos');
    } else if (element.getAttribute(attribute) === 'effect-heat') {
      img.removeAttribute('class');
      img.style.filter = '';
      img.classList.add('effects__preview--heat');
    } else if (element.getAttribute(attribute) === 'effect-none') {
      img.removeAttribute('class');
      img.style.filter = '';
      img.classList.add('effects__preview--none');
    }
  };

  var addEffectClickHandler = function (effect, effectAll) {
    effect.addEventListener('click', function () {
      toggleAttribute(effect, effectAll, 'checked');
      checkClassEffect(effect, 'id', photoPreview);
      updateEffect(levelControlLine.clientWidth || LINE_WIDTH, MAX_EFFECT_VALUE);
      if (effect.getAttribute('id') !== 'effect-none') {
        effectLevel.classList.remove('hidden');
      } else {
        effectLevel.classList.add('hidden');
      }
    });
  };

  effectsButtons.forEach(function (effectsButton) {
    addEffectClickHandler(effectsButton, effectsButtons);
  });

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

  var setDefaultSettings = function () {
    modalPhotoModification.classList.add('hidden');
    bodyTag.classList.remove('modal-open');
    scaleValue.value = '100%';
    photoPreview.removeAttribute('class');
    photoPreview.removeAttribute('style');
    toggleAttribute(effectsButtons[0], effectsButtons, 'checked');
    uploadFile.value = '';
    hashtagInput.value = '';
    commentInput.value = '';
  };

  closeButton.addEventListener('click', function () {
    setDefaultSettings();
  });

  document.addEventListener('keydown', function (evt) {
    if (evt.keyCode === window.utility.ESCAPE && evt.target !== hashtagInput && evt.target !== commentInput) {
      setDefaultSettings();
    }
  });

  var removeMessage = function () {
    var successMessage = mainTag.querySelector('.success');
    var errorMessage = mainTag.querySelector('.error');
    if (successMessage) {
      mainTag.removeChild(successMessage);
    }
    if (errorMessage) {
      mainTag.removeChild(errorMessage);
    }
  };

  var addMessage = function (template) {
    var messageModal = template.cloneNode(true);
    mainTag.appendChild(messageModal);
    document.addEventListener('click', removeMessage);
    document.addEventListener('keydown', function (evt) {
      if (evt.keyCode === window.utility.ESCAPE) {
        removeMessage();
      }
    });
    setDefaultSettings();
  };

  var showErrorMessage = function () {
    modalPhotoModification.classList.add('hidden');
    var errorMessageTemplate = document.querySelector('#error').content.querySelector('.error');
    addMessage(errorMessageTemplate);
  };

  var showSuccessMessage = function () {
    modalPhotoModification.classList.add('hidden');
    var successMessageTemplate = document.querySelector('#success').content.querySelector('.success');
    addMessage(successMessageTemplate);
  };

  formImageUpload.addEventListener('submit', function (evt) {
    window.backend.upload(new FormData(formImageUpload), showSuccessMessage, showErrorMessage);
    evt.preventDefault();
    setDefaultSettings();
  });

  document.removeEventListener('click', function () {
    removeMessage();
  });

})();
