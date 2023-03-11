import { photos } from './mocks/generate.mjs';
import { isEsc, isEnter } from './utils.mjs';

const COMMENT_COUNT_ADDED = 5;
const MODAL = document.querySelector('.big-picture');

let commentsCountSee;
let photoData = null;

//генерация элемнта DOM содержащего 1 комментарий
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

//отрисовка списка комментариев
const renderCommentList = (comments) => {
  const elementCommentsList = document.querySelector('.social__comments');
  if (comments.length > 0) {
    for (let i = commentsCountSee; i < commentsCountSee + Math.min(COMMENT_COUNT_ADDED, comments.length - commentsCountSee); i++) {
      elementCommentsList.appendChild(renderComment(comments[i]));
    }
  }
  commentsCountSee += Math.min(COMMENT_COUNT_ADDED, comments.length - commentsCountSee);
  MODAL.querySelector('.social__comment-count').firstChild.nodeValue = `${commentsCountSee} из `;
  MODAL.querySelector('.comments-count').textContent = comments.length;
};

//События для кнопки подгрузки комментариев
function onButtonLoadCommentsClick() {
  renderCommentList(photoData.comments);
}
function onButtonLoadCommentsEnterKeydown(evt) {
  if (isEnter(evt.key)) {
    evt.preventDefault();
    renderCommentList(photoData.comments);
  }
}

//функция закрытия окна просмотра фотографии
const closeModalWindowPhoto = () => {
  const elementsPhoto = document.querySelectorAll('.picture');
  MODAL.classList.add('hidden');
  MODAL.querySelector('.social__comments-loader').removeEventListener('click', onButtonLoadCommentsClick);
  MODAL.querySelector('.social__comments-loader').removeEventListener('keydown', onButtonLoadCommentsEnterKeydown);
  document.removeEventListener('keydown', onModalPhotoWindowEscKeydown);
  MODAL.querySelector('.big-picture__cancel').removeEventListener('click', onButtonCloseModalPhotoWindowClick);
  MODAL.querySelector('.big-picture__cancel').removeEventListener('keydown', onButtonCloseModalPhotoWindowEnterKeydown);
  for (const element of elementsPhoto) {
    element.tabIndex = -1;
  }
};

//событие закрытия окна просмотра фотографии
function onModalPhotoWindowEscKeydown(evt) {
  if (isEsc(evt.key)) {
    evt.preventDefault();
    closeModalWindowPhoto();
  }
}
function onButtonCloseModalPhotoWindowEnterKeydown(evt) {
  if (isEnter(evt.key)) {
    evt.preventDefault();
    closeModalWindowPhoto();
  }
}
function onButtonCloseModalPhotoWindowClick() {
  closeModalWindowPhoto();
}

//функция отрытия окна просмотра фотографии
const ShowModalPhotoWindow = (photoElement) => {
  const id = photoElement.getAttribute('data-id');
  photoData = photos.find((item) => item.id === +id);

  const elementsPhoto = document.querySelectorAll('.picture');
  for (const element of elementsPhoto) {
    element.tabIndex = -1;
  }

  commentsCountSee = 0;

  MODAL.querySelector('.social__comments').remove();
  MODAL.querySelector('.social__comment-count').insertAdjacentHTML('afterend', '<ul class="social__comments"></ul>');

  MODAL.querySelector('.big-picture__img').querySelector('img').src = photoData.url;
  MODAL.querySelector('.likes-count').textContent = photoData.likes;
  renderCommentList(photoData.comments);

  MODAL.querySelector('.big-picture__cancel').addEventListener('click', onButtonCloseModalPhotoWindowClick);
  document.addEventListener('keydown', onModalPhotoWindowEscKeydown);
  MODAL.querySelector('.big-picture__cancel').addEventListener('keydown', onButtonCloseModalPhotoWindowEnterKeydown);
  MODAL.querySelector('.social__comments-loader').addEventListener('click', onButtonLoadCommentsClick);
  MODAL.querySelector('.social__comments-loader').addEventListener('keydown', onButtonLoadCommentsEnterKeydown);
  MODAL.classList.remove('hidden');
};

//функция активации событий для списка фотографий
const showModalPhotoSee = () => {
  const elementPhotos = document.querySelector('.pictures');
  elementPhotos.addEventListener('click', (evt) => {
    if (evt.target.classList.contains('picture__img')) {
      evt.preventDefault();
      ShowModalPhotoWindow(evt.target);
    }
  });
  elementPhotos.parentElement.addEventListener('keydown', (evt) => {
    if (isEnter(evt.key)) {
      evt.preventDefault();
      ShowModalPhotoWindow(evt.target.querySelector('.picture__img'));
    }
  });
};

export { showModalPhotoSee };
