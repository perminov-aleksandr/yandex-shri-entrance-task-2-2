function polarToCartesian(centerX, centerY, radius, angleInDegrees) {
    var angleInRadians = (angleInDegrees-90) * Math.PI / 180.0;
  
    return {
      x: centerX + (radius * Math.cos(angleInRadians)),
      y: centerY + (radius * Math.sin(angleInRadians))
    };
}

function describeArc(x, y, radius, startAngle, endAngle) {
      
    var start = polarToCartesian(x, y, radius, endAngle);
    var end = polarToCartesian(x, y, radius, startAngle);

    var largeArcFlag = endAngle - startAngle <= 180 ? "0" : "1";

    var d = [
        "M", start.x, start.y, 
        "A", radius, radius, 0, largeArcFlag, 0, end.x, end.y
    ].join(" ");

    return d;       
}      

class Knob {
    constructor(element) {   
        this.control = element; 
        
        const svg = this.control.querySelector("svg");
        for (let child of svg.children) {            
            const childClass = child.getAttribute("class");
            if (childClass == "knob-arc")
                this.arc = child;
            if (childClass == "knob-arc-bg")
                this.arcBg = child;
            if (childClass == "knob-helper")
                this.helper = child;
        };

        this.pointer = this.control.querySelector(".knob-control__pointer");
        this.displayedValue = this.control.querySelector(".knob-control__value");

        const onMoveLambda = (ev) => {
            if (this.dragging)
                this.onMove(ev.type === 'touchmove' ? ev.touches[0] : ev);
        };
        const onDownLambda = (ev) => {
            this.dragging = true;
            if (ev.type === 'touchstart') {
                this.setMousePosition(ev.touches[0]);
                window.addEventListener('touchmove', onMoveLambda);
            } else {
                this.setMousePosition(ev);
                window.addEventListener('mousemove', onMoveLambda);
            }            
        };
        const onUpLambda = (ev) => {            
            this.dragging = false;            
            window.removeEventListener('mousemove', onMoveLambda);
            window.removeEventListener('touchmove', onMoveLambda);
        };

        this.control.addEventListener('mousedown', onDownLambda);
        this.control.addEventListener('touchstart', onDownLambda);
        window.addEventListener('mouseup', onUpLambda);
        window.addEventListener('touchEnd', onUpLambda);
        
        this.minDisplayedValue = parseInt(this.control.getAttribute("data-min-value"));
        this.maxDisplayedValue = parseInt(this.control.getAttribute("data-max-value"));

        this.minValue = 30;
        this.maxValue = 360 - this.minValue;
        this.helper.setAttribute("d", describeArc(110, 110, 110, this.maxValue, this.minValue));

        const value = parseInt(this.control.getAttribute("data-value"));
        this.setValue(this.getValueInDegreesFromDisplayed(value));
    }

    getDisplayedValue(valueInDegrees) {        
        const result = (this.maxDisplayedValue - this.minDisplayedValue) * (valueInDegrees - this.minValue) / (this.maxValue - this.minValue) + this.minDisplayedValue;        
        return result;
    }

    getValueInDegreesFromDisplayed(displayedValue) {
        const result = (this.maxValue - this.minValue) * (displayedValue - this.minDisplayedValue) / (this.maxDisplayedValue - this.minDisplayedValue) + this.minValue;        
        return result;
    }

    getMinValue() {
        return this.minValue;
    }

    getMaxValue() {
        return this.maxValue;
    }

    setValue(currentValue) {    
        const maxValue = this.getMaxValue();        
        if (currentValue > maxValue)
            currentValue = maxValue;
        const minValue = this.getMinValue();
        if (currentValue < minValue)
            currentValue = minValue;
        
        this.arc.setAttribute("d", describeArc(110, 110, 98, 0, currentValue));
        this.arcBg.setAttribute("d", describeArc(110, 110, 98, currentValue, 360));
        this.pointer.style.transform = `rotate(${currentValue-180}deg)`;

        this.newValue = currentValue;
        this.newDisplayedValue = Math.round(this.getDisplayedValue(this.newValue));
        this.displayedValue.innerText = `+${this.newDisplayedValue}`;

        this.control.setAttribute('data-value', this.newDisplayedValue);
    }

    onMove(ev) {
        const newMousePosition = {x: ev.screenX, y: ev.screenY };
        const positionDiff = { 
            x: newMousePosition.x - this.mousePosition.x,
            y: newMousePosition.y - this.mousePosition.y,
        };        
        
        let newPosition = this.calculateNewPosition(positionDiff);        
        this.setValue(newPosition);
        this.setMousePosition(ev);
    }

    setMousePosition(ev) {
        this.mousePosition = {x: ev.screenX, y: ev.screenY};
    }

    calculateNewPosition(positionDiff) {
        return this.newValue + 360.0 * positionDiff.y / (this.control.clientHeight);        
    }
}

export default {
    init() {
        const controls = [];
        document.querySelectorAll(".knob-control").forEach((control) => {
            controls.push = new Knob(control);
        });
        return controls;
    }
}