import Swiper from 'swiper';
import MicroModal from 'micromodal';
import FavouriteDevices from './favourite-devices.js';
import Header from './header.js';
import SliderControl from './slider-control.js';

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

FavouriteDevices.init();

Header.init();

MicroModal.init({
    onShow: () => {document.querySelector(".page").classList.add("page_modal")},
    onClose: () => {document.querySelector(".page").classList.remove("page_modal")},
});

SliderControl.init();

