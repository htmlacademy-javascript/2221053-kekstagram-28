import { renderUserPhotos } from './render-photos.mjs';
import { getRandomInteger, debounce } from './utils.mjs';

const RANDOM_LIST_COUNT = 10;
const RERENDER_DELAY = 500;
const PHOTOS_MAX_LENGTH = 25;

const filtersBlockElement = document.querySelector('.img-filters');

const getCommentsCount = (photoData) => photoData.comments.length;

const compareCommentsCount = (countA, countB) => getCommentsCount(countB) - getCommentsCount(countA);

const sortPhotoList = (photoList, cb) => photoList.slice().sort(cb);

const generateRandomList = (photoList) => {
  let photoListCopy = photoList.slice();
  const randomList = [];
  for (let i = 1; i <= RANDOM_LIST_COUNT; i++) {
    const index = getRandomInteger(0, photoListCopy.length - 1);
    const randomPhoto = photoListCopy[index];
    randomList.push(randomPhoto);
    photoListCopy = photoListCopy.filter((item) => item.id !== randomPhoto.id);
  }
  return randomList;
};

const setNewFilter = (evt) => {
  const currentFilter = filtersBlockElement.querySelector('.img-filters__button--active');
  currentFilter.classList.remove('img-filters__button--active');
  evt.target.classList.add('img-filters__button--active');
};

const getNewPhotos = (evt, photoList) => {
  let resultList;
  switch (evt.target.id) {
    case 'filter-default': {
      resultList = photoList;
      break;
    }
    case 'filter-discussed': {
      resultList = sortPhotoList(photoList, compareCommentsCount);
      break;
    }
    case 'filter-random': {
      resultList = generateRandomList(photoList);
      break;
    }
  }
  if (resultList.length > PHOTOS_MAX_LENGTH) {
    resultList.filter((item, index) => index < PHOTOS_MAX_LENGTH);
  }
  return resultList;
};

let newPhotos = [];
const clickFilterButton = (photoList, cb) => {
  filtersBlockElement.addEventListener('click', (evt) => {
    if (evt.target.classList.contains('img-filters__button')) {
      setNewFilter(evt);
      newPhotos = getNewPhotos(evt, photoList);
      cb(newPhotos);
    }
  });
};

const activateFilterBlock = (photoList) => {
  filtersBlockElement.classList.remove('img-filters--inactive');
  clickFilterButton(photoList, debounce(
    () => renderUserPhotos(newPhotos),
    RERENDER_DELAY
  ));
};

export { activateFilterBlock };
