import {getRandomInt} from './util.js';

const PHOTOS_DESCRIPTIONS_COUNT = 25;

const AUTHOR_NAMES = [
  'Александр', 'Михаил', 'Максим', 'Даниил', 'Лев', 'Артем', 'Марк', 'Иван', 'Дмитрий', 'Матвей', 'Роман', 'Тимофей', 'Кирилл', 'Мирон', 'Федор', 'Илья', 'Мухаммад', 'Андрей', 'Никита', 'Егор', 'Алексей', 'Арсений', 'Константин', 'Давид', 'Сергей'
];

const ALL_MESSAGES = [
  'Всё отлично!',
  'В целом всё неплохо.',
  'Но не всё.',
  'Когда вы делаете фотографию, хорошо бы убирать палец из кадра.',
  'В конце концов это просто непрофессионально.',
  'Моя бабушка случайно чихнула с фотоаппаратом в руках и у неё получилась фотография лучше.',
  'Я поскользнулся на банановой кожуре и уронил фотоаппарат на кота и у меня получилась фотография лучше.',
  'Лица у людей на фотке перекошены, как будто их избивают.',
  'Как можно было поймать такой неудачный момент?!'
];

/**
 * Функция формирует текст комментария из двух случайных предложений.
 * @returns {string} Комментарий.
 */
const createTextMessage = () => {
  const randomIndexFirst = getRandomInt(0, ALL_MESSAGES.length - 1);

  let randomIndexSecond = getRandomInt(0, ALL_MESSAGES.length - 1);

  if (randomIndexFirst === randomIndexSecond) {
    randomIndexSecond = getRandomInt(0, ALL_MESSAGES.length - 1);
  }

  return `${ALL_MESSAGES[randomIndexFirst]} ${ALL_MESSAGES[randomIndexSecond]}`;
};

/**
 * Функция создает массив объектов — список комментариев
 * @returns {*[]}
 */
const createComments = () => {
  const commentsList = [];

  const randomCommentsCount = getRandomInt(0, 10);

  for (let i = 1; i < randomCommentsCount; i++) {
    const randomAuthorNameIndex = getRandomInt(0, AUTHOR_NAMES.length - 1);

    const comment = {
      id: i,
      avatar: `img/avatar-${getRandomInt(1, 6)}.svg`,
      message: createTextMessage(),
      name: AUTHOR_NAMES[randomAuthorNameIndex]
    };
    commentsList.push(comment);
  }
  return commentsList;
};

/**
 * Функция создает объект описание фотографии
 * @param i
 * @returns {{comments: *, description: string, id, url: string, likes: (boolean|number)}}
 */
const createPhotoDescription = (i) => ({
  id: i,
  url: `photos/${i}.jpg`,
  description: 'Фотография – это жанровая зарисовка, передающая один из ярких моментов жизни.',
  likes: getRandomInt(15, 200),
  comments: createComments()
});

/**
 * Фукция создает массив из 25 сгенерированных объектов с описанием фотографий
 * @returns {*[]} Массив
 */
const createPhotosDescriptions = () => {
  const allPhotosDescriptions = [];

  for (let i = 1; i <= PHOTOS_DESCRIPTIONS_COUNT; i++) {
    allPhotosDescriptions.push(
      createPhotoDescription(i)
    );
  }
  return allPhotosDescriptions;
};

export {createPhotosDescriptions};
