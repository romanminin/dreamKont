// counter.js
(() => {
  // настройки
  const SELECTOR   = '.team-stat__number'; // элементы-счётчики
  const DURATION   = 1800;                 // общая длительность анимации (мс)
  const FPS        = 60;                   // кадров в секунду
  const FRAME_STEP = 1000 / FPS;           // мс на кадр

  // извлекаем число из текста (убираем всё лишнее, кроме цифр)
  const extractNumber = str => Number(str.replace(/\D+/g, ''));

  // один счётчик
  class Counter {
    constructor(node) {
      this.node   = node;
      this.end    = extractNumber(node.textContent); // конечное значение
      this.suffix = node.textContent.replace(/[\d\s]+/g, ''); // «+», «%», «лет» и т.д.
      this.start  = 0;
      this.step   = Math.ceil(this.end / (DURATION / FRAME_STEP));
      this.current = this.start;
      this.isRunning = false;
    }

    run() {
      if (this.isRunning) return;
      this.isRunning = true;

      const tick = () => {
        this.current += this.step;
        if (this.current >= this.end) {
          this.current = this.end;
          this.node.textContent = this.current + this.suffix;
          return;
        }
        this.node.textContent = this.current + this.suffix;
        setTimeout(tick, FRAME_STEP);
      };
      tick();
    }
  }

  // запускаем, когда элемент появился
  const observer = new IntersectionObserver((entries, obs) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const counter = new Counter(entry.target);
        counter.run();
        obs.unobserve(entry.target); // больше не следим
      }
    });
  }, { threshold: 0.5 });

  // находим все счётчики и вешаем наблюдатель
  document.querySelectorAll(SELECTOR).forEach(el => observer.observe(el));
})();