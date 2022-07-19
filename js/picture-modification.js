const minusButton = document.querySelector('.scale__control--smaller');
const plusButton = document.querySelector('.scale__control--bigger');
const uploadValue = document.querySelector('.scale__control--value');
const picturePreview = document.querySelector('.img-upload__preview img');
const sliderElement = document.querySelector('.effect-level__slider');
const effectLevel = document.querySelector('.effect-level__value');
const sliderContainer = document.querySelector('.img-upload__effect-level');

const MAX_SCALE = 100;
const MIN_SCALE = 25;
const SCALE_STEP = 25;
const RADIX = 10;

const DEFAULT_EFFECT = 'none';

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
  uploadValue.value = `${MAX_SCALE}%`;
  minusButton.addEventListener('click', () => {
    let currentValue = parseInt(uploadValue.value, RADIX);
    if (currentValue > MIN_SCALE && currentValue <= MAX_SCALE) {
      currentValue -= SCALE_STEP;
      uploadValue.value = `${currentValue}%`;
      picturePreview.style.transform = `scale(${currentValue}%)`;
    }
  });

  plusButton.addEventListener('click', () => {
    let currentValue = parseInt(uploadValue.value, RADIX);
    if (currentValue >= MIN_SCALE && currentValue < MAX_SCALE) {
      currentValue += SCALE_STEP;
      uploadValue.value = `${currentValue}%`;
      picturePreview.style.transform = `scale(${currentValue}%)`;
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
    effectLevel.value = sliderElement.noUiSlider.get();
    picturePreview.style.filter = `${effectStyle[currentEffect]}(${effectLevel.value}${effectUnit[currentEffect]})`;
  });

  const imgUploadForm = document.querySelector('.img-upload__form');
  imgUploadForm.addEventListener('change', (evt) => {
    sliderContainer.classList.add('hidden');

    if (!evt.target.classList.contains('effects__radio')) {
      return;
    }
    currentEffect = evt.target.value;

    if (currentEffect === DEFAULT_EFFECT) {
      sliderContainer.classList.add('hidden');
      picturePreview.removeAttribute('class');
      picturePreview.style.filter = '';
    } else {
      sliderContainer.classList.remove('hidden');
      picturePreview.className = '';
      const currentClass = `effects__preview--${currentEffect}`;
      picturePreview.classList.add(currentClass);
      sliderElement.noUiSlider.updateOptions(sliderEffectsList[currentEffect]);
    }
  });
}

export {controlScale, createSlider};
