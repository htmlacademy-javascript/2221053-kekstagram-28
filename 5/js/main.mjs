import { PHOTO_COUNT } from './mocks/const.mjs';
import { generatePhotos } from './mocks/generate.mjs';
import { renderPhotoList } from './render-photo.mjs';

const photos = generatePhotos(PHOTO_COUNT);
const photosElement = document.querySelector('.pictures');

photosElement.appendChild(renderPhotoList(photos));
