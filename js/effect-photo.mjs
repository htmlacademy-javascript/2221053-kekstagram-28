/* global noUiSlider:readonly */
const rangeValue = {
  'chrome': {
    range: {
      min: 0,
      max: 1,
    },
    start: 1,
    step: 0.1,
  },
  'sepia': {
    range: {
      min: 0,
      max: 1,
    },
    start: 1,
    step: 0.1,
  },
  'marvin': {
    range: {
      min: 0,
      max: 100,
    },
    start: 100,
    step: 1,
  },
  'phobos': {
    range: {
      min: 0,
      max: 3,
    },
    start: 3,
    step: 0.1,
  },
  'heat': {
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

/**
 * Функция устанавливает новый эффект на фотографию
 * @param {number} sliderValue значение величины эффекта
 */
const setNewEffect = (sliderValue) => {
  const effectStyle = {
    'chrome': `filter: grayscale(${sliderValue})`,
    'sepia': `filter: sepia(${sliderValue})`,
    'marvin': `filter: invert(${sliderValue}%)`,
    'phobos': `filter: blur(${sliderValue}px)`,
    'heat': `filter: brightness(${sliderValue})`
  };
  if (currentEffect === 'none') {
    photoPreviewElement.style.filter = 'none';
  } else {
    photoPreviewElement.style.cssText = effectStyle[currentEffect];
  }
};

const onFormChange = (evt) => {
  if (evt.target.classList.contains('effects__radio')) {
    if (evt.target.id === 'effect-none') {
      sliderContainer.setAttribute('hidden', 'true');
      currentEffect = 'none';
    } else {
      currentEffect = evt.target.id.replace('effect-','');
      sliderContainer.removeAttribute('hidden');
      effectLevelSlider.noUiSlider.updateOptions(rangeValue[currentEffect]);
    }
    setNewEffect(effectLevelSlider.noUiSlider.get());
  }
};

const resetEffectsData = () => {
  form.removeEventListener('change', {handleEvent: onFormChange});
  effectLevelSlider.noUiSlider.destroy();
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

  form.addEventListener('change', {handleEvent: onFormChange});
};

export { createSlider, resetEffectsData };
