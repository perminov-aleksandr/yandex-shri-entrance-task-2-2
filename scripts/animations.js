export default {
    animateModal(element, animationDuration) {
        let start = null;
        const step = (timestamp) => {            
            const triggerCoordinates = document.querySelector(`[data-micromodal-trigger='${element.id}']`).getBoundingClientRect();

            if (!start) 
                start = timestamp;
            const progress = timestamp - start;            
            const animationPercent = (animationDuration - progress) / animationDuration;
            const newTopValue = animationPercent*(triggerCoordinates.top - element.offsetHeight/2 + triggerCoordinates.height/2);
            const newLeftValue = animationPercent*(triggerCoordinates.left - element.offsetWidth/2 + triggerCoordinates.width/2);
            
            element.style.top = `${newTopValue}px`;
            element.style.left = `${newLeftValue}px`;
            element.style.transform = `scale3d(${1-animationPercent}, ${1-animationPercent}, ${1-animationPercent})`;

            if (progress < animationDuration) {
                window.requestAnimationFrame(step);
            } else {                
                element.style.top = 0;
                element.style.left = 0;
                element.style.transform = `scale3d(1, 1, 1)`;
            }
        };
        window.requestAnimationFrame(step);
    }
}