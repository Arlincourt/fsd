import * as $ from 'jquery';
import RoomCard from './RoomCard.js';

$(() => {
  $('.room-card__gallery').each((idx, el) => {
    new RoomCard(el);
  });
});
