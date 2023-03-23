import { isEnter, isEsc } from './utils.mjs';
const inputLoadElement = document.querySelector('#upload-file');
const overlayBlockElement = document.querySelector('.img-upload__overlay');
const overlayButtonClose = document.querySelector('.img-upload__cancel');
// const buttonLoadElement = document.querySelector('.img-upload__label');

// const formLoadPhotoElement = document.querySelector('.img-upload__form');
// const buttonOpeningFormLoadPhoto = formLoadPhotoElement.querySelector('.img-upload__control');

// const addHandlerOpenFormLoadPhoto = () => {
//   buttonOpeningFormLoadPhoto.addEventListener('click', () => {
//     const inputLoadPhoto = formLoadPhotoElement.querySelector('.img-upload__input');
//     inputLoadPhoto.classList.remove('visually-hidden');
//   });
// };

/**
 * Функция выполняет закрытие окна редактировани эффектов для фотографии
 */
const closedOverlayBlock = () => {
  // Очистить форму
  overlayBlockElement.classList.add('hidden');
  overlayButtonClose.removeEventListener('click', onOverlayButtonCloseClick);
  overlayButtonClose.removeEventListener('keydown', onOverlayButtonCloseKeydown);
  document.removeEventListener('keydown', onDocumentKeyDown);
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

const onChangekButtonLoad = () => {
  overlayBlockElement.classList.remove('hidden');
  overlayButtonClose.addEventListener('click', onOverlayButtonCloseClick);
  overlayButtonClose.addEventListener('keydown', onOverlayButtonCloseKeydown);
  document.addEventListener('keydown', onDocumentKeyDown);

};

export { onChangekButtonLoad, inputLoadElement };
