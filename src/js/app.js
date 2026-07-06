import HeaderHeight from './components/HeaderHeight';
import Modal from './components/Modal';
import UnifiedNavigation from './components/Navigation';
import { initSmoothScrolling } from './components/SmoothScrolling';
import { initHeaderScrollEffect } from './components/HeaderScrollEffect';
import { initAccessibility } from './components/Accessibility';
import { debounce } from './utils/debounce';
import { setAppHeight } from './config/setAppHeight';

import './components/swiper.js';
import './components/dynamic_adapt.js';
import './components/aos.js';
import './components/inputmask.js';
import './components/toast.js';
import './components/counter.js';
import { Fancybox } from '@fancyapps/ui';
import '@fancyapps/ui/dist/fancybox/fancybox.css';
import { initFormSender } from './components/FormSenderInit.js';
import { initCookieNotice } from './components/cookieNotice.js';
import { initFormPrivacy } from './components/formPrivacy.js';

setAppHeight();
window.addEventListener('DOMContentLoaded', setAppHeight);
window.addEventListener('resize', setAppHeight);

document.addEventListener('DOMContentLoaded', () => {
  initCookieNotice();
  initFormPrivacy();

  const navigation = new UnifiedNavigation();
  new Modal();
  new HeaderHeight();

  initSmoothScrolling(navigation);
  initHeaderScrollEffect();
  initAccessibility();
  initFormSender();

  const handleResize = debounce(() => {
    navigation.handleResize();
  }, 250);

  window.addEventListener('resize', handleResize);

  setTimeout(() => {
    document.body.classList.add('loaded');
  }, 100);
});

window.HeaderComponents = {
  UnifiedNavigation,
  Modal,
};

Fancybox.bind('[data-fancybox]', {
  Thumbs: false,
  Toolbar: false,
  closeButton: 'top',
  Image: {
    zoom: true,
  },
});
