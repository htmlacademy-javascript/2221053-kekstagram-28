import { generatePhotos } from './mocks/generate.mjs';
import { renderUserPhotos } from './render-photos.mjs';
import { onClickUserPhoto, onKeyDownUserPhoto, elementPhotos } from './modal-window-photo-view.mjs';
import { PHOTO_COUNT } from './mocks/const.mjs';
import { onChangekButtonLoad, inputLoadElement } from './working-form.mjs';

const photos = generatePhotos(PHOTO_COUNT);

const addedHandlerPhotosElment = () => {
  elementPhotos.addEventListener('click', {handleEvent: onClickUserPhoto, photoList: photos});
  elementPhotos.parentElement.addEventListener('keydown', {handleEvent: onKeyDownUserPhoto, photoList: photos});
  inputLoadElement.addEventListener('change', () => {
    onChangekButtonLoad();
  });
};

renderUserPhotos(photos);
addedHandlerPhotosElment();
