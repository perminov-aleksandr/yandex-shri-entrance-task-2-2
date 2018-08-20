const ORIENTATION_HORIZONTAL = "horizontal";
const ORIENTATION_VERTICAL = "vertical";

export default {
    onOrientationChange(newOrientation) {
        this.slider.style[this.sliderPositionProperty] = "";
        this.orientation = newOrientation;
        this.updateClass();
        this.setSliderPosition(this.getCurrentValue());
    },

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

        this.onOrientationChange(this.calculateOrientation());        
        window.addEventListener('resize', () => {
            const newOrientation = this.calculateOrientation();
            if (newOrientation !== this.orientation)
                this.onOrientationChange(newOrientation);
        });

        this.setSliderPosition(this.getCurrentValue());

        const onMoveListener = (ev) => {
            if (this.dragging)
                this.onMouseMove(ev.type === 'touchmove' ? ev.touches[0] : ev);
        };
        const onDownListener = (ev) => {            
            this.dragging = true;
            if (ev.type === 'touchstart') {
                this.setMousePosition(ev.touches[0]);
                window.addEventListener('touchmove', onMoveListener);
            } else {
                this.setMousePosition(ev);
                window.addEventListener('mousemove', onMoveListener);
            }
        };
        const onUpListener = (ev) => {
            this.dragging = false;
            if (ev.type === 'touchend')
                window.removeEventListener('touchmove', onMoveListener);            
            else
                window.removeEventListener('mousemove', onMoveListener);            
        };

        this.slider.addEventListener('touchstart', onDownListener);
        this.slider.addEventListener('mousedown', onDownListener);
        window.addEventListener('touchend', onUpListener);
        window.addEventListener('mouseup', onUpListener);
    },

    getCurrentValue() {
        const currentValue = this.control.getAttribute('data-value');
        this.currentValue = parseInt(currentValue);
        return this.currentValue;
    },

    setCurrentValue(position) {
        if (position > 100)
            position = 100;

        this.currentValue = position;
        this.control.setAttribute('data-value', Math.round(position));
    },

    setSliderPosition(percent) {
        this.setCurrentValue(percent);

        const maxSliderPositionPercent = this.maxSliderPercent;
        if (percent < 0)
            percent = 0;
        if (percent > maxSliderPositionPercent)
            percent = maxSliderPositionPercent;
        
        this.slider.style[this.sliderPositionProperty] = `${percent}%`;
    },

    setMousePosition(ev) {
        this.mousePosition = {x: ev.screenX, y: ev.screenY};
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
        return this.currentValue + 100.0 * positionDiff[this.coordinate] / (this.control[this.dimension]);
    },

    get maxSliderPercent() {
        return 100 * (this.control[this.dimension] - this.slider[this.dimension]) / this.control[this.dimension];
    },

    onMouseMove(ev) {
        if (ev.type === 'touchmove')
            ev = ev.touches[0];
        const newMousePosition = {x: ev.screenX, y: ev.screenY};
        console.log('newPosition', newMousePosition);

        const positionDiff = { 
            x: newMousePosition.x - this.mousePosition.x,
            y: newMousePosition.y - this.mousePosition.y,
        };
        console.log('positionDiff', positionDiff);
        
        let newSliderPositionPercent = this.calculateNewSliderPosition(positionDiff);
        this.setSliderPosition(newSliderPositionPercent);
        this.setMousePosition(ev);      
    }
}