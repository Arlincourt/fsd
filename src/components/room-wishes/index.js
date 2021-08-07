import * as $ from 'jquery'
import QuantityDropdown from '../quantity-dropdown/QuantityDropdown'

$(() => {
	let dropdown = $('.room-wishes .quantity-dropdown__body')
	new QuantityDropdown(dropdown, {
		buttons: true,
		options: [
			{name: 'спальни', value: 0, endings: ['спальня', 'спальни', 'спален']}, // {name: 'пожилых', value: 0, endings: ['пожилой', 'пожилых']}
			{name: 'кровати', value: 2, endings: ['кровать', 'кровати', 'кроватей']}, // {name: 'пожилых', value: 0, endings: ['пожилой', 'пожилых']}
			{name: 'ванные комнаты', value: 4, endings: ['ванная комната', 'ванных комнат', 'ванных комнат']}, // {name: 'пожилых', value: 0, endings: ['ребенок', 'ребенка', 'детей']}
		], 
		//endings: ['гость', 'гостя', 'гостей']
	})
})