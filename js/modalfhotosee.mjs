import { isEsc, isEnter } from './utils.mjs';

const COMMENT_COUNT_ADDED = 5;
const modal = document.querySelector('.big-picture');
const numberCommentForPhoto = modal.querySelector('.social__comment-count');
const buttonCommentsLoader = modal.querySelector('.social__comments-loader');
const buttonCloseModal = modal.querySelector('.big-picture__cancel');
const elementsPhoto = document.querySelectorAll('.picture');


let numberCommentsDisplayed;
let photoData = null;

const renderComment = (comment) => {
  const elementComment = document.createElement('li');
  elementComment.classList.add('social__comment');
  //добавление информации комментария
  const elementAvatar = document.createElement('img');
  elementAvatar.classList.add('social__picture');
  elementAvatar.src = comment.avatar;
  elementAvatar.alt = comment.name;
  elementAvatar.width = '35';
  elementAvatar.height = '35';
  elementComment.appendChild(elementAvatar);
  //добавление текста сообщения
  const elementCommentText = document.createElement('p');
  elementCommentText.textContent = comment.message;
  elementComment.appendChild(elementCommentText);
  //возвращаеми элемент списка
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

const closemodalWindowPhoto = () => {
  modal.classList.add('hidden');
  buttonCommentsLoader.removeEventListener('click', onButtonLoadCommentsClick);
  buttonCommentsLoader.removeEventListener('keydown', onButtonLoadCommentsEnterKeydown);
  document.removeEventListener('keydown', onmodalPhotoWindowEscKeydown);
  buttonCloseModal.removeEventListener('click', onButtonClosemodalPhotoWindowClick);
  buttonCloseModal.removeEventListener('keydown', onButtonClosemodalPhotoWindowEnterKeydown);
  for (const element of elementsPhoto) {
    element.tabIndex = -1;
  }
  buttonCommentsLoader.classList.remove('hidden');
};

function onmodalPhotoWindowEscKeydown(evt) {
  if (isEsc(evt.key)) {
    evt.preventDefault();
    closemodalWindowPhoto();
  }
}

function onButtonClosemodalPhotoWindowEnterKeydown(evt) {
  if (isEnter(evt.key)) {
    evt.preventDefault();
    closemodalWindowPhoto();
  }
}

function onButtonClosemodalPhotoWindowClick() {
  closemodalWindowPhoto();
}

/**
  * Формирование содержимого модального окна просмотра фотографии пользователя
*/
const generatedContenetModal = () => {
  modal.querySelector('.social__comments').remove();
  numberCommentForPhoto.insertAdjacentHTML('afterend', '<ul class="social__comments"></ul>');

  modal.querySelector('.big-picture__img').querySelector('img').src = photoData.url;
  modal.querySelector('.likes-count').textContent = photoData.likes;
  renderCommentList(photoData.comments);

  buttonCloseModal.addEventListener('click', onButtonClosemodalPhotoWindowClick);
  document.addEventListener('keydown', onmodalPhotoWindowEscKeydown);
  buttonCloseModal.addEventListener('keydown', onButtonClosemodalPhotoWindowEnterKeydown);
  buttonCommentsLoader.addEventListener('click', onButtonLoadCommentsClick);
  buttonCommentsLoader.addEventListener('keydown', onButtonLoadCommentsEnterKeydown);
};

const ShowModalPhotoWindow = (photoElement, photos) => {
  const id = photoElement.getAttribute('data-id');
  photoData = photos.find((item) => item.id === +id);

  for (const element of elementsPhoto) {
    element.tabIndex = -1;
  }

  numberCommentsDisplayed = 0;

  generatedContenetModal(photoData);
  modal.classList.remove('hidden');
};

const addedHandlerPhotomodalWindow = (photos) => {
  const elementPhotos = document.querySelector('.pictures');
  elementPhotos.addEventListener('click', (evt) => {
    evt.preventDefault();
    ShowModalPhotoWindow(evt.target, photos);
  });
  elementPhotos.parentElement.addEventListener('keydown', (evt) => {
    if (isEnter(evt.key)) {
      evt.preventDefault();
      ShowModalPhotoWindow(evt.target.querySelector('.picture__img'), photos);
    }
  });
};

export { addedHandlerPhotomodalWindow };
