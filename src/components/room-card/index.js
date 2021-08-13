import * as $ from 'jquery';
import RoomCardSlider from './RoomCardSlider.js';

$(() => {
	$('.room-card__gallery').each((idx, el) => {
		new RoomCardSlider(el);
	})
})