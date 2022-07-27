const ALERT_SHOW_TIME = 5000;
const DEBOUNCE_TIMEOUT = 500;

/**
 * Функция, возвращающая случайное целое число из переданного диапазона включительно
 * @param min
 * @param max
 * @returns {boolean|number}
 */

function getRandomInt(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

/**
 * Функция для проверки максимальной длины строки.
 * @param verifiedString
 * @param maxLength
 * @returns {boolean}
 */
function checkStringLength(verifiedString, maxLength) {
  const stringlength = verifiedString.length;
  return stringlength <= maxLength;
}

/**
 * Функция делает проверку на клавишу Escape
 * @param evt
 * @returns {boolean}
 */
function isEscapeKey(evt) {
  return evt.key === 'Escape';
}

/**
 * Функция показывает текст ошибки.
 * @type {number}
 */

function showAlert (message)  {
  const alertContainer = document.createElement('div');
  alertContainer.style.zIndex = '100';
  alertContainer.style.position = 'absolute';
  alertContainer.style.left = '0';
  alertContainer.style.top = '0';
  alertContainer.style.right = '0';
  alertContainer.style.padding = '10px 3px';
  alertContainer.style.fontSize = '30px';
  alertContainer.style.textAlign = 'center';
  alertContainer.style.backgroundColor = 'red';
  alertContainer.style.color = 'black';
  alertContainer.textContent = message;

  document.body.append(alertContainer);

  setTimeout(() => {
    alertContainer.remove();
  }, ALERT_SHOW_TIME);
}

/**
 * Функция для устранения дребезга
 * @param callback
 * @param timeoutDelay
 * @returns {(function(...[*]): void)|*}
 */
function debounce (callback, timeoutDelay = DEBOUNCE_TIMEOUT) {
  let timeoutId;
  return (...rest) => {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => callback.apply(this, rest), timeoutDelay);
  };
}

export {isEscapeKey, checkStringLength, showAlert, getRandomInt, debounce};
