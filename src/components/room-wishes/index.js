import * as $ from 'jquery'
import QuantityDropdown from '../quantity-dropdown/QuantityDropdown'

$(() => {
	let dropdown = $('.room-wishes .quantity-dropdown__body')
	new QuantityDropdown(dropdown, {
		buttons: true,
		options: [
			{name: 'взрослых', value: 0},
			{name: 'детей', value: 0},
		], 
		endings: ['гость', 'гостя', 'гостей']
	})
})