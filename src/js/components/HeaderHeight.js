export default class HeaderHeight {
  constructor() {
    this.header = document.querySelector('.header');
    this.observer = null;
    this.init();
  }

  init() {
    if (!this.header) return;

    this.updateHeight();

    this.observer = new MutationObserver(() => this.updateHeight());
    this.observer.observe(this.header, {
      attributes: true,
      childList: true,
      subtree: true
    });

    window.addEventListener('resize', () => this.updateHeight());
  }

  updateHeight() {
    const height = this.header.offsetHeight;
    document.documentElement.style.setProperty('--header-height', `${height}px`);
  }

  destroy() {
    if (this.observer) {
      this.observer.disconnect();
    }
    window.removeEventListener('resize', () => this.updateHeight());
  }
}