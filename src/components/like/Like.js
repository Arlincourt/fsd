

class Like {
  constructor(element) {
    this.$element = $(element)
    this.$icon = this.$element.find('.js-like__icon')
    this.init()
  }

  init() {
    this.addClickEvent()
  }

  addClickEvent() {
    this.$element.on('click', () => {
      if(this.$element.hasClass('like_active')) {
        this.$element.removeClass('like_active')

        this.$icon.toggleClass('like__icon_active')
        this.$icon.toggleClass('icon-favorite')
        this.$icon.toggleClass('icon-favorite_border')
        this.decrementValue()
      } else {
        this.$element.addClass('like_active')

        this.$icon.toggleClass('like__icon_active')
        this.$icon.toggleClass('icon-favorite')
        this.$icon.toggleClass('icon-favorite_border')
        this.incrementValue()
      }
    })
  }

  decrementValue() {
    const index = this.$element.html().lastIndexOf('>') + 1
    const value = Number(this.$element.html().substr(index)) - 1
    this.$element.html('')
    this.$element.append(this.$icon)
    this.$element.append(value)
  }
  incrementValue() {
    const index = this.$element.html().lastIndexOf('>') + 1
    const value = Number(this.$element.html().substr(index)) + 1
    this.$element.html('')
    this.$element.append(this.$icon)
    this.$element.append(value)
  }
}

export default Like