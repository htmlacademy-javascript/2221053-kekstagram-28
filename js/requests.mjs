import { isEnter, isEsc } from './utils.mjs';

const BASE_URL = 'https://28.javascript.pages.academy/kekstagram';
const Route = {
  GET_DATA: '/data',
  SEND_DATA: '/'
};
const Method = {
  GET: 'GET',
  POST: 'POST'
};
const ErrorText = {
  GET_DATA: 'Не удалось загрузить данные. Попробуйте обновить страницу',
  SEND_DATA: 'Не удалось отправить форму. Попробуйте ещё раз',
};

/**
 * Создает модальное окно с результатом отправки фотографии на сервер
 * @param {string} alertType - определяет тип модального окна (succes - отправка фотографии прошла успешно, error - произошла ошибка при отправке файла.)
 * @returns ссылка на функцию открытия модального окна
 */
const createAlert = (alertType) => {
  const elementAlert = document.createElement('div');
  const elementTemplate = document.querySelector(`#${alertType}`);

  elementAlert.append(elementTemplate.content.cloneNode(true));
  document.body.append(elementAlert);
  const elementSection = document.querySelector(`.${alertType}`);
  const elementButton = elementSection.querySelector(`.${alertType}__button`);
  elementSection.classList.add('hidden');
  const onAlertClick = (evt) => {
    if (evt.target.classList.contains(`${alertType}__button`) || evt.target.classList.contains(`${alertType}`)) {
      elementSection.classList.add('hidden');
    }
  };
  const onAlertButtonKeydown = (evt) => {
    if (isEnter(evt.key)) {
      elementSection.classList.add('hidden');
    }
  };
  const onDocumentKeydown = (evt) => {
    if (isEsc(evt.key)) {
      elementSection.classList.add('hidden');
    }
  };
  elementSection.addEventListener('click', onAlertClick);
  elementButton.addEventListener('keydown', onAlertButtonKeydown);
  document.addEventListener('keydown', onDocumentKeydown);

  return () => {
    elementSection.classList.remove('hidden');
  };
};


const ALERT_SHOW_TIME = 5000;

const showAlert = (message) => {
  const alertContainer = document.createElement('div');
  alertContainer.style.zIndex = '100';
  alertContainer.style.position = 'absolute';
  alertContainer.style.left = '0';
  alertContainer.style.top = '0';
  alertContainer.style.right = '0';
  alertContainer.style.padding = '10px 3px';
  alertContainer.style.fontSize = '30px';
  alertContainer.style.textAlign = 'center';
  alertContainer.style.backgroundColor = 'red';

  alertContainer.textContent = message;

  document.body.append(alertContainer);

  setTimeout(() => {
    alertContainer.remove();
  }, ALERT_SHOW_TIME);
};

const load = (route, errorText, method = Method.GET, body = null) =>
  fetch(`${BASE_URL}${route}`, {method, body})
    .then((response) => {
      if (!response.ok) {
        throw new Error();
      }
      return response.json();
    })
    .catch(() => {
      throw new Error(errorText);
    });

const getData = () => load(Route.GET_DATA, ErrorText.GET_DATA);

const sendData = (body) => load(Route.SEND_DATA, ErrorText.SEND_DATA, Method.POST, body);

export {getData, sendData, createAlert, showAlert};
