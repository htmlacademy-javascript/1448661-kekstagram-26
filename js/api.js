import {showAlert} from './util.js';

const DATA_RECEIVING_ADDRESS = 'https://26.javascript.pages.academy/kekstagram/data';
const DATA_SENDING_ADDRESS = 'https://26.javascript.pages.academy/kekstagram';

function getData(onSuccess) {
  fetch(DATA_RECEIVING_ADDRESS)
    .then((response) => {
      if (response.ok) {
        return response.json();
      }
      throw new Error;
    })
    .then((photos) => {
      onSuccess(photos);
    })
    .catch(() => {
      showAlert('Нет соединение с сервером, попробуйте позже!');
    });
}

function sendData(onSuccess, onFail, body) {
  fetch(DATA_SENDING_ADDRESS,
    {
      method: 'POST',
      body,
    },)
    .then((response) => {
      if (response.ok) {
        onSuccess();
      } else {
        onFail();
      }
    })
    .catch(() => {
      onFail();
    });
}

export {getData, sendData};
