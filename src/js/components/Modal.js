export default class Modal {
  constructor() {
    this.isOpen = false;
    this.header = document.querySelector('.header');
    this.modal = document.querySelector('.modal');
    this.formSenderInstance = null;
    this.originalAlert = null;
    this.init();
  }

  init() {
    if (!this.modal) return;

    document.querySelectorAll('[data-modal="callback"]').forEach((btn) => {
      btn.addEventListener('click', () => this.open());
    });

    document.querySelectorAll('[data-modal-close]').forEach((element) => {
      element.addEventListener('click', () => this.close());
    });

    this.modal.addEventListener('click', (e) => {
      if (e.target === this.modal.querySelector('.modal__overlay')) {
        this.close();
      }
    });

    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && this.isOpen) {
        this.close();
      }
    });
  }

  lockScroll() {
    const scrollbarWidth = `${window.innerWidth - document.body.offsetWidth}px`;
    document.body.style.paddingRight = scrollbarWidth;
    if (this.header) {
      this.header.style.paddingRight = scrollbarWidth;
    }
    document.body.classList.add('no-scroll');
  }

  unlockScroll() {
    document.body.style.paddingRight = '';
    if (this.header) {
      this.header.style.paddingRight = '';
    }
    document.body.classList.remove('no-scroll');
  }

  open() {
    if (this.isOpen) return;
    this.isOpen = true;
    this.modal.classList.add('is-open');
    this.lockScroll();

    if (!this.formSenderInstance) {
      const formWrapper = this.modal.querySelector('.form-wrapper');
      if (formWrapper && typeof FormSender !== 'undefined') {
        if (formWrapper.hasAttribute('data-form-sender-initialized')) {
          return;
        }

        formWrapper.setAttribute('data-form-sender-initialized', 'true');
        const modalFormSelector = `#${this.modal.id || 'callback-modal'} .form-wrapper`;

        if (typeof FormSenderMessager !== 'undefined' && window.Toast) {
          this.formSenderInstance = new FormSender({
            formWrapper: modalFormSelector,
            messager: new FormSenderMessager(
              (msg) => {
                window.Toast.success(msg);
                const form = formWrapper.querySelector('form');
                if (form) form.reset();
                setTimeout(() => this.close(), 2000);
              },
              (msg) => {
                window.Toast.error(msg);
              }
            ),
          });
        } else {
          if (!this.originalAlert) {
            this.originalAlert = window.alert;
          }

          if (window.Toast) {
            window.alert = (message) => {
              if (
                message.includes('ошибка') ||
                message.includes('Ошибка') ||
                message.includes('error') ||
                message.includes('Error')
              ) {
                window.Toast.error(message);
              } else if (
                message.includes('Спасибо') ||
                message.includes('успешно') ||
                message.includes('success') ||
                message.includes('Success')
              ) {
                window.Toast.success(message);
                const form = formWrapper.querySelector('form');
                if (form) form.reset();
                setTimeout(() => this.close(), 2000);
              } else {
                window.Toast.info(message);
              }
            };
          }

          this.formSenderInstance = new FormSender({
            formWrapper: modalFormSelector,
          });
        }
      }
    }

    const firstInput = this.modal.querySelector('input, select, textarea');
    if (firstInput) {
      setTimeout(() => firstInput.focus(), 100);
    }
    this.trapFocus();
  }

  close() {
    if (!this.isOpen) return;
    this.isOpen = false;
    this.modal.classList.remove('is-open');
    this.unlockScroll();
    this.removeTrapFocus();

    if (this.originalAlert) {
      window.alert = this.originalAlert;
    }

    const lastActiveTrigger = document.querySelector('[data-modal="callback"]:focus');
    if (lastActiveTrigger) {
      lastActiveTrigger.focus();
    }
  }

  destroy() {
    this.formSenderInstance = null;
    if (this.originalAlert) {
      window.alert = this.originalAlert;
      this.originalAlert = null;
    }
  }

  trapFocus() {
    const focusableElements = this.modal.querySelectorAll(
      'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
    );
    if (focusableElements.length === 0) return;

    const firstElement = focusableElements[0];
    const lastElement = focusableElements[focusableElements.length - 1];

    this.handleTabKey = (e) => {
      if (e.key !== 'Tab') return;

      if (e.shiftKey) {
        if (document.activeElement === firstElement) {
          e.preventDefault();
          lastElement.focus();
        }
      } else if (document.activeElement === lastElement) {
        e.preventDefault();
        firstElement.focus();
      }
    };

    document.addEventListener('keydown', this.handleTabKey);
  }

  removeTrapFocus() {
    if (this.handleTabKey) {
      document.removeEventListener('keydown', this.handleTabKey);
      this.handleTabKey = null;
    }
  }
}
