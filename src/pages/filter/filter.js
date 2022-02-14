import * as $ from 'jquery';
import QuantityDropdown from '../../components/quantity-dropdown/QuantityDropdown';

const options = [
  {
    buttons: true,
    options: [
      { name: 'взрослые', value: 2 },
      { name: 'дети', value: 1 },
      { name: 'младенцы', value: 1 },
    ],
    words: [['гость', 'гостя', 'гостей'], ['младенец', 'младенца', 'младенцев']],
  },
  {
    buttons: false,
    options: [
      { name: 'спальни', value: 2, endings: ['спальня', 'спальни', 'спален'] },
      { name: 'кровати', value: 2, endings: ['кровать', 'кровати', 'кроватей'] },
      { name: 'ванные комнаты', value: 0, endings: ['ванная комната', 'ванные комнаты', 'ванных комнат'] },
    ],
  },
];

$(() => {
  $('.filter__sidebar-item .quantity-dropdown__body').each((idx, el) => new QuantityDropdown(el, options[idx]));
});
