/**
 * Функция, возвращающая случайное целое число из переданного диапазона включительно
 * @param min
 * @param max
 * @returns {boolean|number}
 */
const getRandomInt = (min, max) => {
  if (min >= 0 && min < max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }
  return false;
};
getRandomInt(1, 10);

/**
 * Функция для проверки максимальной длины строки.
 * @param verifiedString
 * @param maxLength
 * @returns {boolean}
 */
const checkStringLength = (verifiedString, maxLength) => {
  const stringlength = verifiedString.length;
  return  stringlength <= maxLength;

};
checkStringLength('test', 4);
