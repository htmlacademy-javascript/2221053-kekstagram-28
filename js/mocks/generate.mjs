import { Photo } from './class/photo.mjs';
import { PHOTO_COUNT } from './const.mjs';

const generatePhotos = (count) => {
  const photoArray = [];
  for (let i = 1; i < count + 1; i++) {
    photoArray.push(new Photo(i));
  }
  return photoArray;
};

const photos = generatePhotos(PHOTO_COUNT);

export { photos };
