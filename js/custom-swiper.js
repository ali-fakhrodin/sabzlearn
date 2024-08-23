var swiper = new Swiper(".swiper-container", {
  slidesPerView: 3,
  spaceBetween: 15,
  speed: 1000,
  loop: true,
  pagination: {
    el: ".swiper-pagination",
    type: "bullets",
  },
  autoplay: {
    delay: 3000,
  },

  breakpoints: {
    576: {
      slidesPerView: 1
    },
    768: {
      slidesPerView: 2
    },
    1200: {
      slidesPerView: 3
    },
  }
});