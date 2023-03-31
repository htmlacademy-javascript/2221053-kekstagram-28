let photosarray;

/**
 * Функция загружает фотографии с сервера и возвращает их в виде массива
 */
const loadPhotos = () => {
  fetch('https://28.javascript.pages.academy/kekstagram/data')
    .then((response) => response.json())
    .then((photosLoad) => {
      photosarray = photosLoad;
    });
};

const getPhotos = () => {
  loadPhotos();
  return photosarray;
};

export { getPhotos };
