import { renderUserPhotos } from './render-photos.mjs';
import { addHandlerPhotosElment } from './modal-window-photo-view.mjs';

fetch('https://28.javascript.pages.academy/kekstagram/data')
  .then((response) => response.json())
  .then((photosLoad) => {
    renderUserPhotos(photosLoad);
    addHandlerPhotosElment(photosLoad);
  });

