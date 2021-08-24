const swiper = new Swiper('.swiper-container', {
  direction: 'horizontal',
  slidesPerView: 'auto',
  centeredSlides: false,
  loop: true,
  preventClicks: false,
  preventClicksPropagation: false,
  slideToClickedSlide: false,
  navigation: {
    nextEl: '.swiper-button-next',
    prevEl: '.swiper-button-prev',
  },
})
