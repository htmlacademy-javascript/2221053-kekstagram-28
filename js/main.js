import { renderUserPhotos } from './render-photos.mjs';
import { addHandlersPhotosElement } from './modal-window-photo-view.mjs';
import { addHandlesForm } from './working-form.mjs';
import { getData, showAlert } from './requests.mjs';

getData()
  .then((phohtosData) => {
    addHandlersPhotosElement(phohtosData);
    renderUserPhotos(phohtosData);
  })
  .catch((err) => showAlert(err.message));

addHandlesForm();
