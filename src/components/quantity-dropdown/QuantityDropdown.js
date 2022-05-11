import { boundMethod } from 'autobind-decorator';
import * as $ from 'jquery';

class QuantityDropdown {
  constructor(element, options) {
    this._$element = $(element);
    this._$dropdown = this._$element.find('.js-dropdown');
    this._$input = this._$element.find('.js-dropdown__input');
    this._value = '';
    this._buttons = options.buttons;
    this._options = options.options;
    this._endings = options.endings;
    this._words = options.words;
    this._visible = options.visible;
    this._$list = $('<div class="quantity-dropdown__list js-quantity-dropdown__list"></div>');
    this._$items = $('<div class="quantity-dropdown__items"></div>');
    this._$apply = '';
    this._$clean = '';
    this._init();
  }

  _init() {
    document.addEventListener('click', this._hideCalendar);
    this._initOptions();
    this._initButtons();
    this._$list.append(this._$items);
    this._$element.append(this._$list);
    this._initOptionsEvents();
    this._initButtonsEvents();
    this._initEvents();
    this._setInputValue();
    if (!this._visible) {
      this._hideCalendar();
    }
    this._isZero();
  }

  _initButtons() {
    if (this._buttons) {
      const buttons = $('<div class="quantity-dropdown__buttons"></div>');
      this._$apply = $('<button class="small-button" type="button">Применить</button>');
      this._$clean = $('<button class="small-button" type="button">Очистить</button>');

      buttons.append(this._$clean);
      buttons.append(this._$apply);
      this._$items.append(buttons);
    }
  }

  _initEvents() {
    this._$element.on('click', this._handleElementClick);
  }

  @boundMethod
  _handleElementClick(evt) {
    evt.preventDefault();
    evt.stopPropagation();
    if (this._$list.hasClass('quantity-dropdown__list_hidden')) {
      this._showCalendar();
    } else {
      this._hideCalendar();
    }
  }

  _initOptions() {
    if (Array.isArray(this._options)) {
      let options = '';
      this._options.forEach((option, idx) => {
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

      this._$items.append(options);
    }
  }

  _initButtonsEvents() {
    if (this._$apply) {
      this._$apply.on('click', this._handleApplyButtonClick);
    }
    if (this._$clean) {
      this._$clean.on('click', this._handleCleanButtonClick);
    }
  }

  @boundMethod
  _handleApplyButtonClick() {
    this._hideCalendar();
  }

  @boundMethod
  _handleCleanButtonClick() {
    this._resetState();
  }

  @boundMethod
  _hideCalendar() {
    $('.js-quantity-dropdown__list').addClass('quantity-dropdown__list_hidden');
  }

  _showCalendar() {
    $('.js-quantity-dropdown__list').addClass('quantity-dropdown__list_hidden');
    this._$list.removeClass('quantity-dropdown__list_hidden');
  }

  @boundMethod
  _handleQuantityDropdownItemsClick(evt) {
    evt.stopPropagation();
    const isButton = evt.target.tagName.toLocaleLowerCase() === 'button';
    const isMinus = evt.target.textContent === '-';
    const isPlus = evt.target.textContent === '+';
    if (isButton && isMinus) {
      const parent = evt.target.parentElement;
      const idx = +parent.dataset.id;
      if (this._options[idx].value !== 0) {
        this._options[idx].value -= 1;
        const counter = parent.querySelector('.title-3');
        counter.textContent = +counter.textContent - 1;
        this._isZero(evt.target, this._options[idx].value);
      }
    }
    if (isButton && isPlus) {
      const parent = evt.target.parentElement;
      const idx = +parent.dataset.id;
      this._options[idx].value += 1;
      const counter = parent.querySelector('.title-3');
      counter.textContent = +counter.textContent + 1;
      if (this._options[idx].value === 1) {
        parent.querySelector('.quantity-dropdown__action').classList.remove('quantity-dropdown__action_disabled');
      }
      if (this._$clean) {
        this._$clean.removeClass('small-button_hidden');
      }
      this._setInputValue();
    }
  }

  _initOptionsEvents() {
    this._$element.find('.quantity-dropdown__items').on('click', this._handleQuantityDropdownItemsClick);
  }

  _isZero(minusBtn, optionValue) {
    if (optionValue === 0) {
      minusBtn.classList.add('quantity-dropdown__action_disabled');
    }

    let isAllZero = true;
    this._options.forEach((option) => {
      if (option.value !== 0) {
        isAllZero = false;
      }
    });
    if (isAllZero) {
      if (this._$clean) {
        this._$clean.addClass('small-button_hidden');
      }
      this._$input.val('');
    } else {
      this._setInputValue();
    }
  }

  _setInputValue() {
    if (this._endings) {
      const total = this._getOptionsValues();
      if (total === 1) {
        this._$input.val(`${total} ${this._endings[0]}`);
      } else if (this._isSecondDeclination(total)) {
        this._$input.val(`${total} ${this._endings[1]}`);
      } else if (total > 4) {
        this._$input.val(`${total} ${this._endings[2]}`);
      }
    } else if (this._words) {
      const str = this._getEndings();
      this._$input.val(str);
    } else {
      let str = this._getEndings();
      if (str.replace(/\s+/g, '').length > 16) {
        str = str.substr(0, 21);
        str = `${str}...`;
      }
      this._$input.val(str);
    }
  }

  _getEndings() {
    const result = this._getOptionsValues();
    let str = '';
    Object.keys(result).forEach((key) => {
      const { value } = result[key];
      if (value === 1) {
        str += `${value} ${result[key].endings[0]},`;
      } else if (this._isSecondDeclination(value)) {
        str += ` ${value} ${result[key].endings[1]},`;
      } else if (value > 4) {
        str += ` ${value} ${result[key].endings[2]},`;
      }
    });
    str = str.substring(0, str.length - 1);
    return str;
  }

  _isSecondDeclination(num) {
    const isMoreThanOne = num > 1;
    const isLessThanFive = num < 5;
    return isMoreThanOne && isLessThanFive;
  }

  _getOptionsValues() {
    if (this._endings) {
      let total = 0;
      this._options.forEach((option) => {
        total += option.value;
      });
      return total;
    } if (this._words) {
      const result = { };
      result['0'] = { value: this._options[0].value + this._options[1].value, endings: this._words[0] };
      result['1'] = { value: this._options[2].value, endings: this._words[1] };
      return result;
    }
    const result = { };
    this._options.forEach((option) => {
      result[option.name] = { value: option.value, endings: option.endings };
    });
    return result;
  }

  _resetState() {
    this._value = '';
    this._options.forEach((option, idx) => {
      this._options[idx].value = 0;
    });
    this._$input.val('');
    this._$element.find('.quantity-dropdown__action').each((idx, btn) => {
      if (btn.textContent === '-') {
        btn.classList.add('quantity-dropdown__action_disabled');
      }
    });
    this._$element.find('.quantity-dropdown__value .title-3').text('0');
    this._$clean.addClass('small-button_hidden');
  }
}

export default QuantityDropdown;
