export default class Accordion {
  constructor(trigger) {
    this.triggers = document.querySelectorAll(trigger);
    this.init();
  }

  init() {
    this.triggers.forEach((trigger) => {
      const OPEN = trigger.querySelector('.js-accordion-open');
      const CLOSE = trigger.querySelector('.js-accordion-close');
      const target__panel = trigger.querySelector(".c-accordion__panel");

      // Close accordion when clicking outside of .p-about-client__body
      document.addEventListener('click', (e) => {
        const isOutsideClick = !e.target.closest('.p-about-client__body');
        if (isOutsideClick) {
          this._closeAllPanels();
        }
      });

      // console.log(OPEN, CLOSE)
      if (OPEN) {
        OPEN.addEventListener('click', (e) => {
          this._closeAllPanels();
          target__panel.classList.remove('__close');
        });
      }
      if (CLOSE) {
        CLOSE.addEventListener('click', (e) => {
          target__panel.classList.add('__close');
        });
      }

      const logo = trigger.querySelector('.c-accordion__panel > .p-about-client__item__logo');
      if (logo) {
        logo.addEventListener('click', (e) => {
          const target__panel = trigger.querySelector('.c-accordion__panel');
          if (!target__panel.classList.contains('close')) {
            target__panel.classList.add('__close');
          }
        });
      }

    });
  }

  _closeAllPanels() {
    this.triggers.forEach((trigger) => {
      const target__panel = trigger.querySelector(".c-accordion__panel");
      target__panel.classList.add('__close');
    });
  }
}