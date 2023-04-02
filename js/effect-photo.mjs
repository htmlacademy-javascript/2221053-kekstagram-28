import { isEnter } from './utils.mjs';

const MIN_VALUE = 25;
const MAX_VALUE = 100;
const STEP = 25;

const rangeValue = {
  chrome: {
    range: {
      min: 0,
      max: 1,
    },
    start: 1,
    step: 0.1,
  },
  sepia: {
    range: {
      min: 0,
      max: 1,
    },
    start: 1,
    step: 0.1,
  },
  marvin: {
    range: {
      min: 0,
      max: 100,
    },
    start: 100,
    step: 1,
  },
  phobos: {
    range: {
      min: 0,
      max: 3,
    },
    start: 3,
    step: 0.1,
  },
  heat: {
    range: {
      min: 1,
      max: 3,
    },
    start: 3,
    step: 0.1,
  }
};
let currentEffect;

const form = document.querySelector('.img-upload__form');
const sliderContainer = form.querySelector('.img-upload__effect-level');
const effectLevelSlider = form.querySelector('.effect-level__slider');
const valueEffectLevel = form.querySelector('.effect-level__value');
const photoPreviewElement = form.querySelector('.img-upload__preview'); //Превью фотографии
const fieldScaleElement = form.querySelector('.scale');//Блок для задания масштаба изображения
const scalePhotoValueElement = fieldScaleElement.querySelector('.scale__control--value'); //значение масштаба изображения


const changeSizePhotoPreview = (evt) => {
  let newValue;
  switch (true) {
    case evt.target.classList.contains('scale__control--smaller'): {
      newValue = parseInt(scalePhotoValueElement.value, 10) - STEP;
      break;
    }
    case evt.target.classList.contains('scale__control--bigger'): {
      newValue = parseInt(scalePhotoValueElement.value, 10) + STEP;
      break;
    }
  }
  newValue = Math.min(MAX_VALUE, newValue);
  newValue = Math.max(MIN_VALUE, newValue);

  scalePhotoValueElement.value = `${newValue}%`;

  photoPreviewElement.style.transform = `scale(${newValue / 100})`;
};

function onFieldScaleElementClick(evt) {
  changeSizePhotoPreview(evt);
}

function onFieldScaleElementKeydown(evt) {
  if (isEnter(evt.key)) {
    changeSizePhotoPreview(evt);
  }
}

/**
 * Функция устанавливает новый эффект на фотографию
 * @param {number} sliderValue значение величины эффекта
 */
const setNewEffect = (sliderValue) => {
  const effectStyle = {
    none: 'none',
    chrome: `grayscale(${sliderValue})`,
    sepia: `sepia(${sliderValue})`,
    marvin: `invert(${sliderValue}%)`,
    phobos: `blur(${sliderValue}px)`,
    heat: `brightness(${sliderValue})`
  };
  photoPreviewElement.style.filter = effectStyle[currentEffect];
};

const onFormChange = (evt) => {
  if (evt.target.classList.contains('effects__radio')) {
    currentEffect = evt.target.value;
    if (currentEffect === 'none') {
      sliderContainer.setAttribute('hidden', 'true');
    } else {
      sliderContainer.removeAttribute('hidden');
      effectLevelSlider.noUiSlider.updateOptions(rangeValue[currentEffect]);
    }
    evt.target.checked = true;
    setNewEffect(effectLevelSlider.noUiSlider.get());
  }
};

const resetEffectsData = () => {
  document.querySelector('#effect-none').setAttribute('checked', 'true');
  effectLevelSlider.noUiSlider.destroy();
  photoPreviewElement.style.filter = 'none';
  scalePhotoValueElement.value = '100%';
  currentEffect = 'none';
  photoPreviewElement.style.transform = 'none';
};

/**
 * Функция создает слайдер
 */
const createSlider = () => {
  noUiSlider.create(effectLevelSlider, {
    range: {
      min: 0,
      max: 1,
    },
    start: 1,
    step: 0.1,
    connect: 'lower',
  });

  effectLevelSlider.noUiSlider.on('update', () => {
    const sliderValue = effectLevelSlider.noUiSlider.get();
    valueEffectLevel.value = sliderValue;
    setNewEffect(sliderValue);
  });

  sliderContainer.setAttribute('hidden', 'true');

};

export { createSlider, resetEffectsData, onFormChange, onFieldScaleElementClick, onFieldScaleElementKeydown };
