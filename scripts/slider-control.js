const ORIENTATION_HORIZONTAL = "horizontal";
const ORIENTATION_VERTICAL = "vertical";

export default {
    calculateOrientation() {
        return window.matchMedia('(max-width: 767px)').matches ? ORIENTATION_VERTICAL : ORIENTATION_HORIZONTAL;
    },

    updateClass() {
        this.control.classList.remove('slider-control_horizontal', 'slider-control_vertical');
        this.control.classList.add(this.orientation === ORIENTATION_HORIZONTAL ? 'slider-control_horizontal' : 'slider-control_vertical');
    },

    init() {
        this.control = document.querySelector(".slider-control");
        this.slider = document.querySelector(".slider-control .slider-control__slider");
        this.currentPosition = this.control.getAttribute("data-value");

        this.orientation = this.calculateOrientation();
        this.updateClass();
        window.addEventListener('resize', () => {
            this.orientation = this.calculateOrientation();
            this.updateClass();
        });

        this.setSliderPosition(this.currentPosition);

        const onMouseListenerLamda = (ev) => {            
            if (this.dragging)
                this.onMouseMove(ev);
        };
        this.slider.addEventListener('mousedown', (ev) => {            
            console.log('Mouse DOWN');
            this.dragging = true;
            this.setMousePosition(ev);            
            window.addEventListener('mousemove', onMouseListenerLamda);
        });        
        window.addEventListener('mouseup', (ev) => {            
            this.dragging = false;
            window.removeEventListener('mousemove', onMouseListenerLamda);
            console.log('Mouse UP');
        });
    },

    setSliderPosition(percent) {
        this.slider.style[this.sliderPositionProperty] = `${percent}%`;
    },

    setMousePosition(ev) {
        this.mousePosition = {x: ev.clientX, y: ev.clientY};
    },

    get sliderPositionProperty() {
        return this.orientation === ORIENTATION_HORIZONTAL ? 'left' : 'top';
    },

    get coordinate() {
        return this.orientation === ORIENTATION_HORIZONTAL ? 'x' : 'y';
    },
   
    get dimension() {
        return this.orientation === ORIENTATION_HORIZONTAL ? 'offsetWidth' : 'offsetHeight';
    },

    calculateNewSliderPosition(positionDiff) {
        return parseFloat(this.slider.style[this.sliderPositionProperty]) + 100.0 * positionDiff[this.coordinate] / (this.control[this.dimension]);
    },

    get maxSliderPercent() {
        return 100 * (this.control[this.dimension] - this.slider[this.dimension]) / this.control[this.dimension];
    },

    onMouseMove(ev) {
        const newMousePosition = {x: ev.clientX, y: ev.clientX};
        const positionDiff = { 
            x: newMousePosition.x - this.mousePosition.x,
            y: newMousePosition.y - this.mousePosition.y,
        };

        let newSliderPositionPercent = this.calculateNewSliderPosition(positionDiff);
        const maxSliderPositionPercent = this.maxSliderPercent;

        if (newSliderPositionPercent < 0)
            newSliderPositionPercent = 0;
        if (newSliderPositionPercent > maxSliderPositionPercent)
            newSliderPositionPercent = maxSliderPositionPercent;

        this.setSliderPosition(newSliderPositionPercent);
        this.setMousePosition(ev);      
    }
}