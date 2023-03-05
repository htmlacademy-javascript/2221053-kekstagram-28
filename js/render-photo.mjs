{/* <template id="picture">
<a href="#" class="picture">
  <img class="picture__img" src="" width="182" height="182" alt="Случайная фотография">
  <p class="picture__info">
    <span class="picture__comments"></span>
    <span class="picture__likes"></span>
  </p>
</a>
</template> */}

const templatePhoto = document.querySelector('#picture').content.querySelector('.picture');
const listPhotoFragment = document.createDocumentFragment();

const createTemplatePhoto = (photo) => {
  const pictureElement = templatePhoto.cloneNode(true);
  pictureElement.querySelector('.picture__img').src = photo.url;
  //Добавить количество лайков
  pictureElement.querySelector('.picture__comments').textContent = photo.comments.length;
  return pictureElement;
};

const renderPhotoList = (list) => {
  list.forEach((photo) => {
    listPhotoFragment.appendChild(createTemplatePhoto(photo));
  });
  return listPhotoFragment;
};

export { renderPhotoList };
