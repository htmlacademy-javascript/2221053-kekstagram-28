import { isEsc } from './utils.mjs';
import { createSlider, resetEffectsData } from './effect-photo.mjs';
import { onFormChange, onFieldScaleElementClick } from './effect-photo.mjs';
import { sendData, createAlert } from './requests.mjs';

const FILE_TYPES = ['jpg', 'jpeg', 'png'];
const MAX_HASH_TAGS_COUNT = 5;

const form = document.querySelector('.img-upload__form');
const inputLoadElement = form.querySelector('#upload-file'); //Поле для ввода фотографии
const overlayBlockElement = form.querySelector('.img-upload__overlay');
const overlayButtonClose = form.querySelector('.img-upload__cancel');
const hashTagInputElement = overlayBlockElement.querySelector('.text__hashtags');
const descriptionInputElement = overlayBlockElement.querySelector('.text__description');
const buttonSubmit = form.querySelector('#upload-submit');
const photoPreviewElement = form.querySelector('.img-upload__preview').querySelector('img'); //Превью фотографии

const fieldScaleElement = form.querySelector('.scale');//Блок для задания масштаба изображения


const pristine = new Pristine(form, {
  classTo: 'img-upload__field-wrapper',
  errorTextParent: 'img-upload__field-wrapper',
  errorTextTag: 'div'
});

/**
 * Функция выполняет закрытие окна редактировани эффектов для фотографии
 */
const closeOverlayBlock = () => {
  hashTagInputElement.value = '';
  descriptionInputElement.value = '';
  inputLoadElement.value = '';
  pristine.reset();
  resetEffectsData();
  document.removeEventListener('keydown', onDocumentKeyDown);
  overlayBlockElement.classList.add('hidden');
};

function onOverlayButtonCloseClick() {
  closeOverlayBlock();
}

function onDocumentKeyDown(evt) {
  if (isEsc(evt.key)) {
    closeOverlayBlock();
  }
}

const showAlertOk = createAlert('success');
const showAlertError = createAlert('error');

function onFormSubmit(evt) {
  evt.preventDefault();
  const isValid = pristine.validate();
  if (isValid) {
    buttonSubmit.disabled = true;
    sendData(new FormData(evt.target))
      .then(() => {
        closeOverlayBlock();
        showAlertOk();
      })
      .catch(
        () => {
          document.removeEventListener('keydown', onDocumentKeyDown);
          showAlertError();
        }
      );
    buttonSubmit.disabled = false;
  }
}

function onInputElementKeydown(evt) {
  if (isEsc(evt.key)) {
    evt.preventDefault();
    evt.target.value = '';
    evt.stopPropagation();
    pristine.reset();
  }
}

/**
 * Функция проверяет количество хэш-тегов на соотвествие
 * @return {boolean} результат проверки функции
 */
const checkHashTagsCount = () => {
  const listHashTags = hashTagInputElement.value
    .trim()
    .split(/\s+/);
  return (listHashTags.length <= MAX_HASH_TAGS_COUNT);
};

/**
 * Функция проверяет соответствие хеш-тегов шаблону
 * @return {boolean} результат проверки функции
 */
const checkHashTagsCorrect = () => {
  if (hashTagInputElement.value.length === 0) {
    return true;
  }
  const listHashTags = hashTagInputElement.value
    .trim()
    .split(/\s+/);
  const hashTag = /^#[a-zа-яё0-9]{1,19}$/i;
  let test = true;
  listHashTags.forEach((tag) => {
    if (!hashTag.test(tag)) {
      test = false;
    }
  });
  return test;
};

/**
 * Функция проверяет хеш-теги на уникальность
 * @return {boolean} результат проверки функции
 */
const checkUniquenessHachTags = () => {
  const listHashTags = hashTagInputElement.value
    .toLowerCase()
    .trim()
    .split(/\s+/);
  return [...new Set(listHashTags)].length === listHashTags.length;
};

const onButtonLoadChange = () => {
  const file = inputLoadElement.files[0];
  const fileName = file.name.toLowerCase();
  const matches = FILE_TYPES.some((it) => fileName.endsWith(it));
  if (matches) {
    document.querySelector('#effect-none').checked = true;
    createSlider();
    photoPreviewElement.src = URL.createObjectURL(file);
    overlayBlockElement.classList.remove('hidden');
    document.addEventListener('keydown', onDocumentKeyDown);
  }
};

/**
 * Функция добавления обработчиков событий на элементы формы
 */
const addHandlesForm = () => {
  hashTagInputElement.addEventListener('keydown', onInputElementKeydown);
  descriptionInputElement.addEventListener('keydown', onInputElementKeydown);
  overlayButtonClose.addEventListener('click', onOverlayButtonCloseClick);
  form.addEventListener('submit', onFormSubmit);
  fieldScaleElement.addEventListener('click', onFieldScaleElementClick);
  form.addEventListener('change', onFormChange);

  pristine.addValidator(hashTagInputElement, checkHashTagsCount, 'Максимум 5 хэш-тегов.');
  pristine.addValidator(hashTagInputElement, checkHashTagsCorrect, 'Хэш-тег должен начинаться с # и быть не длиннее 20 симовлов.');
  pristine.addValidator(hashTagInputElement, checkUniquenessHachTags, 'Хэш-теги не должны повторяться.');
  inputLoadElement.addEventListener('change', () => {
    onButtonLoadChange();
  });
};

export { addHandlesForm, onDocumentKeyDown };
