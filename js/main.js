import { renderUserPhotos } from './render-photos.mjs';
import { addHandlerPhotosElment } from './modal-window-photo-view.mjs';

fetch('https://28.javascript.pages.academy/kekstagram/data')
  .then((response) => {
    response.json();
    if (!response.ok) {
      const err = new Error('Ошибка получения даных.');
      throw err;
    }
  })
  .then((photosLoad) => {
    renderUserPhotos(photosLoad);
    addHandlerPhotosElment(photosLoad);
  })
  .catch((err) => {
    alert(err);
  });

