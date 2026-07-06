export function initAccessibility() {
  const dropdownToggles = document.querySelectorAll('[data-dropdown-toggle]');
  const dropdowns = document.querySelectorAll('.nav__dropdown');
  const menuToggle = document.querySelector('.actions__menu-toggle');
  const navElement = document.querySelector('.nav');
  
  dropdownToggles.forEach((toggle, index) => {
    const dropdown = toggle.nextElementSibling;
    
    if (dropdown) {
      const dropdownId = `dropdown-${index}`;
      
      toggle.setAttribute('aria-haspopup', 'true');
      toggle.setAttribute('aria-expanded', 'false');
      toggle.setAttribute('aria-controls', dropdownId);
      
      dropdown.setAttribute('id', dropdownId);
      dropdown.setAttribute('aria-hidden', 'true');
    }
  });
  
  if (navElement) {
    navElement.setAttribute('role', 'navigation');
    navElement.setAttribute('aria-label', 'Основная навигация');
  }
  
  if (menuToggle) {
    menuToggle.setAttribute('aria-label', 'Открыть/закрыть меню');
    menuToggle.setAttribute('aria-expanded', 'false');
  }
}