//Функция для проверки длины строки. Она нам пригодится для валидации формы. Примеры использования функции:

const checkLenString = (string, len) => typeof len === 'number' ? len >= string.length : NaN;

//Функция для проверки, является ли строка палиндромом. Палиндром — это слово или фраза, которые одинаково читаются и слева направо и справа налево. Например:

const checkPalindrom = (string) => {
  let test;
  string = String(string).split(' ').join('');
  string = string.toLowerCase();
  for (let i = 0; i <= string.length / 2; i++) {
    test = (string[i] === string[string.length - 1 - i]);
    if (test === false) {
      break;
    }
  }
  return test;
};

// /Функция, которая принимает строку, извлекает содержащиеся в ней цифры от 0 до 9 и возвращает их в виде целого положительного числа. Если в строке нет ни одной цифры, функция должна вернуть NaN:

const extractIntegerFromString = (string) => {
  const STRING_NUMBERS = '0123456789';
  let result = '';
  string = String(string);
  const len = String(string).length;
  for (let i = 0; i <= len; i++) {
    if (STRING_NUMBERS.indexOf(String(string[i])) > -1) {
      result += string[i];
    }
  }
  return result === '' ? NaN : result;
};

//Функция, которая принимает три параметра: исходную строку, минимальную длину и строку с добавочными символами — и возвращает исходную строку, дополненную указанными символами до заданной длины. Символы добавляются в начало строки. Если исходная строка превышает заданную длину, она не должна обрезаться. Если «добивка» слишком длинная, она обрезается с конца.

const complementString = (string, minLength, supplementaryString) => {
  let test;
  while (string.length < minLength) {
    test = string.length + supplementaryString.length - minLength;
    supplementaryString = test > 0 ? supplementaryString.slice(0, minLength - string.length) : supplementaryString;
    string = supplementaryString + string;
  }
  return string;
};

const loadPhoto = (id) => {
  const photo = {};
  photo.id = id;
  photo.url = `photos/${id}.jpg`;
  photo.description = DESCRIPTION[id - 1];
  photo.comments = [];
  const commentCount = Math.floor(Math.random() * 8);
  for (let i = 1; i <= commentCount; i++) {
    let comment = {};
    comment.id = id * 10 + i;
    comment.avatar = `img/avatar-${Math.floor(Math.random() * 6 + 1)}.svg`;
    const messageCount = Math.floor(Math.random() * 2 + 1);
    comment.message = MESSAGES[Math.floor(Math.random() * 6)];
    let message = comment.message;
    for (let j = 2; j <= messageCount; j++) {
      while (message === comment.message) {
        message = MESSAGES[Math.floor(Math.random() * 6)];
      }
      comment.message += '\n';
      comment.message += message;
    }
    comment.name = AUTHOR_NAME[Math.floor(Math.random() * 10)];
    photo.comments.push(comment);
  }
  return photo;
};
