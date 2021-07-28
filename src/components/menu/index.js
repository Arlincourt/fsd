import Menu from './Menu'
import * as $ from 'jquery'

$(document).ready(function() {
	$('.js-menu').each(function(idx, el) {
		new Menu(el)
	})
});