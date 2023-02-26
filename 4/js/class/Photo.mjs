import {DESCRIPTION, MESSAGES, AUTHOR_NAME, CommentMaxData} from '../const.mjs';
import {checkLenString} from '../function.mjs';

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
      let result = MESSAGES[Math.floor(Math.random() * MESSAGES.length)]
      const messageCount = Math.floor(Math.random() * CommentMaxData.messageMaxCount + 1);
      let message = result;
      for (let j = 2; j <= messageCount; j++) {
        while (message === result) {
          message = MESSAGES[Math.floor(Math.random() * MESSAGES.length)];
        }
        if (checkLenString(`${result}${message}`, CommentMaxData.commentMaxLength + 1)) {
          result += ` ${message}`;
        }
      }
      return result;
    };

    const genId = generateIdComment();
    const comments = [];
    const commentCount = Math.floor(Math.random() * CommentMaxData.commentsMaxCount + 1);

    for (let i = 1; i <= commentCount; i++) {
      const comment = {
        id: genId(),
        avatar: `img/avatar-${Math.floor(Math.random() * CommentMaxData.avatarMaxId + 1)}.svg`,
        message: generateMessages(),
        name: AUTHOR_NAME[Math.floor(Math.random() * AUTHOR_NAME.length)]
      };
      comments.push(comment);
    }

    return comments;
  }
}

export {Photo};
