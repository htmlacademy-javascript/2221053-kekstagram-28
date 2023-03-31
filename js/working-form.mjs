import { isEnter, isEsc, viewErrorMessage } from './utils.mjs';
import { createSlider, resetEffectsData } from './effect-photo.mjs';
import { onFormChange, onFieldScaleElementClick, onFieldScaleElementKeydown } from './effect-photo.mjs';

const MAX_HASH_TAGS_COUNT = 5;

const form = document.querySelector('.img-upload__form');
const inputLoadElement = form.querySelector('#upload-file');
const overlayBlockElement = form.querySelector('.img-upload__overlay');
const overlayButtonClose = form.querySelector('.img-upload__cancel');
const hashTagInputElement = overlayBlockElement.querySelector('.text__hashtags');
const descriptionInputElement = overlayBlockElement.querySelector('.text__description');

const fieldScaleElement = form.querySelector('.scale');//Блок для задания масштаба изображения


const pristine = new Pristine(form, {
  classTo: 'img-upload__field-wrapper',
  errorTextParent: 'img-upload__field-wrapper',
  errorTextTag: 'div'
});

/**
 * Функция выполняет закрытие окна редактировани эффектов для фотографии
 */
const closedOverlayBlock = () => {
  hashTagInputElement.value = '';
  descriptionInputElement.value = '';
  pristine.reset();
  resetEffectsData();
  overlayBlockElement.classList.add('hidden');
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
    const formData = new FormData(evt.target);
    fetch('https://28.javascript.pages.academy/kekstagram',
      {
        method: 'POST',
        body: formData
      })
      .then((response) => {
        if (response.ok) {
          closedOverlayBlock();
        } else {
          const err = new Error('Не удалось отправить форму. Попробуйте еще раз.');
          throw err;
        }
      })
      .catch((err) => {
        viewErrorMessage(err);
      });
  } else {
    viewErrorMessage('Данные заполнены не корректно. Проверьте правильность заполнения полей и отправьте форму заново.');
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
  document.querySelector('#effect-none').checked = true;
  createSlider();
  overlayBlockElement.classList.remove('hidden');
};

/**
 * Функция добавления обработчиков событий на элементы формы
 */
const addHandlesForm = () => {
  hashTagInputElement.addEventListener('keydown', onInputElementKeydown);
  descriptionInputElement.addEventListener('keydown', onInputElementKeydown);
  overlayButtonClose.addEventListener('click', onOverlayButtonCloseClick);
  overlayButtonClose.addEventListener('keydown', onOverlayButtonCloseKeydown);
  document.addEventListener('keydown', onDocumentKeyDown);
  form.addEventListener('submit', onFormSubmit);
  fieldScaleElement.addEventListener('click', onFieldScaleElementClick);
  fieldScaleElement.addEventListener('keydown', onFieldScaleElementKeydown);
  form.addEventListener('change', onFormChange);

  pristine.addValidator(hashTagInputElement, checkHashTagsCount, 'Максимум 5 хэш-тегов.');
  pristine.addValidator(hashTagInputElement, checkHashTagsCorrect, 'Хэш-тег должен начинаться с # и быть не длиннее 20 симовлов.');
  pristine.addValidator(hashTagInputElement, checkUniquenessHachTags, 'Хэш-теги не должны повторяться.');
};

export { onButtonLoadChange, inputLoadElement, addHandlesForm };
