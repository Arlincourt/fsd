import * as $ from 'jquery';

class QuantityDropdown {
  constructor(element, options) {
    this.$element = $(element);
    this.$dropdown = this.$element.find('.js-dropdown');
    this.$input = this.$element.find('.js-dropdown__input');
    this.value = '';
    this.buttons = options.buttons;
    this.options = options.options;
    this.endings = options.endings;
    this.words = options.words;
    this.visible = options.visible;
    this.$list = $('<div class="quantity-dropdown__list js-quantity-dropdown__list"></div>');
    this.$items = $('<div class="quantity-dropdown__items"></div>');
    this.$apply = '';
    this.$clean = '';
    this.init();
  }
  
  init() {
    document.addEventListener('click', this.hideCalendar.bind(this));
    this.initOptions();
    this.initButtons();
    this.$list.append(this.$items);
    this.$element.append(this.$list);
    this.initOptionsEvents();
    this.initButtonsEvents();
    this.initEvents();
    this.setInputValue();
    if (!this.visible) {
      this.hideCalendar();
    }
    this.isZero();
  }

  initButtons() {
    if (this.buttons) {
      const buttons = $('<div class="quantity-dropdown__buttons"></div>');
      this.$apply = $('<button class="small-button" type="button">Применить</button>');
      this.$clean = $('<button class="small-button" type="button">Очистить</button>');

      buttons.append(this.$clean);
      buttons.append(this.$apply);
      this.$items.append(buttons);
    }
  }

  initEvents() {
    this.$element.on('click', this.handleElementClick.bind(this));
  }

  handleElementClick(evt) {
    evt.preventDefault();
    evt.stopPropagation();
    if (this.$list.hasClass('quantity-dropdown__list_hidden')) {
      this.showCalendar();
    } else {
      this.hideCalendar();
    }
  }

  initOptions() {
    if (Array.isArray(this.options)) {
      let options = '';
      this.options.forEach((option, idx) => {
        let minus = '<button class="quantity-dropdown__action" type="button">-</button>';
        const plus = '<button class="quantity-dropdown__action" type="button">+</button>';
        if (option.value === 0) {
          minus = '<button class="quantity-dropdown__action quantity-dropdown__action_disabled" type="button">-</button>';
        }

        options += `
          <div class="quantity-dropdown__item">
            <div class="quantity-dropdown__name"><h3 class="title-3">${option.name}</h3></div>
            <div class="quantity-dropdown__actions" data-id="${idx}">
              ${minus}
              <div class="quantity-dropdown__value">
                <h3 class="title-3">${option.value}</h3>
              </div> 
              ${plus}
            </div>
          </div>
        `;
      });

      this.$items.append(options);
    }
  }

  initButtonsEvents() {
    if (this.$apply) {
      this.$apply.on('click', this.handleApplyButtonClick.bind(this));
    }
    if (this.$clean) {
      this.$clean.on('click', this.handleCleanButtonClick.bind(this));
    }
  }

  handleApplyButtonClick() {
    this.hideCalendar();
  }

  handleCleanButtonClick() {
    this.resetState();
  }

  hideCalendar() {
    $('.js-quantity-dropdown__list').addClass('quantity-dropdown__list_hidden');
  }

  showCalendar() {
    $('.js-quantity-dropdown__list').addClass('quantity-dropdown__list_hidden');
    this.$list.removeClass('quantity-dropdown__list_hidden');
  }

  handleQuantityDropdownItemsClick(evt) {
    evt.stopPropagation();
    const isButton = evt.target.tagName.toLocaleLowerCase() === 'button'
    const isMinus = evt.target.textContent === '-'
    const isPlus = evt.target.textContent === '+'
    if (isButton && isMinus) {
      const parent = evt.target.parentElement;
      const idx = +parent.dataset.id;
      if (this.options[idx].value !== 0) {
        this.options[idx].value -= 1;
        const counter = parent.querySelector('.title-3');
        counter.textContent = +counter.textContent - 1;
        this.isZero(evt.target, this.options[idx].value);
      }
    }
    if (isButton && isPlus) {
      const parent = evt.target.parentElement;
      const idx = +parent.dataset.id;
      this.options[idx].value += 1;
      const counter = parent.querySelector('.title-3');
      counter.textContent = +counter.textContent + 1;
      if (this.options[idx].value === 1) {
        parent.querySelector('.quantity-dropdown__action').classList.remove('quantity-dropdown__action_disabled');
      }
      if (this.$clean) {
        this.$clean.removeClass('small-button_hidden');
      }
      this.setInputValue();
    }
  }

  initOptionsEvents() {
    this.$element.find('.quantity-dropdown__items').on('click', this.handleQuantityDropdownItemsClick.bind(this));
  }

  isZero(minusBtn, optionValue) {
    if (optionValue === 0) {
      minusBtn.classList.add('quantity-dropdown__action_disabled');
    }

    let isAllZero = true;
    this.options.forEach((option) => {
      if (option.value !== 0) {
        isAllZero = false;
      }
    });
    if (isAllZero) {
      if (this.$clean) {
        this.$clean.addClass('small-button_hidden');
      }
      this.$input.val('');
    } else {
      this.setInputValue();
    }
  }

  setInputValue() {
    if (this.endings) {
      const total = this.getOptionsValues();
      if (total === 1) {
        this.$input.val(`${total} ${this.endings[0]}`);
      } else if (this.isSecondDeclination(total)) {
        this.$input.val(`${total} ${this.endings[1]}`);
      } else if (total > 4) {
        this.$input.val(`${total} ${this.endings[2]}`);
      }
    } else if (this.words) {
      const str = this.getEndings();
      this.$input.val(str);
    } else {
      let str = this.getEndings();
      if (str.replace(/\s+/g, '').length > 16) {
        str = str.substr(0, 21);
        str = `${str}...`;
      }
      this.$input.val(str);
    }
  }

  getEndings() {
    const result = this.getOptionsValues();
    let str = '';
    Object.keys(result).forEach((key) => {
      const { value } = result[key];
      if (value === 1) {
        str += `${value} ${result[key].endings[0]},`;
      } else if (this.isSecondDeclination(value)) {
        str += ` ${value} ${result[key].endings[1]},`;
      } else if (value > 4) {
        str += ` ${value} ${result[key].endings[2]},`;
      }
    });
    str = str.substring(0, str.length - 1);
    return str;
  }

  isSecondDeclination(num) {
    const isMoreThanOne = num > 1
    const isLessThanFive = num < 5
    return isMoreThanOne && isLessThanFive
  }

  getOptionsValues() {
    if (this.endings) {
      let total = 0;
      this.options.forEach((option) => {
        total += option.value;
      });
      return total;
    } if (this.words) {
      const result = { };
      result['0'] = { value: this.options[0].value + this.options[1].value, endings: this.words[0] };
      result['1'] = { value: this.options[2].value, endings: this.words[1] };
      return result;
    }
    const result = { };
    this.options.forEach((option) => {
      result[option.name] = { value: option.value, endings: option.endings };
    });
    return result;
  }

  resetState() {
    this.value = '';
    this.options.forEach((option, idx) => {
      this.options[idx].value = 0;
    });
    this.$input.val('');
    this.$element.find('.quantity-dropdown__action').each((idx, btn) => {
      if (btn.textContent === '-') {
        btn.classList.add('quantity-dropdown__action_disabled');
      }
    });
    this.$element.find('.quantity-dropdown__value .title-3').text('0');
    this.$clean.addClass('small-button_hidden');
  }
}

export default QuantityDropdown;
