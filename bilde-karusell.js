// import "swiper/css";
// import "swiper/css/navigation"
// import "swiper/css/pagination"

// import "./css/endre-farger-knapper.css";
new Swiper('.card-wrapper', {
  loop: true,

  // If we need pagination
  pagination: {
    el: '.swiper-pagination',
    clickable: true,
    // dynamicBullets: true
  },

  // Navigation arrows
  navigation: {
    nextEl: '.swiper-button-next',
    prevEl: '.swiper-button-prev',
  },

  
});