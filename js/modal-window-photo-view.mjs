import { isEsc, isEnter } from './utils.mjs';

const COMMENT_COUNT_ADDED = 5;

const modal = document.querySelector('.big-picture');
const numberCommentForPhoto = modal.querySelector('.social__comment-count');
const buttonCommentsLoader = modal.querySelector('.social__comments-loader');
const buttonCloseModal = modal.querySelector('.big-picture__cancel');
const elementPhotos = document.querySelector('.pictures');


let numberCommentsDisplayed;
let photoData = null;

const renderComment = (comment) => {
  const elementComment = document.createElement('li');
  elementComment.classList.add('social__comment');
  const elementAvatar = document.createElement('img');
  elementAvatar.classList.add('social__picture');
  elementAvatar.src = comment.avatar;
  elementAvatar.alt = comment.name;
  elementAvatar.width = '35';
  elementAvatar.height = '35';
  elementComment.appendChild(elementAvatar);
  const elementCommentText = document.createElement('p');
  elementCommentText.textContent = comment.message;
  elementComment.appendChild(elementCommentText);
  return elementComment;
};

/**
 * Функция скрывает кнопку 'Загрузить еще'. если отображены все комментарии
 * @param {List} comments - список комментариев к фотографии
 */
const hiddenCommentsLoader = (comments) => {
  if (numberCommentForPhoto.firstChild.nodeValue === `${comments.length} из `) {
    buttonCommentsLoader.classList.add('hidden');
  }
};

const renderCommentList = (comments) => {
  const elementCommentsList = document.querySelector('.social__comments');
  const fragmentComments = new DocumentFragment();
  if (comments.length > 0) {
    for (let i = numberCommentsDisplayed; i < numberCommentsDisplayed + Math.min(COMMENT_COUNT_ADDED, comments.length - numberCommentsDisplayed); i++) {
      fragmentComments.appendChild(renderComment(comments[i]));
    }
    elementCommentsList.appendChild(fragmentComments);
  }
  numberCommentsDisplayed += Math.min(COMMENT_COUNT_ADDED, comments.length - numberCommentsDisplayed);
  numberCommentForPhoto.firstChild.nodeValue = `${numberCommentsDisplayed} из `;
  modal.querySelector('.comments-count').textContent = comments.length;
  hiddenCommentsLoader(comments);
};

function onButtonLoadCommentsClick() {
  renderCommentList(photoData.comments);
  hiddenCommentsLoader(photoData.comments);
}

function onButtonLoadCommentsEnterKeydown(evt) {
  if (isEnter(evt.key)) {
    evt.preventDefault();
    renderCommentList(photoData.comments);
  }
}

const closeModalWindowPhoto = () => {
  modal.classList.add('hidden');
  buttonCommentsLoader.removeEventListener('click', onButtonLoadCommentsClick);
  buttonCommentsLoader.removeEventListener('keydown', onButtonLoadCommentsEnterKeydown);
  document.removeEventListener('keydown', onModalPhotoWindowEscKeydown);
  buttonCloseModal.removeEventListener('click', onButtonClosemodalPhotoWindowClick);
  buttonCloseModal.removeEventListener('keydown', onButtonClosemodalPhotoWindowEnterKeydown);
  buttonCommentsLoader.classList.remove('hidden');
  document.body.classList.remove('modal-open');
};

function onModalPhotoWindowEscKeydown(evt) {
  if (isEsc(evt.key)) {
    evt.preventDefault();
    closeModalWindowPhoto();
  }
}

function onButtonClosemodalPhotoWindowEnterKeydown(evt) {
  if (isEnter(evt.key)) {
    evt.preventDefault();
    closeModalWindowPhoto();
  }
}

function onButtonClosemodalPhotoWindowClick() {
  closeModalWindowPhoto();
}

/**
  * Формирование содержимого модального окна просмотра фотографии пользователя
*/
const generateContenetModal = () => {
  modal.querySelector('.social__comments').remove();
  numberCommentForPhoto.insertAdjacentHTML('afterend', '<ul class="social__comments"></ul>');

  modal.querySelector('.big-picture__img').querySelector('img').src = photoData.url;
  modal.querySelector('.likes-count').textContent = photoData.likes;
  renderCommentList(photoData.comments);

  buttonCloseModal.addEventListener('click', onButtonClosemodalPhotoWindowClick);
  buttonCloseModal.addEventListener('keydown', onButtonClosemodalPhotoWindowEnterKeydown);
  buttonCommentsLoader.addEventListener('click', onButtonLoadCommentsClick);
  buttonCommentsLoader.addEventListener('keydown', onButtonLoadCommentsEnterKeydown);
};

const showModalPhotoWindow = (photoElement, photos) => {
  document.body.classList.add('modal-open');
  const id = +photoElement.dataset.id;
  photoData = photos.find((item) => item.id === id);

  numberCommentsDisplayed = 0;

  generateContenetModal(photoData);
  modal.classList.remove('hidden');
  document.addEventListener('keydown', onModalPhotoWindowEscKeydown);
};

function onUserPhotoClick(evt) {
  if (evt.target.classList.contains('picture__img')) {
    evt.preventDefault();
    showModalPhotoWindow(evt.target, this.photoList);
  }
}

function onUserPhotoKeyDown(evt) {
  if (isEnter(evt.key)) {
    evt.preventDefault();
    showModalPhotoWindow(evt.target.querySelector('.picture__img'), this.photoList);
  }
}

const addHandlersPhotosElement = (photos) => {
  elementPhotos.addEventListener('click', {handleEvent: onUserPhotoClick, photoList: photos});
  elementPhotos.parentElement.addEventListener('keydown', {handleEvent: onUserPhotoKeyDown, photoList: photos});
};

export { addHandlersPhotosElement };
