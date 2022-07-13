import {checkStringLength, isEscapeKey} from './util.js';
import {sendData} from './api.js';

const uploadFile = document.querySelector('#upload-file');
const uploadingNewImageForm = document.querySelector('#upload-select-image');
const imageEditingForm = uploadingNewImageForm.querySelector('.img-upload__overlay');
const body = document.body;
const uploadCancelButton = uploadingNewImageForm.querySelector('#upload-cancel');
const commentField = uploadingNewImageForm.querySelector('.text__description');
const hashtagField = uploadingNewImageForm.querySelector('.text__hashtags');
const submitButton = uploadingNewImageForm.querySelector('.img-upload__submit');
const picturePreview = document.querySelector('.img-upload__preview img');
const uploadValue = document.querySelector('.scale__control--value');

const messageSuccess = document.querySelector('#success');
const contentMessageSuccess = messageSuccess.content.querySelector('.success').cloneNode(true);
const successButton = contentMessageSuccess.querySelector('.success__button');

const messageError = document.querySelector('#error');
const contentMessageError = messageError.content.querySelector('.error').cloneNode(true);
const errorButton = contentMessageError.querySelector('.error__button');

const maxScale = 100;
const maxCommentLength = 140;
const hashtagsLimit = 5;
const regularExpression = /^#[A-Za-zА-яЁё0-9]{1,19}$/;

function onMessageErrorClickOutside(evt) {
  if (evt.target === contentMessageError) {
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
  if (evt.target === contentMessageSuccess) {
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
  errorButton.removeEventListener('click', onMessageErrorClickButton);
  document.removeEventListener('keydown', onMessageErrorKeyDown);
  contentMessageError.removeEventListener('click', onMessageErrorClickOutside);
  contentMessageError.remove();
}

function closeSuccessMessage() {
  successButton.removeEventListener('click', onMessageSuccessClickButton);
  document.removeEventListener('keydown', onMessageSuccessEscKeydown);
  contentMessageSuccess.removeEventListener('click', onMessageSuccessClickOutside);
  contentMessageSuccess.remove();
}

function showSuccessMessage() {
  successButton.addEventListener('click', onMessageSuccessClickButton);
  document.addEventListener('keydown', onMessageSuccessEscKeydown);
  contentMessageSuccess.addEventListener('click', onMessageSuccessClickOutside);
  document.body.appendChild(contentMessageSuccess);
}

function showErrorMessage() {
  errorButton.addEventListener('click', onMessageErrorClickButton);
  document.addEventListener('keydown', onMessageErrorKeyDown);
  contentMessageError.addEventListener('click', onMessageErrorClickOutside);
  document.body.appendChild(contentMessageError);
}

function closeEditingForm() {
  imageEditingForm.classList.add('hidden');
  body.classList.remove('modal-open');

  uploadFile.value = '';
  uploadingNewImageForm.reset();
  picturePreview.className = '';
  picturePreview.style.filter = '';
  picturePreview.style.transform = '';
  uploadValue.value = `${maxScale}%`;
  document.removeEventListener('keydown', onValidateFormEscKeydown);
}

function closeFormError() {
  imageEditingForm.classList.add('hidden');
  body.classList.remove('modal-open');
  document.removeEventListener('keydown', onValidateFormEscKeydown);
}

function onValidateFormEscKeydown(evt) {
  if (isEscapeKey(evt)) {
    evt.preventDefault();
    closeEditingForm();
  }
}

function validateForm() {
  uploadFile.addEventListener('change', () => {
    imageEditingForm.classList.remove('hidden');
    body.classList.add('modal-open');
  });
  document.addEventListener('keydown', onValidateFormEscKeydown);
}

uploadCancelButton.addEventListener('click', () => {
  closeEditingForm();
});

commentField.addEventListener('focus', () => {
  document.removeEventListener('keydown', onValidateFormEscKeydown);
});

commentField.addEventListener('blur', () => {
  document.addEventListener('keydown', onValidateFormEscKeydown);
});

hashtagField.addEventListener('focus', () => {
  document.removeEventListener('keydown', onValidateFormEscKeydown);
});

hashtagField.addEventListener('blur', () => {
  document.addEventListener('keydown', onValidateFormEscKeydown);
});

const pristine = new Pristine(uploadingNewImageForm,
  {
    classTo: 'img-upload__field-wrapper',
    errorTextParent: 'img-upload__field-wrapper'
  });

function validateCommentField(value) {
  return checkStringLength(value, maxCommentLength);
}

pristine.addValidator(
  commentField,
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
    if (!regularExpression.test(hashTags[i])) {
      return false;
    }
  }
  return hashTags.length <= hashtagsLimit;
}

pristine.addValidator(
  hashtagField,
  validateHashTags,
  'неверный хештег'
);

const blockSubmitButton = () => {
  submitButton.disabled = true;
  submitButton.textContent = 'Сохраняю...';
};

const unblockSubmitButton = () => {
  submitButton.disabled = false;
  submitButton.textContent = 'Опубликовать';
};

function setUserFormSubmit() {
  uploadingNewImageForm.addEventListener('submit', (evt) => {
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
          closeFormError();
        },
        new FormData(evt.target),
      );
    }
  });
}

export {validateForm, setUserFormSubmit};
