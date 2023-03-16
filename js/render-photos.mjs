const templatePhoto = document.querySelector('#picture').content.querySelector('.picture');
const photosElement = document.querySelector('.pictures');

const createTemplatePhoto = (photo) => {
  const pictureElement = templatePhoto.cloneNode(true);
  pictureElement.querySelector('.picture__img').src = photo.url;
  pictureElement.querySelector('.picture__img').setAttribute('data-id', photo.id);
  pictureElement.querySelector('.picture__img').alt = photo.description;
  pictureElement.querySelector('.picture__likes').textContent = photo.likes;
  pictureElement.querySelector('.picture__comments').textContent = photo.comments.length;
  return pictureElement;
};

const renderPhotoList = (list) => {
  const listPhotoFragment = document.createDocumentFragment();
  list.forEach((photo) => {
    listPhotoFragment.appendChild(createTemplatePhoto(photo));
  });
  return listPhotoFragment;
};

const renderUserPhotos = (photos) => {
  photosElement.appendChild(renderPhotoList(photos));
};

export { renderUserPhotos };
