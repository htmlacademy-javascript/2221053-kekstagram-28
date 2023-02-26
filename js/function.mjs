//Функция для проверки длины строки. Она нам пригодится для валидации формы. Примеры использования функции:

const checkLenString = (string, len) => Number(len) >= string.length;

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

export {checkLenString, checkPalindrom, extractIntegerFromString, complementString};
