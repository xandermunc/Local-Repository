const canvasTitle = document.getElementById("title-wave");
const ctxTitle = canvasTitle.getContext("2d");

const widthTitle = canvasTitle.width;
const heightTitle = canvasTitle.height;

const amplitudeTitle = 50;
const frequencyTitle = 0.05;
const speedTitle = 0.8;

let phaseTitle = 0;
let targetRotationYTitle = 0;
let targetRotationXTitle = 0;
let rotationYTitle = 0;
let rotationXTitle = 0;

function drawSineWaveTitle() {
    ctxTitle.clearRect(0, 0, widthTitle, heightTitle);

    ctxTitle.save();
    ctxTitle.translate(widthTitle / 2, heightTitle / 2);

    ctxTitle.beginPath();
    for (let xTitle = -widthTitle / 8; xTitle < widthTitle / 8; xTitle++) {
        const yTitle = amplitudeTitle * Math.sin(frequencyTitle * (xTitle + phaseTitle));
        const zTitle = (xTitle / widthTitle) * 50;

        const cosYTitle = Math.cos(rotationYTitle);
        const sinYTitle = Math.sin(rotationYTitle);
        const cosXTitle = Math.cos(rotationXTitle);
        const sinXTitle = Math.sin(rotationXTitle);

        const xRotatedTitle = cosYTitle * xTitle + sinYTitle * zTitle;
        const zRotatedTitle = -sinYTitle * xTitle + cosYTitle * zTitle;
        const yRotatedTitle = cosXTitle * yTitle - sinXTitle * zRotatedTitle;

        const projectedXTitle = xRotatedTitle;
        const projectedYTitle = -yRotatedTitle;

        ctxTitle.lineTo(projectedXTitle, projectedYTitle);
    }

    ctxTitle.strokeStyle = "black";
    ctxTitle.lineWidth = 4;
    ctxTitle.stroke();
    ctxTitle.restore();
}

function animateTitle() {
    phaseTitle += speedTitle;

    rotationXTitle += (targetRotationXTitle - rotationXTitle) * 0.1;
    rotationYTitle += (targetRotationYTitle - rotationYTitle) * 0.1;

    drawSineWaveTitle();
    requestAnimationFrame(animateTitle);
}

// Title animation hover 
const titleTrigger = document.querySelector('.title-trigger');
titleTrigger.addEventListener('mouseenter', () => {
    canvasTitle.style.opacity = 1; 
});

titleTrigger.addEventListener('mouseleave', () => {
    canvasTitle.style.opacity = 0; 
});

animateTitle();
