export default class UnifiedNavigation {
  constructor() {
    this.isOpen = false;
    this.isMobile = window.innerWidth < 1024;
    this.menuToggle = document.querySelector('.actions__menu-toggle');
    this.nav = document.querySelector('.header__nav');
    this.mobileOverlay = document.querySelector('.header__mobile-overlay');
    this.init();
  }

  init() {
    if (this.menuToggle && this.nav) {
      this.menuToggle.addEventListener('click', () => this.toggle());
      
      if (this.mobileOverlay) {
        this.mobileOverlay.addEventListener('click', () => this.close());
      }

      document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && this.isOpen && this.isMobile) {
          this.close();
        }
      });

      window.addEventListener('resize', () => this.handleResize());
      this.initDropdowns();
    }
  }

  // Добавляем недостающие методы:

  toggle() {
    if (this.isOpen) {
      this.close();
    } else {
      this.open();
    }
  }

  open() {
    this.isOpen = true;
    this.menuToggle.classList.add('is-open');
    this.nav.classList.add('is-open');
    if (this.mobileOverlay) {
      this.mobileOverlay.classList.add('is-open');
    }
    document.body.classList.add('no-scroll');
    
    const firstLink = this.nav.querySelector('.nav__link');
    if (firstLink) {
      setTimeout(() => firstLink.focus(), 100);
    }
  }

  close() {
    this.isOpen = false;
    this.menuToggle.classList.remove('is-open');
    this.nav.classList.remove('is-open');
    if (this.mobileOverlay) {
      this.mobileOverlay.classList.remove('is-open');
    }
    document.body.classList.remove('no-scroll');
    this.closeAllDropdowns();
  }

  handleResize() {
    const wasMobile = this.isMobile;
    this.isMobile = window.innerWidth < 1024;
    
    if (wasMobile && !this.isMobile && this.isOpen) {
      this.close();
    }
    
    if (!wasMobile && this.isMobile) {
      this.closeAllDropdowns();
    }
  }

  initDropdowns() {
    const dropdownToggles = this.nav.querySelectorAll('[data-dropdown-toggle]');
    
    dropdownToggles.forEach(toggle => {
      toggle.addEventListener('click', (e) => {
        if (this.isMobile) {
          e.preventDefault();
          this.toggleDropdown(toggle);
        }
      });
      
      toggle.addEventListener('keydown', (e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          if (this.isMobile) {
            e.preventDefault();
            this.toggleDropdown(toggle);
          }
        }
      });
    });
  }

  toggleDropdown(toggle) {
    if (!this.isMobile) return;
    
    const isOpen = toggle.classList.contains('is-open');
    const dropdown = toggle.nextElementSibling;
    
    if (isOpen) {
      this.closeDropdown(toggle, dropdown);
    } else {
      this.closeSiblingDropdowns(toggle);
      this.openDropdown(toggle, dropdown);
    }
  }

  openDropdown(toggle, dropdown) {
    toggle.classList.add('is-open');
    dropdown.classList.add('is-open');
    toggle.setAttribute('aria-expanded', 'true');
    dropdown.setAttribute('aria-hidden', 'false');
  }

  closeDropdown(toggle, dropdown) {
    toggle.classList.remove('is-open');
    dropdown.classList.remove('is-open');
    toggle.setAttribute('aria-expanded', 'false');
    dropdown.setAttribute('aria-hidden', 'true');
    
    const nestedToggles = dropdown.querySelectorAll('[data-dropdown-toggle].is-open');
    nestedToggles.forEach(nestedToggle => {
      const nestedDropdown = nestedToggle.nextElementSibling;
      this.closeDropdown(nestedToggle, nestedDropdown);
    });
  }

  closeSiblingDropdowns(currentToggle) {
    const parentList = currentToggle.closest('.nav__list, .nav__dropdown');
    if (!parentList) return;
    
    const siblingToggles = parentList.querySelectorAll(':scope > .nav__item [data-dropdown-toggle].is-open, :scope > .nav__dropdown-item [data-dropdown-toggle].is-open');
    
    siblingToggles.forEach(siblingToggle => {
      if (siblingToggle !== currentToggle) {
        const siblingDropdown = siblingToggle.nextElementSibling;
        this.closeDropdown(siblingToggle, siblingDropdown);
      }
    });
  }

  closeAllDropdowns() {
    if (!this.nav) return;
    
    const openToggles = this.nav.querySelectorAll('[data-dropdown-toggle].is-open');
    const openDropdowns = this.nav.querySelectorAll('.nav__dropdown.is-open');
    
    openToggles.forEach(toggle => toggle.classList.remove('is-open'));
    openDropdowns.forEach(dropdown => dropdown.classList.remove('is-open'));
    
    const allToggles = this.nav.querySelectorAll('[data-dropdown-toggle]');
    const allDropdowns = this.nav.querySelectorAll('.nav__dropdown');
    
    allToggles.forEach(toggle => toggle.setAttribute('aria-expanded', 'false'));
    allDropdowns.forEach(dropdown => dropdown.setAttribute('aria-hidden', 'true'));
  }
}