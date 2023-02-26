import { Photo } from './class/Photo.mjs';

const generatePhotos = () => {
  const photoArray = [];
  for (let i = 1; i < 26; i++) {
    photoArray.push(new Photo(i));
  }
  return photoArray;
};

const photos = generatePhotos();
console.log(photos);

