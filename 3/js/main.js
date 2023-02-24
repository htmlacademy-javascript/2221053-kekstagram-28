class Photo {
  #url;
  #id;
  constructor(id) {
    let photo = loadPhoto(id);
    this.#id = photo.id;
    this.#url = photo.url;
    this.description = photo.description;
    this.comments = photo.comments;
    photo = NaN;
  }

  get id() {
    return this.#id;
  }

  get url() {
    return this.#url;
  }
}

const generatePhotos = () => {
  const photoArray = [];
  for (let i = 1; i < 26; i++) {
    photoArray.push(new Photo(i));
  }
  return photoArray;
};

const photos = generatePhotos();
