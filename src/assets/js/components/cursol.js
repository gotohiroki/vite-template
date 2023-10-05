export default class Cursol {
  constructor() {
    this.cursor = document.querySelector('#cursor');
    this.cursorCircle = this.cursor.querySelector('.c-cursor__circle');
    this.mouse = {
      x: -100,
      y: -100
    };
    this.pos = {
      x: 0,
      y: 0
    };
    this.speed = 1;

    this.updateCoordinates = this.updateCoordinates.bind(this);
    this.updateCursor = this.updateCursor.bind(this);
    this.loop = this.loop.bind(this);

    this.addEventListeners();
    if ('ontouchstart' in window || navigator.maxTouchPoints) {
    } else {
      this.loop();
    }
  }

  addEventListeners() {
    window.addEventListener('mousemove', this.updateCoordinates);

    const cursorModifiers = document.querySelectorAll('[cursor-class]');
    cursorModifiers.forEach(curosrModifier => {
      curosrModifier.addEventListener('mouseenter', () => {
        const className = curosrModifier.getAttribute('cursor-class');
        this.cursor.classList.add(className);
      });

      curosrModifier.addEventListener('mouseleave', () => {
        const className = curosrModifier.getAttribute('cursor-class');
        this.cursor.classList.remove(className);
      });
    });
  }

  updateCoordinates(e) {
    this.mouse.x = e.clientX;
    this.mouse.y = e.clientY;
  }

  getAngle(diffX, diffY) {
    return Math.atan2(diffY, diffX) * 180 / Math.PI;
  }

  getSqueeze(diffX, diffY) {
    const distance = Math.sqrt(Math.pow(diffX, 2) + Math.pow(diffY, 2));
    const maxSqueeze = 0.15;
    const accelerator = 1500;
    return Math.min(distance / accelerator, maxSqueeze);
  }

  updateCursor() {
    const diffX = Math.round(this.mouse.x - this.pos.x);
    const diffY = Math.round(this.mouse.y - this.pos.y);

    this.pos.x += diffX * this.speed;
    this.pos.y += diffY * this.speed;

    const angle = this.getAngle(diffX, diffY);
    const squeeze = this.getSqueeze(diffX, diffY);


    let translate;
    let scale;
    // let rotate;
    translate = 'translate3d(' + this.pos.x + 'px ,' + this.pos.y + 'px, 0)';
    scale = 'scale(' + (1 + squeeze) + ', ' + (1 - squeeze) + ')';
    // rotate = 'rotate(' + angle + 'deg)';

    this.cursor.style.transform = translate;
    // this.cursorCircle.style.transform = rotate + scale;
    this.cursorCircle.style.transform = scale;
  }

  loop() {
    this.updateCursor();
    requestAnimationFrame(this.loop);
  }
}
