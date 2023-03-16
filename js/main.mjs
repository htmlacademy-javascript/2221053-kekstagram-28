import { generatePhotos } from './mocks/generate.mjs';
import { renderUserPhotos } from './render-photos.mjs';
import { showModalPhotoSee } from './modalfhotosee.mjs';
import { PHOTO_COUNT } from './mocks/const.mjs';

const photos = generatePhotos(PHOTO_COUNT);

renderUserPhotos(photos);
showModalPhotoSee(photos);
