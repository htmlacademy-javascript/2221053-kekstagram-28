import { renderUserPhotos } from './render-photos.mjs';
import { addHandlerPhotosElment } from './modal-window-photo-view.mjs';
import { viewErrorMessage } from './utils.mjs';
import { addHandlesForm } from './working-form.mjs';

fetch('https://28.javascript.pages.academy/kekstagram/data')
  .then((response) => {
    if (response.ok) {
      return response.json();
    }
    const err = new Error('Ошибка получения даных.');
    throw err;
  })
  .then((photosLoad) => {
    renderUserPhotos(photosLoad);
    addHandlerPhotosElment(photosLoad);
  })
  .catch((err) => {
    viewErrorMessage(err);
  });

addHandlesForm();
