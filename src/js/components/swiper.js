import Swiper from "swiper";
import { Pagination, Autoplay, Navigation} from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

const heroSlider = new Swiper(".hero-slider", {
  modules: [Autoplay, Pagination, Navigation],
  loop: true,
  
  autoplay: {
    delay: 6000,
    disableOnInteraction: false,
  },

  pagination: {
    el: ".swiper-pagination",
    clickable: true,
  },
    navigation: {
      nextEl: '.swiper-button-next',
      prevEl: '.swiper-button-prev',
    },
       // Responsive settings
    breakpoints: {
      // When window width is >= 768px
      768: {
        navigation: {
          nextEl: '.swiper-button-next',
          prevEl: '.swiper-button-prev',
        },
      },
      // When window width is >= 1024px
      1024: {
        autoplay: {
          delay: 7000,
        },
      }
    },
});
  const horizontalSliders = document.querySelectorAll('.horizontal-slider');

  horizontalSliders.forEach((horizontalSlider) => {
    new Swiper(horizontalSlider, {
      modules: [Navigation, Pagination],
      slidesPerView: 1.5,
      spaceBetween: 15,
      loop: true,
      navigation: {
        nextEl: '.horizontal-slider .swiper-button-next',
        prevEl: '.horizontal-slider .swiper-button-prev',
      },
      breakpoints: {
        576: {
          slidesPerView: 2,spaceBetween: 20
        },
        768: {
          slidesPerView: 3, spaceBetween: 30
        },
         1200: {
          slidesPerView: 4, spaceBetween: 30
        },
      },
    });
  });
new Swiper(".reviews-slider", {
  modules: [Pagination, Autoplay],
  loop: true,
  autoplay: {
    delay: 6000,
    disableOnInteraction: false,
  },
  pagination: {
    el: ".swiper-pagination",
    clickable: true,
  },
  breakpoints: {
    768: {
      slidesPerView: 2,
      spaceBetween: 20,
    },
    1024: {
      slidesPerView: 3,
      spaceBetween: 30,
    },
  },
});
