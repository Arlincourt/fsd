import * as $ from 'jquery'
import QuantityDropdown from '../quantity-dropdown/QuantityDropdown'

$(() => {
	let dropdown = $('.room-info .quantity-dropdown__body')
	new QuantityDropdown(dropdown, {
		buttons: true,
		options: [
			{name: 'взрослых', value: 1},
			{name: 'дети', value: 2},
			{name: 'младенцы', value: 0},
		], 
		endings: ['гость', 'гостя', 'гостей']
	})
})