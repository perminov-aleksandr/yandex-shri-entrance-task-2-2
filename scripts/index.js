import MicroModal from 'micromodal';
import FavouriteDevices from './favourite-devices.js';
import Header from './header.js';
import SliderControl from './slider-control.js';
import KnobControl from './knob-control.js';
import Animations from './animations.js';

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

document.getElementById("fav-scripts__scroll-right").addEventListener('click', (e) => {
    document.getElementById("fav-scripts__content").scrollBy(200, 0);
});
document.getElementById("fav-scripts__scroll-left").addEventListener('click', (e) => {
    document.getElementById("fav-scripts__content").scrollBy(-200, 0);
});

document.getElementById("fav-devices__scroll-right").addEventListener('click', (e) => {
    document.getElementById("fav-devices__content").scrollBy(200, 0);
});
document.getElementById("fav-devices__scroll-left").addEventListener('click', (e) => {
    document.getElementById("fav-devices__content").scrollBy(-200, 0);
});