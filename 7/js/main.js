import { generatePhotos } from './mocks/generate.mjs';
import { renderUserPhotos } from './render-photos.mjs';
import { addedHandlerPhotomodalWindow } from './modal-window-photo-view.mjs';
import { PHOTO_COUNT } from './mocks/const.mjs';

const photos = generatePhotos(PHOTO_COUNT);

renderUserPhotos(photos);
addedHandlerPhotomodalWindow(photos);
