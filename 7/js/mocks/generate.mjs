import { Photo } from './class/photo.mjs';

const generatePhotos = (count) => {
  const photoArray = [];
  for (let i = 1; i < count + 1; i++) {
    photoArray.push(new Photo(i));
  }
  return photoArray;
};

export { generatePhotos };
