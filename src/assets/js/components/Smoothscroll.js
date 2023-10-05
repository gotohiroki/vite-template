export default class SmoothScroll {
  constructor() {
    const easing = t => t < 0.5 ? 4 * t * t * t : (t - 1) * (2 * t - 2) * (2 * t - 2) + 1;
    const duration = 600;
    const headerHeight = 0;
    const triggers = document.querySelectorAll('a[href^="#"]');

    triggers.forEach( item => {
      item.addEventListener('click', e => {
        e.preventDefault();
        e.stopPropagation();

        const href = item.getAttribute('href');
        const currentPosition = document.documentElement.scrollTop || document.body.scrollTop;
        const targetElement = document.getElementById(href.replace('#', ''));

        if (targetElement) {
          const targetPosition = window.pageYOffset + targetElement.getBoundingClientRect().top - headerHeight;
          const startTime = window.performance.now();

          const loop = nowTime => {
            const time = nowTime - startTime;
            const normalizedTime = time / duration;
            if (normalizedTime < 1) {
              window.scrollTo(0, currentPosition + ((targetPosition - currentPosition) * easing(normalizedTime)));
              window.requestAnimationFrame(loop);
            } else {
              window.scrollTo(0, targetPosition);
            }
          };

          window.requestAnimationFrame(loop);
        }
      });
    });
  }
}