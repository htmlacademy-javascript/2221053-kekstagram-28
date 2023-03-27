import { isEnter, isEsc } from './utils.mjs';
import { createSlider, resetEffectsData } from './effect-photo.mjs';

const MAX_HASH_TAGS_COUNT = 5;
const MIN_VALUE = 25;
const MAX_VALUE = 100;
const STEP = 25;

const form = document.querySelector('.img-upload__form');
const inputLoadElement = form.querySelector('#upload-file');
const overlayBlockElement = form.querySelector('.img-upload__overlay');
const overlayButtonClose = form.querySelector('.img-upload__cancel');
const hashTagInputElement = overlayBlockElement.querySelector('.text__hashtags');
const descriptionInputElement = overlayBlockElement.querySelector('.text__description');

const fieldScaleElement = form.querySelector('.scale');//Блок для задания масштаба изображения
const scalePhotoValueElement = fieldScaleElement.querySelector('.scale__control--value'); //значение масштаба изображения
const photoPreviewElement = form.querySelector('.img-upload__preview'); //Превью фотографии


const pristine = new Pristine(form, {
  classTo: 'img-upload__field-wrapper',
  errorTextParent: 'img-upload__field-wrapper',
  errorTextTag: 'div'
});

/**
 * Функция выполняет закрытие окна редактировани эффектов для фотографии
 */
const closedOverlayBlock = () => {
  scalePhotoValueElement.value = '100%';
  hashTagInputElement.value = '';
  descriptionInputElement.value = '';
  overlayBlockElement.classList.add('hidden');
  overlayButtonClose.removeEventListener('click', onOverlayButtonCloseClick);
  overlayButtonClose.removeEventListener('keydown', onOverlayButtonCloseKeydown);
  document.removeEventListener('keydown', onDocumentKeyDown);
  hashTagInputElement.removeEventListener('keydown', {handleEvent: onInputElementKeydown});
  descriptionInputElement.removeEventListener('keydown', {handleEvent: onInputElementKeydown});
  form.removeEventListener('submit', {handleEvent: onFormSubmit});
  fieldScaleElement.removeEventListener('click', {handleEvent: onFieldScaleElementClick});
  fieldScaleElement.removeEventListener('keydown', {handleEvent: onFieldScaleElementKeydown});
  resetEffectsData();
};

const changeSizePhotoPreview = (evt) => {
  let newValue;
  switch (true) {
    case evt.target.classList.contains('scale__control--smaller'): {
      newValue = parseInt(scalePhotoValueElement.value, 10) - STEP;
      break;
    }
    case evt.target.classList.contains('scale__control--bigger'): {
      newValue = parseInt(scalePhotoValueElement.value, 10) + STEP;
      break;
    }
  }
  newValue = Math.min(MAX_VALUE, newValue);
  newValue = Math.max(MIN_VALUE, newValue);

  scalePhotoValueElement.value = `${newValue}%`;

  photoPreviewElement.style = `transform: scale(${newValue / 100})`;
};

function onOverlayButtonCloseClick() {
  closedOverlayBlock();
}

function onOverlayButtonCloseKeydown(evt) {
  if (isEnter(evt.key)) {
    closedOverlayBlock();
  }
}

function onDocumentKeyDown(evt) {
  if (isEsc(evt.key)) {
    closedOverlayBlock();
  }
}

function onFormSubmit(evt) {
  evt.preventDefault();
  const isValid = pristine.validate();
  if (isValid) {
    console.log('можно отправлять');
  } else {
    console.log('нельзя отправлять');
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

function onFieldScaleElementClick(evt) {
  changeSizePhotoPreview(evt);
}

function onFieldScaleElementKeydown(evt) {
  if (isEnter(evt.key)) {
    changeSizePhotoPreview(evt);
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
  return [... new Set(listHashTags)].length === listHashTags.length;
};

const onButtonLoadChange = () => {
  createSlider();
  overlayBlockElement.classList.remove('hidden');
  hashTagInputElement.addEventListener('keydown', {handleEvent: onInputElementKeydown});
  descriptionInputElement.addEventListener('keydown', {handleEvent: onInputElementKeydown});
  overlayButtonClose.addEventListener('click', onOverlayButtonCloseClick);
  overlayButtonClose.addEventListener('keydown', onOverlayButtonCloseKeydown);
  document.addEventListener('keydown', onDocumentKeyDown);
  form.addEventListener('submit', {handleEvent: onFormSubmit});
  fieldScaleElement.addEventListener('click', {handleEvent: onFieldScaleElementClick});
  fieldScaleElement.addEventListener('keydown', {handleEvent: onFieldScaleElementKeydown});

  pristine.addValidator(hashTagInputElement, checkHashTagsCount, 'Максимум 5 хэш-тегов.');
  pristine.addValidator(hashTagInputElement, checkHashTagsCorrect, 'Хэш-тег должен начинаться с # и быть не длиннее 20 симовлов.');
  pristine.addValidator(hashTagInputElement, checkUniquenessHachTags, 'Хэш-теги не должны повторяться.');
};

export { onButtonLoadChange, inputLoadElement };
