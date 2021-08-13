import * as $ from 'jquery'
import QuantityDropdown from '@components/quantity-dropdown/QuantityDropdown'

let options = [
	{
		buttons: true,
		options: [
			{name: 'взрослых', value: 0},
			{name: 'дети', value: 0},
		], 
		endings: ['гость', 'гостя', 'гостей']
	},
]

$(() => {
	$('.form-elements__input .quantity-dropdown__body').each((idx, el) => {
		new QuantityDropdown(el, options[idx])
	})
})