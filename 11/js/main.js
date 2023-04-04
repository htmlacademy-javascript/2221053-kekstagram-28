import { addHandlersPhotosElement } from './modal-window-photo-view.mjs';
import { addHandlesForm } from './working-form.mjs';
import { getData, showAlert } from './requests.mjs';
import { activateFilterBlock } from './filters.mjs';
import { renderUserPhotos } from './render-photos.mjs';

getData()
  .then((phohtosData) => {
    addHandlersPhotosElement(phohtosData);
    renderUserPhotos(phohtosData);
    activateFilterBlock(phohtosData);
  })
  .catch((err) => showAlert(err.message));

addHandlesForm();
