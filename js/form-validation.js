import {checkStringLength, isEscapeKey} from './util.js';

const uploadFile = document.querySelector('#upload-file');
const uploadingNewImageForm = document.querySelector('#upload-select-image');
const imageEditingForm = uploadingNewImageForm.querySelector('.img-upload__overlay');
const body = document.body;
const buttonUploadCancel = uploadingNewImageForm.querySelector('#upload-cancel');
const commentField = uploadingNewImageForm.querySelector('.text__description');
const hashtagField = uploadingNewImageForm.querySelector('.text__hashtags');
const MAX_COMMENT_LENGTH = 140;
const HASHTAGS_LIMIT = 5;
const regularExpression = /^#[A-Za-zА-яЁё0-9]{1,19}$/;


function closeValidateForm() {
  imageEditingForm.classList.add('hidden');
  body.classList.remove('modal-open');
  document.removeEventListener('keydown', onValidateFormEscKeydown);
  uploadFile.value = '';
}

function onValidateFormEscKeydown(evt) {
  if (isEscapeKey(evt)) {
    evt.preventDefault();
    closeValidateForm();
  }
}

function validateForm() {
  uploadFile.addEventListener('change', () => {
    imageEditingForm.classList.remove('hidden');
    body.classList.add('modal-open');
  });
  document.addEventListener('keydown', onValidateFormEscKeydown);
}

buttonUploadCancel.addEventListener('click', () => {
  closeValidateForm();
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
  return checkStringLength(value, MAX_COMMENT_LENGTH);
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
  return hashTags.length <= HASHTAGS_LIMIT;
}

pristine.addValidator(
  hashtagField,
  validateHashTags,
  'Не верный HashTag'
);

uploadingNewImageForm.addEventListener('submit', (evt) => {
  const isValid = pristine.validate();
  evt.preventDefault();
  if (!isValid) {
    evt.preventDefault();
  }
});

export {validateForm};
