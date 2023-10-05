import GSAP from 'gsap';

export default class ToggleMenu {
  constructor(nav, toggle, link) {
    this.DOM = {};
    this.DOM.nav = document.querySelector(nav);
    this.DOM.toggle = document.querySelector(toggle);
    this.DOM.items = document.querySelectorAll(link);
    this.DOM.body = document.body;
    this.DOM.y = 0;

    this.eventType = this._getEventType();
    this.bgImage();
    this.play();

  }

  _getEventType() {
    return window.ontouchstart ? 'touchstart' : 'click'
  }

  bgImage() {

    this.DOM.toggle.addEventListener(this.eventType, () => {

      const images = document.querySelectorAll('.l-megamenu__image');
      const randomIndex = Math.floor(Math.random() * images.length);

      if(this.DOM.toggle.getAttribute('aria-expanded') === 'true') {
        // 全ての画像から「is-current」クラスを削除します
        images.forEach((image) => {
          image.classList.remove('is-current');
          GSAP.to(image, {
            opacity: 0,
            duration: .6,
            display: 'none',
            ease: 'power2.out',
          })
        });
        document.body.classList.remove('_white');
      } else {
        // ランダムに選択された画像に「is-current」クラスを追加します
        images[randomIndex].classList.add('is-current');
        GSAP.to(images[randomIndex], {
            opacity: 1,
            display: 'block',
            duration: .6,
            ease: 'power2.out',
          })

        images.forEach((image) => {
          const hasCurrentClass = image.classList.contains('is-current');
          const hasWhiteClass = image.classList.contains('is-white');
          if (hasCurrentClass && hasWhiteClass) {
            document.body.classList.add('_white');
          }
        });
      }

    });

    const sTargets = document.querySelectorAll('.js-smoothScroll');
    sTargets.forEach(sTarget => {
      sTarget.addEventListener(this.eventType, (e) => {
        const images = document.querySelectorAll('.l-megamenu__image');
        const randomIndex = Math.floor(Math.random() * images.length);

        if(this.DOM.toggle.getAttribute('aria-expanded') === 'true') {
          // 全ての画像から「is-current」クラスを削除します
          images.forEach((image) => {
            image.classList.remove('is-current');
          });
          document.body.classList.remove('_white');
        } else {
          // ランダムに選択された画像に「is-current」クラスを追加します
          images[randomIndex].classList.add('is-current');

          images.forEach((image) => {
            const hasCurrentClass = image.classList.contains('is-current');
            const hasWhiteClass = image.classList.contains('is-white');
            if (hasCurrentClass && hasWhiteClass) {
              document.body.classList.add('_white');
            }
          });
        }
      })
    })

    // this.DOM.items.forEach((item,i) => {
    //   item.addEventListener(this.eventType, (e) => {

    //   const images = document.querySelectorAll('.l-megamenu__image');
    //   const randomIndex = Math.floor(Math.random() * images.length);

    //   if(this.DOM.toggle.getAttribute('aria-expanded') === 'true') {
    //     // 全ての画像から「is-current」クラスを削除します
    //     images.forEach((image) => {
    //       image.classList.remove('is-current');
    //     });
    //     document.body.classList.remove('_white');
    //   } else {
    //     // ランダムに選択された画像に「is-current」クラスを追加します
    //     images[randomIndex].classList.add('is-current');

    //     images.forEach((image) => {
    //       const hasCurrentClass = image.classList.contains('is-current');
    //       const hasWhiteClass = image.classList.contains('is-white');
    //       if (hasCurrentClass && hasWhiteClass) {
    //         document.body.classList.add('_white');
    //       }
    //     });
    //   }
    //   });
    // })

  }

  _menuOpen() {
    this.DOM.y = window.scrollY;
    this.DOM.toggle.setAttribute('aria-expanded', 'true');
    this.DOM.toggle.setAttribute('aria-label', 'CLOSE');
    this.DOM.nav.setAttribute('aria-hidden', 'false');
  }

  _menuClose() {
    this.DOM.toggle.setAttribute('aria-expanded', 'false');
    this.DOM.toggle.setAttribute('aria-label', 'MENU');
    this.DOM.nav.setAttribute('aria-hidden', 'true');
  }

  play() {
    this.DOM.toggle.addEventListener(this.eventType, () => {
      if(this.DOM.toggle.getAttribute('aria-expanded') === 'true') {
        this._menuClose()
      } else {
        this._menuOpen()
      }
    });

    // 調整が必要
    const ts = document.querySelectorAll('.js-smoothScroll');
    ts.forEach(sTarget => {
      sTarget.addEventListener('click', (e) => {
        console.log('aaaaa');
        this._menuClose();
      })
    });


    window.addEventListener(this.eventType, e => {
    if(e.target === this.DOM.nav) {
        this._menuClose()
      }
    });

    // this.DOM.items.forEach((item,i) => {
    //   item.addEventListener(this.eventType, (e) => {
    //     this._menuClose()
    //   });
    // })

  }
}