import {checkStringLength, isEscapeKey} from './util.js';
import {sendData} from './api.js';

const ERROR_MESSAGE_ZINDEX = '10';
const MAX_SCALE = 100;
const MAX_COMMENT_LENGTH = 140;
const HASHTAGS_LIMIT = 5;
const REGULAR_EXPRESSION = /^#[A-Za-zА-яЁё0-9]{1,19}$/;

const uploadFileElement = document.querySelector('#upload-file');
const uploadingNewImageFormElement = document.querySelector('#upload-select-image');
const imageEditingFormElement = uploadingNewImageFormElement.querySelector('.img-upload__overlay');
const body = document.body;
const uploadCancelButtonElement = uploadingNewImageFormElement.querySelector('#upload-cancel');
const commentFieldElement = uploadingNewImageFormElement.querySelector('.text__description');
const hashtagFieldElement = uploadingNewImageFormElement.querySelector('.text__hashtags');
const submitButtonElement = uploadingNewImageFormElement.querySelector('.img-upload__submit');
const picturePreviewElement = document.querySelector('.img-upload__preview img');
const uploadValueElement = document.querySelector('.scale__control--value');

const messageSuccessElement = document.querySelector('#success');
const contentMessageSuccessElement = messageSuccessElement.content.querySelector('.success').cloneNode(true);
const successButtonElement = contentMessageSuccessElement.querySelector('.success__button');

const messageErrorElement = document.querySelector('#error');
const contentMessageErrorElement = messageErrorElement.content.querySelector('.error').cloneNode(true);
const errorButtonElement = contentMessageErrorElement.querySelector('.error__button');

function onMessageErrorClickOutside(evt) {
  if (evt.target === contentMessageErrorElement) {
    closeErrorMessage();
  }
}

function onMessageErrorKeyDown(evt) {
  if (isEscapeKey(evt)) {
    closeErrorMessage();
  }
}

function onMessageErrorClickButton() {
  closeErrorMessage();
}

function onMessageSuccessClickOutside(evt) {
  if (evt.target === contentMessageSuccessElement) {
    closeSuccessMessage();
  }
}

function onMessageSuccessEscKeydown(evt) {
  if (isEscapeKey(evt)) {
    closeSuccessMessage();
  }
}

function onMessageSuccessClickButton() {
  closeSuccessMessage();
}

function closeErrorMessage() {
  errorButtonElement.removeEventListener('click', onMessageErrorClickButton);
  document.removeEventListener('keydown', onMessageErrorKeyDown);
  contentMessageErrorElement.removeEventListener('click', onMessageErrorClickOutside);
  contentMessageErrorElement.remove();
  document.addEventListener('keydown', onValidateFormEscKeydown);
}

function closeSuccessMessage() {
  successButtonElement.removeEventListener('click', onMessageSuccessClickButton);
  document.removeEventListener('keydown', onMessageSuccessEscKeydown);
  contentMessageSuccessElement.removeEventListener('click', onMessageSuccessClickOutside);
  contentMessageSuccessElement.remove();
}

function showSuccessMessage() {
  successButtonElement.addEventListener('click', onMessageSuccessClickButton);
  document.addEventListener('keydown', onMessageSuccessEscKeydown);
  contentMessageSuccessElement.addEventListener('click', onMessageSuccessClickOutside);
  document.body.appendChild(contentMessageSuccessElement);
}

function showErrorMessage() {
  errorButtonElement.addEventListener('click', onMessageErrorClickButton);
  document.addEventListener('keydown', onMessageErrorKeyDown);
  contentMessageErrorElement.addEventListener('click', onMessageErrorClickOutside);
  document.body.appendChild(contentMessageErrorElement);
  contentMessageErrorElement.style.zIndex = ERROR_MESSAGE_ZINDEX;
  document.removeEventListener('keydown', onValidateFormEscKeydown);
}

function closeEditingForm() {
  imageEditingFormElement.classList.add('hidden');
  body.classList.remove('modal-open');

  uploadFileElement.value = '';
  uploadingNewImageFormElement.reset();
  picturePreviewElement.className = '';
  picturePreviewElement.style.filter = '';
  picturePreviewElement.style.transform = '';
  uploadValueElement.value = `${MAX_SCALE}%`;
  document.removeEventListener('keydown', onValidateFormEscKeydown);
}

function onValidateFormEscKeydown(evt) {
  if (isEscapeKey(evt)) {
    evt.preventDefault();
    closeEditingForm();
  }
}

function validateForm() {
  uploadFileElement.addEventListener('change', () => {
    imageEditingFormElement.classList.remove('hidden');
    body.classList.add('modal-open');
    document.addEventListener('keydown', onValidateFormEscKeydown);
  });

}

uploadCancelButtonElement.addEventListener('click', () => {
  closeEditingForm();
});

commentFieldElement.addEventListener('focus', () => {
  document.removeEventListener('keydown', onValidateFormEscKeydown);
});

commentFieldElement.addEventListener('blur', () => {
  document.addEventListener('keydown', onValidateFormEscKeydown);
});

hashtagFieldElement.addEventListener('focus', () => {
  document.removeEventListener('keydown', onValidateFormEscKeydown);
});

hashtagFieldElement.addEventListener('blur', () => {
  document.addEventListener('keydown', onValidateFormEscKeydown);
});

const pristine = new Pristine(uploadingNewImageFormElement,
  {
    classTo: 'img-upload__field-wrapper',
    errorTextParent: 'img-upload__field-wrapper'
  });

function validateCommentField(value) {
  return checkStringLength(value, MAX_COMMENT_LENGTH);
}

pristine.addValidator(
  commentFieldElement,
  validateCommentField,
  'Длина комментария не больше 140 символов!');

function validateHashTags(value) {
  if (value.length === 0) {
    return true;
  }
  let hashTags = value.split(' ');
  hashTags = hashTags.map((element) => element.toLowerCase());

  const unique = hashTags.filter((element, index, self) => self.indexOf(element) === index);

  if (hashTags.length > unique.length) {
    return false;
  }
  for (let i = 0; i < hashTags.length; i++) {
    if (!REGULAR_EXPRESSION.test(hashTags[i])) {
      return false;
    }
  }
  return hashTags.length <= HASHTAGS_LIMIT;
}

pristine.addValidator(
  hashtagFieldElement,
  validateHashTags,
  'неверный хештег'
);

function blockSubmitButton() {
  submitButtonElement.disabled = true;
  submitButtonElement.textContent = 'Сохраняю...';
}

function unblockSubmitButton () {
  submitButtonElement.disabled = false;
  submitButtonElement.textContent = 'Опубликовать';
}

function setUserFormSubmit() {
  uploadingNewImageFormElement.addEventListener('submit', (evt) => {
    evt.preventDefault();
    const isValid = pristine.validate();
    if (isValid) {
      blockSubmitButton();
      sendData(
        () => {
          closeEditingForm();
          unblockSubmitButton();
          showSuccessMessage();
        },
        () => {
          unblockSubmitButton();
          showErrorMessage();
        },
        new FormData(evt.target),
      );
    }
  });
}

export {validateForm, setUserFormSubmit};
