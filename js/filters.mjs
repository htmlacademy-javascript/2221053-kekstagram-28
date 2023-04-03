import { renderUserPhotos } from './render-photos.mjs';
import { getRandomInteger } from './utils.mjs';

const RANDOM_LIST_COUNT = 10;

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

const activateFilterBlock = (photoList) => {
  filtersBlockElement.classList.remove('img-filters--inactive');
  filtersBlockElement.addEventListener('click', onFiltersBlockElementClick);

  function onFiltersBlockElementClick(evt) {
    if (evt.target.classList.contains('img-filters__button') && (!evt.target.classList.contains('img-filters__button--active'))) {
      const currentFilter = filtersBlockElement.querySelector('.img-filters__button--active');
      currentFilter.classList.remove('img-filters__button--active');
      switch (evt.target.id) {
        case 'filter-default': {
          renderUserPhotos(photoList);
          break;
        }
        case 'filter-discussed': {
          const photoListComments = sortPhotoList(photoList, compareCommentsCount);
          renderUserPhotos(photoListComments);
          break;
        }
        case 'filter-random': {
          const photoListRandom = generateRandomList(photoList);
          renderUserPhotos(photoListRandom);
          break;
        }
      }
      evt.target.classList.add('img-filters__button--active');
    }
  }
};


export { activateFilterBlock };
