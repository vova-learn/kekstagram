'use strict';
(function () {
  var FILE_TYPES = ['gif', 'jpg', 'jpeg', 'png'];

  var bodyTag = document.querySelector('body');
  var uploadFile = bodyTag.querySelector('#upload-file');
  var uploadFilePreview = document.querySelector('.img-upload__preview');
  var insetFile = bodyTag.querySelector('.img-upload__preview img');
  var modalPhotoModification = bodyTag.querySelector('.img-upload__overlay');
  var effectLevel = modalPhotoModification.querySelector('.effect-level');

  var uploadFileChangeHandler = function (evt) {
    evt.preventDefault();
    // загруженный файл
    var file = evt.target.files[0];
    console.log(file);
    // если файл загружен
    if (file) {
      var fileName = file.name.toLowerCase();
      // проверяем файл на доступные форматы
      var matches = FILE_TYPES.some(function (it) {
        return fileName.endsWith(it);
      });
      // если формат подходит
      if (matches) {
        // создаём функцию FileReader
        var reader = new FileReader();
        // подписываемся на событие load
        reader.addEventListener('load', function () {
          // при успешной загрузке:
          // добавляем к body класс открытого окна
          bodyTag.classList.add('modal-open');
          // открываем форму редактирования
          modalPhotoModification.classList.remove('hidden');
          // удаляем фон
          uploadFilePreview.style.backgroundColor = 'transparent';
          // окно под высоту картинки
          uploadFilePreview.style.height = 'auto';
          // скрываем бегунок стандартного фильтра
          effectLevel.classList.add('hidden');
          // присвоаиваем картинке результат чтения
          insetFile.src = reader.result;
        });
        // если файл прочитался с ошбкой
        reader.addEventListener('error', function () {
          alert('Ошибка загрузки файла :(');
          throw new Error('Ошибка загрузки файла');
        });
        // читаем выбранный пользователем файл
        reader.readAsDataURL(file);
      } else {
        alert('Загрузите файл в одном из форматов: gif, jpg, jpeg или png!');
        throw new Error('Загрузите файл в одном из форматов: gif, jpg, jpeg или png');
      }
    }
  };

  uploadFile.addEventListener('change', uploadFileChangeHandler);

})();
