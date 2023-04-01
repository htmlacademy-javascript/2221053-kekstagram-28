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

const createAlerttOk = () => {
  const elementAlert = document.createElement('div');
  const elementSucces = document.querySelector('#success');

  elementAlert.append(elementSucces.content.cloneNode(true));
  document.body.append(elementAlert);
  const successSection = document.querySelector('.success');
  const successButton = successSection.querySelector('.success__button');
  successSection.classList.add('hidden');
  const onAlertOkClick = (evt) => {
    if (evt.target.classList.contains('success__button') || evt.target.classList.contains('success')) {
      successSection.classList.add('hidden');
    }
  };
  const onAlertOkButtonKeydown = (evt) => {
    if (isEnter(evt.key)) {
      successSection.classList.add('hidden');
    }
  };
  const onDocumentKeydown = (evt) => {
    if (isEsc(evt.key)) {
      successSection.classList.add('hidden');
    }
  };
  successSection.addEventListener('click', onAlertOkClick);
  successButton.addEventListener('keydown', onAlertOkButtonKeydown);
  document.addEventListener('keydown', onDocumentKeydown);

  return () => {
    successSection.classList.remove('hidden');
  };
};

const createAlerttError = () => {
  const elementAlert = document.createElement('div');
  const elementSucces = document.querySelector('#error');

  elementAlert.append(elementSucces.content.cloneNode(true));
  document.body.append(elementAlert);
  const errorSection = document.querySelector('.error');
  const errorButton = errorSection.querySelector('.error__button');
  errorSection.classList.add('hidden');
  const onAlertOkClick = (evt) => {
    if (evt.target.classList.contains('error__button') || evt.target.classList.contains('error')) {
      errorSection.classList.add('hidden');
    }
  };
  const onAlertOkButtonKeydown = (evt) => {
    if (isEnter(evt.key)) {
      errorSection.classList.add('hidden');
    }
  };
  const onDocumentKeydown = (evt) => {
    if (isEsc(evt.key)) {
      errorSection.classList.add('hidden');
    }
  };
  errorSection.addEventListener('click', onAlertOkClick);
  errorButton.addEventListener('keydown', onAlertOkButtonKeydown);
  document.addEventListener('keydown', onDocumentKeydown);

  return () => {
    errorSection.classList.remove('hidden');
  };
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

export {getData, sendData, createAlerttError, createAlerttOk};
