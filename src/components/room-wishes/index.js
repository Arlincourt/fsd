import * as $ from 'jquery'
import QuantityDropdown from '../quantity-dropdown/QuantityDropdown'

$(() => {
	let dropdown = $('.room-wishes .quantity-dropdown__body')
	new QuantityDropdown(dropdown, {
		buttons: true,
		options: [
			{name: 'взрослые', value: 0},
			{name: 'дети', value: 0},
			{name: 'младенцы', value: 0},
		], 
		words: [['гость', 'гостя', 'гостей'], ['младенец', 'младенца', 'младенцев']]
	})
})