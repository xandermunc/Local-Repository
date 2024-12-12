const svg = document.getElementById('svg-slider');
const line = document.getElementById('line');
const circle = document.getElementById('circle');

const lineStartX = parseFloat(line.getAttribute('x1'));
const lineEndX = parseFloat(line.getAttribute('x2'));

let isDragging = false;

svg.addEventListener('mousedown', (e) => {
    const mouseX = e.offsetX;
    const mouseY = e.offsetY;

    const circleX = parseFloat(circle.getAttribute('cx'));
    const circleY = parseFloat(circle.getAttribute('cy'));

    const distance = Math.hypot(mouseX - circleX, mouseY - circleY);
    if (distance <= parseFloat(circle.getAttribute('r'))) {
        isDragging = true;
    }
});

svg.addEventListener('mousemove', (e) => {
    if (isDragging) {
        const mouseX = e.offsetX;
        const constrainedX = Math.max(lineStartX, Math.min(lineEndX, mouseX));
        circle.setAttribute('cx', constrainedX);
    }
});

svg.addEventListener('mouseup', () => {
    isDragging = false;
});

svg.addEventListener('mouseleave', () => {
    isDragging = false;
});