import { renderUserPhotos } from './render-photos.mjs';
import { addHandlersPhotosElement } from './modal-window-photo-view.mjs';
import { addHandlesForm } from './working-form.mjs';
import { getData } from './requests.mjs';

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

getData()
  .then((phohtosData) => {
    addHandlersPhotosElement(phohtosData);
    renderUserPhotos(phohtosData);
  })
  .catch((err) => showAlert(err.message));

addHandlesForm();
