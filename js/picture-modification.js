const MAX_SCALE = 100;
const MIN_SCALE = 25;
const SCALE_STEP = 25;
const RADIX = 10;
const DEFAULT_EFFECT = 'none';

const minusButtonElement = document.querySelector('.scale__control--smaller');
const plusButtonElement = document.querySelector('.scale__control--bigger');
const uploadValueElement = document.querySelector('.scale__control--value');
const picturePreviewElement = document.querySelector('.img-upload__preview img');
const sliderElement = document.querySelector('.effect-level__slider');
const effectLevelElement = document.querySelector('.effect-level__value');
const sliderContainerElement = document.querySelector('.img-upload__effect-level');

let currentEffect = DEFAULT_EFFECT;

const effectUnit = {
  none: '',
  chrome: '',
  sepia: '',
  marvin: '%',
  phobos: 'px',
  heat: ''
};

const effectStyle = {
  none: '',
  chrome: 'grayscale',
  sepia: 'sepia',
  marvin: 'invert',
  phobos: 'blur',
  heat: 'brightness'
};

const sliderEffectsList = {
  none: {},

  chrome: {
    range: {
      min: 0,
      max: 1,
    },
    step: 0.1,
    start: 1,
  },

  sepia: {
    range: {
      min: 0,
      max: 1,
    },
    step: 0.1,
    start: 1
  },

  marvin: {
    range: {
      min: 0,
      max: 100,
    },
    step: 1,
    start: 100
  },

  phobos: {
    range: {
      min: 1,
      max: 3,
    },
    step: 0.1,
    start: 3
  },

  heat: {
    range: {
      min: 1,
      max: 3,
    },
    step: 0.1,
    start: 3
  }
};

function controlScale() {
  uploadValueElement.value = `${MAX_SCALE}%`;
  minusButtonElement.addEventListener('click', () => {
    let currentValue = parseInt(uploadValueElement.value, RADIX);
    if (currentValue > MIN_SCALE && currentValue <= MAX_SCALE) {
      currentValue -= SCALE_STEP;
      uploadValueElement.value = `${currentValue}%`;
      picturePreviewElement.style.transform = `scale(${currentValue}%)`;
    }
  });

  plusButtonElement.addEventListener('click', () => {
    let currentValue = parseInt(uploadValueElement.value, RADIX);
    if (currentValue >= MIN_SCALE && currentValue < MAX_SCALE) {
      currentValue += SCALE_STEP;
      uploadValueElement.value = `${currentValue}%`;
      picturePreviewElement.style.transform = `scale(${currentValue}%)`;
    }
  });
}

function createSlider() {
  noUiSlider.create(sliderElement, {
    range: {
      min: 0,
      max: 1,
    },
    start: 1,
    step: 0.1,
    connect: 'lower',
    format: {
      to: function (value) {
        if (Number.isInteger(value)) {
          return value.toFixed(0);
        }
        return value.toFixed(1);
      },
      from: function (value) {
        return parseFloat(value);
      },
    },
  });

  sliderElement.noUiSlider.on('update', () => {
    effectLevelElement.value = sliderElement.noUiSlider.get();
    picturePreviewElement.style.filter = `${effectStyle[currentEffect]}(${effectLevelElement.value}${effectUnit[currentEffect]})`;
  });

  const imgUploadFormElement = document.querySelector('.img-upload__form');
  imgUploadFormElement.addEventListener('change', (evt) => {
    sliderContainerElement.classList.add('hidden');

    if (!evt.target.classList.contains('effects__radio')) {
      return;
    }
    currentEffect = evt.target.value;

    if (currentEffect === DEFAULT_EFFECT) {
      sliderContainerElement.classList.add('hidden');
      picturePreviewElement.removeAttribute('class');
      picturePreviewElement.style.filter = '';
    } else {
      sliderContainerElement.classList.remove('hidden');
      picturePreviewElement.className = '';
      const currentClass = `effects__preview--${currentEffect}`;
      picturePreviewElement.classList.add(currentClass);
      sliderElement.noUiSlider.updateOptions(sliderEffectsList[currentEffect]);
    }
  });
}

export {controlScale, createSlider};
