import Swiper from 'swiper';
import MicroModal from 'micromodal';
import FavouriteDevices from './favourite-devices.js';
import Header from './header.js';
import SliderControl from './slider-control.js';
import KnobControl from './knob-control.js';
import Animations from './animations.js';

const scriptsSwiper = new Swiper('.favourite-scripts', {    
    slidesPerView: 'auto', 
    navigation: {
        nextEl: '.favourite-scripts .paging__btn-next',
        prevEl: '.favourite-scripts .paging__btn-prev',
    }
});

const summaryContentSwiper = new Swiper('.summary__content__queue', {
    //slidesPerView: 'auto', 
    direction: 'vertical',
    navigation: {
        nextEl: '.summary__content__queue .paging__btn-next',
        prevEl: '.summary__content__queue .paging__btn-prev',
    }
});

FavouriteDevices.init();

Header.init();

MicroModal.init({
    onShow: (element) => {
        document.querySelector(".page").classList.add("page_modal");        
        Animations.animateModal(element, 300);
    },
    onClose: (ev) => {
        document.querySelector(".page").classList.remove("page_modal");
    },
});

SliderControl.init();

KnobControl.init();

