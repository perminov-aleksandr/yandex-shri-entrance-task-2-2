import Swiper from 'swiper';
import MicroModal from 'micromodal';

const scriptsSwiper = new Swiper('.favourite-scripts', {
    slidesPerView: 'auto', 
    // slidesPerView: 3, 
    // slidesPerColumn: 2,
    watchSlidesVisibility: true,   
    navigation: {
        nextEl: '.favourite-scripts .paging__btn-next',
        prevEl: '.favourite-scripts .paging__btn-prev',
    },
});

const devicesSwiper = new Swiper('.favourite-devices', {
    slidesPerView: 'auto', 
    watchSlidesVisibility: true,   
    navigation: {
        nextEl: '.favourite-devices .paging__btn-next',
        prevEl: '.favourite-devices .paging__btn-prev',
    },
});

MicroModal.init();
