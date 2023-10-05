export default class LoopSlider {
  constructor(target, speed) {
    this.scrollSliders = document.querySelectorAll(target);
    this.speed = speed;

    this.initializeSliders = this.initializeSliders.bind(this);
    this.updateSlider = this.updateSlider.bind(this);
    this.handleResize = this.handleResize.bind(this);

    this.initializeSliders();
    this.addEventListeners();
  }

  addEventListeners() {
    window.addEventListener('resize', this.handleResize);
  }

  initializeSliders() {
    this.scrollSliders.forEach((slider) => {
      const children = slider.children;
      const childLength = children.length;
      let baseChildren = '';
      for (let i = 0; i < children.length; i++) {
        baseChildren += children[i].outerHTML;
      }

      const firstChild = slider.firstElementChild;
      const styles = getComputedStyle(firstChild);

      let winWidth = window.innerWidth;
      let sliderWidth;
      let countWidth = 0;
      let addCount = 1;
      const initializeSlider = (countWidth, addCount) => {
        let checkWidth = winWidth * 2;
        let width = parseFloat(styles.width);
        let marginRight = parseFloat(styles.marginRight);
        sliderWidth = (width + marginRight) * childLength;
        while (countWidth < checkWidth) {
          slider.insertAdjacentHTML('beforeend', baseChildren);
          ++addCount;
          countWidth = sliderWidth * addCount;
        }
      };
      initializeSlider(countWidth, addCount);

      let unit = '-';
      const isReverse = slider.classList.contains('is-reverse');
      if (isReverse) {
        unit = '';
        slider.style.marginLeft = '-' + sliderWidth + 'px';
      }

      const keyframes = {
        transform: 'translateX(' + unit + sliderWidth + 'px)'
      };
      const timing = {
        fill: 'backwards',
        duration: sliderWidth / this.speed,
        easing: 'linear',
        iterations: Infinity
      };
      let slideAnime = slider.animate(keyframes, timing);

      let timeoutId;
      let lastWinWidth = window.innerWidth;
      const handleResize = () => {
        clearTimeout(timeoutId);

        timeoutId = setTimeout(() => {
          if (lastWinWidth !== window.innerWidth) {
            lastWinWidth = window.innerWidth;
            winWidth = lastWinWidth;

            initializeSlider(countWidth, addCount);

            if (isReverse) {
              slider.style.marginLeft = '-' + sliderWidth + 'px';
            }
            slideAnime.effect.updateTiming({
              iterations: 1
            });
            slideAnime.finish();

            keyframes.transform = 'translateX(' + unit + sliderWidth + 'px)';
            timing.duration = sliderWidth / this.speed;
            slideAnime = slider.animate(keyframes, timing);
          }
        }, 500);
      };
      this.handleResize = handleResize;
    });
  }

  updateSlider() {
  }

	handleResize() {
    // メソッドの実装
  }
}
