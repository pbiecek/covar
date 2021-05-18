function slider(id, availableDates) {
    const slider = document.getElementById(id);
    const sliderMarker = slider.getElementsByTagName('div')[0];
    const sliderText = slider.getElementsByTagName('span')[0];

    let value = availableDates[availableDates.length - 1];
    let isDragging = false;

    sliderMarker.addEventListener('mousedown', () => {
        isDragging = true;
    });
    document.addEventListener('mouseup', () => {
        isDragging = false;
    });
    document.addEventListener('mouseleave', () => {
        isDragging = false;
    });
    document.addEventListener('mousemove', e => {
        if (isDragging) {
            const len = slider.offsetWidth;
            const leftPivot = slider.getBoundingClientRect().left;
            const rangeFromLeft = Math.max(0, Math.min(len, e.clientX - leftPivot));
            const conValue = len - rangeFromLeft;
            
            let nearest = null;
            let nearestDist = -1;
            let nearestPoint = -1;

            for(let i = 0; i < availableDates.length; i++) {
                const point = len - (len / (availableDates.length === 1 ? 2 : availableDates.length - 1)) * i;
                const dist = Math.abs(point - conValue);
                if (nearest === null || dist < nearestDist) {
                    nearest = availableDates[i];
                    nearestDist = dist;
                    nearestPoint = point;
                }
            }
            console.log(nearestPoint);
            value = nearest;
            sliderText.style.right = `${nearestPoint}px`;
            sliderMarker.style.right = `${nearestPoint}px`;
            sliderText.innerHTML = nearest;
        }
    });


    return {
        getValue: () => value
    };
}