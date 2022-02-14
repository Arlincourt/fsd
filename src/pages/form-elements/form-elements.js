import * as $ from 'jquery';
import QuantityDropdown from '../../components/quantity-dropdown/QuantityDropdown';

const options = [
  {
    buttons: true,
    options: [
      { name: 'взрослых', value: 0 },
      { name: 'дети', value: 0 },
    ],
    endings: ['гость', 'гостя', 'гостей'],
  },
  {
    buttons: false,
    options: [
      { name: 'спальни', value: 2, endings: ['спальня', 'спальни', 'спален'] },
      { name: 'кровати', value: 2, endings: ['кровать', 'кровати', 'кроватей'] },
      { name: 'ванные комнаты', value: 0, endings: ['ванная комната', 'ванные комнаты', 'ванных комнат'] },
    ],
  },
  {
    buttons: false,
    visible: true,
    options: [
      { name: 'спальни', value: 2, endings: ['спальня', 'спальни', 'спален'] },
      { name: 'кровати', value: 2, endings: ['кровать', 'кровати', 'кроватей'] },
      { name: 'ванные комнаты', value: 0, endings: ['ванная комната', 'ванные комнаты', 'ванных комнат'] },
    ],
  },
  {
    buttons: true,
    visible: true,
    options: [
      { name: 'взрослые', value: 0 },
      { name: 'дети', value: 0 },
      { name: 'младенцы', value: 0 },
    ],
    words: [['гость', 'гостя', 'гостей'], ['младенец', 'младенца', 'младенцев']],
  },
  {
    buttons: true,
    visible: true,
    options: [
      { name: 'взрослые', value: 2 },
      { name: 'дети', value: 1 },
      { name: 'младенцы', value: 0 },
    ],
    words: [['гость', 'гостя', 'гостей'], ['младенец', 'младенца', 'младенцев']],
  },
];

$(() => {
  $('.form-elements__item .quantity-dropdown__body').each((idx, el) => new QuantityDropdown(el, options[idx]));
  
  $('.form-elements__item_with_100_mb .js-accordion__expander').click();
});
