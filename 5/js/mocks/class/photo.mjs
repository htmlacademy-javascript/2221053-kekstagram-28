import { DESCRIPTION, MESSAGES, AUTHOR_NAME, commentMaxData, MIN_LIKES, MAX_LIKES } from '../const.mjs';
import { getRandomInteger } from '../../utils.mjs';

class Photo {
  #url;
  #id;
  constructor(id) {
    this.#generatePhotoData(id);
  }

  get id() {
    return this.#id;
  }

  get url() {
    return this.#url;
  }

  #generatePhotoData(id) {
    this.#id = id;
    this.#url = `photos/${id}.jpg`;
    this.description = DESCRIPTION[id - 1];
    this.comments = Photo.#generateComments();
    this.likes = getRandomInteger(MIN_LIKES, MAX_LIKES);
  }

  static #generateComments() {
    const generateIdComment = () => {
      let genneratedId = 0;
      return () => {
        genneratedId++;
        return genneratedId;
      };
    };

    const generateMessages = () => {
      let result = MESSAGES[getRandomInteger(0, MESSAGES.length - 1)];
      const messageCount = getRandomInteger(1, commentMaxData.MESSAGE_MAX_COUNT);
      let message = result;
      for (let j = 2; j <= messageCount; j++) {
        while (message === result) {
          message = MESSAGES[getRandomInteger(0, MESSAGES.length - 1)];
        }
        result += ` ${message}`;
      }
      return result;
    };

    const genId = generateIdComment();
    const comments = [];
    const commentCount = getRandomInteger(0, commentMaxData.COMMENT_MAX_COUNT);

    for (let i = 1; i <= commentCount; i++) {
      const comment = {
        id: genId(),
        avatar: `img/avatar-${getRandomInteger(0, commentMaxData.AVATAR_MAX_ID)}.svg`,
        message: generateMessages(),
        name: AUTHOR_NAME[getRandomInteger(0, AUTHOR_NAME.length - 1)]
      };
      comments.push(comment);
    }

    return comments;
  }
}

export {Photo};
