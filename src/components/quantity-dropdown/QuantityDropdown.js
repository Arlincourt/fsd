import * as $ from 'jquery'

class QuantityDropdown {
	constructor(element, options) {
		this.$element = element
		this.$dropdown = $(this.$element).find('.js-dropdown')
		this.$input = $(this.$element).find('.js-dropdown-input')
		this._value = ''
		this._buttons = options.buttons
		this._options = options.options
		this._endings = options.endings
		this.$list = $('<div class="quantity-dropdown__list js-quantity-dropdown__list"></div>')
		this.$items = $('<div class="quantity-dropdown__items"></div>')
		this.$apply = ''
		this.$clean = ''
		this.init()
	}

	init() {
		this.initOptions()
		this.initButtons()
		this.$list.append(this.$items)
		this.$element.append(this.$list)
		this.initOptionsEvents()
		this.initButtonsEvents()
		this.initEvents()
		this.setInputValue()
	}

	initButtons() {
		if(this._buttons) {
			const buttons = $('<div class="quantity-dropdown__buttons"></div>')
			this.$apply = $('<button class="btn_transparent" type="button">Применить</button>') 
			this.$clean = $('<button class="btn_transparent" type="button">Очистить</button>') 

			buttons.append(this.$clean)
			buttons.append(this.$apply)
			this.$items.append(buttons)
		}
	}

	initEvents() {
		this.$element.on('click', (evt) => {
			evt.preventDefault()
			evt.stopPropagation()
			if(this.$list.hasClass('quantity-dropdown__list_hidden')) {
				this.$list.removeClass('quantity-dropdown__list_hidden')
			} else {
				this.$list.addClass('quantity-dropdown__list_hidden')
			}
		})
	}

	initOptions() {
		if(Array.isArray(this._options)) {
			let options = ''
			this._options.forEach((option, idx) => {
				let minus = '<button class="quantity-dropdown__action" type="button">-</button>'
				let plus = '<button class="quantity-dropdown__action" type="button">+</button>'
				if(option.value === 0) {
					minus = '<button class="quantity-dropdown__action quantity-dropdown__action_disabled" type="button">-</button>'
				}	

				options +=  `<div class="quantity-dropdown__item">
					<div class="quantity-dropdown__name"><h3 class="title-3">${option.name}</h3></div>
					<div class="quantity-dropdown__actions" data-id="${idx}">
						${minus}
						<div class="quantity-dropdown__value">
							<h3 class="title-3">${option.value}</h3>
						</div> 
						${plus}
					</div>
				</div>`
			})

			this.$items.append(options)
		}
	}

	initButtonsEvents() {
		if(this.$apply) {
			this.$apply.on('click', () => {
				this.$list.addClass('quantity-dropdown__list_hidden')
			})
		}
		if(this.$clean) {
			this.$clean.on('click', () => {
				this.resetState()
			})
		}
	}

	initOptionsEvents() {
		$('.quantity-dropdown__items').on('click', (evt) => {
			evt.stopPropagation()
			if(evt.target.tagName.toLocaleLowerCase() === 'button' && evt.target.textContent === '-') {
				const parent = evt.target.parentElement
				const idx = +parent.dataset.id
				if(this._options[idx].value !== 0) {
					this._options[idx].value--
					const counter = parent.querySelector('.title-3')
					counter.textContent = +counter.textContent - 1
					this.isZero(evt.target, this._options[idx].value)
				}
			}
			if(evt.target.tagName.toLocaleLowerCase() === 'button' && evt.target.textContent === '+') {
				const parent = evt.target.parentElement
				const idx = +parent.dataset.id
				this._options[idx].value++
				const counter = parent.querySelector('.title-3')
				counter.textContent = +counter.textContent + 1
				if(this._options[idx].value === 1) {
					parent.querySelector('.quantity-dropdown__action').classList.remove('quantity-dropdown__action_disabled')
				}
				this.$clean.removeClass('btn_transparent_hidden')
				this.setInputValue()
			}
		})
	}

	isZero(minusBtn, optionValue) {
		if(optionValue === 0) {
			minusBtn.classList.add('quantity-dropdown__action_disabled')
		}

		let isAllZero = true
		this._options.forEach((option) => {
			if(option.value !== 0) {
				isAllZero = false
			}
		})
		if(isAllZero) {
			this.$clean.addClass('btn_transparent_hidden')
			this.$input.val('')
		} else {
			this.setInputValue()
		}
	}

	setInputValue() {
		if(this._endings) {
			let total = this.getOptionsValues()
			if(total === 1) {
				this.$input.val(`${total} ${this._endings[0]}`)
			} else if(total > 1 && total < 5) {
				this.$input.val(`${total} ${this._endings[1]}`)
			} else if(total > 4) {
				this.$input.val(`${total} ${this._endings[2]}`)
			}
		} else {
			const result = this.getOptionsValues()
			let str = ``
			for(let key in result) {
				let value = result[key].value
				if(value === 1) {
					str = str + `${value} ${result[key].endings[0]},`
				} else if(value > 1 && value < 5) {
					str = str + ` ${value} ${result[key].endings[1]},`
				} else if(value > 4) {
					str = str + ` ${value} ${result[key].endings[2]},`
				}
			}
			if(str.length > 23) {
				str = str.substr(0, 20)
				str = str + '...'
			}
			this.$input.val(str)
		}
	}

	getOptionsValues() {
		if(this._endings) {
			let total = 0
			this._options.forEach((option) => {
				total += option.value
			})
			return total
		} else {
			let result = {}
			this._options.forEach((option) => {
				result[option.name] = {value: option.value, endings: option.endings}
			})
			return result
		}
	}

	resetState() {
		this._value = ''
		this._options.forEach((option) => {
			option.value = 0
		})
		this.$input.val('')
		this.$element.find('.quantity-dropdown__action').each((idx, btn) => {
			if(btn.textContent === '-') {
				btn.classList.add('quantity-dropdown__action_disabled')
			}
		})
		this.$element.find('.quantity-dropdown__value .title-3').text('0')
		this.$clean.addClass('btn_transparent_hidden')
	}
}

export default QuantityDropdown