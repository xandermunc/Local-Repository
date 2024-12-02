const canvasVFW = document.getElementById("vfw-wave");
const triggerVFW = document.querySelector(".vfw-trigger");
const ctxVFW = canvasVFW.getContext("2d");

const widthVFW = canvasVFW.width;
const heightVFW = canvasVFW.height;

const amplitudeVFW = 50;
const frequencyVFW = 0.05;
const speedVFW = 0.8;

let phaseVFW = 0;
let targetRotationYVFW = 0;
let targetRotationXVFW = 0;
let rotationYVFW = 0;
let rotationXVFW = 0;

function drawSineWaveVFW() {
    ctxVFW.clearRect(0, 0, widthVFW, heightVFW);

    ctxVFW.save();
    ctxVFW.translate(widthVFW / 2, heightVFW / 2);

    ctxVFW.beginPath();
    for (let xVFW = -widthVFW / 4; xVFW < widthVFW / 4; xVFW++) {
        const yVFW = amplitudeVFW * Math.sin(frequencyVFW * (xVFW + phaseVFW));
        const zVFW = (xVFW / widthVFW) * 50;

        const cosYVFW = Math.cos(rotationYVFW);
        const sinYVFW = Math.sin(rotationYVFW);
        const cosXVFW = Math.cos(rotationXVFW);
        const sinXVFW = Math.sin(rotationXVFW);

        const xRotatedVFW = cosYVFW * xVFW + sinYVFW * zVFW;
        const zRotatedVFW = -sinYVFW * xVFW + cosYVFW * zVFW;
        const yRotatedVFW = cosXVFW * yVFW - sinXVFW * zRotatedVFW;

        const projectedXVFW = xRotatedVFW;
        const projectedYVFW = -yRotatedVFW;

        ctxVFW.lineTo(projectedXVFW, projectedYVFW);
    }

    ctxVFW.strokeStyle = "black";
    ctxVFW.lineWidth = 4;
    ctxVFW.stroke();
    ctxVFW.restore();
}

function animateVFW() {
    phaseVFW += speedVFW;

    rotationXVFW += (targetRotationXVFW - rotationXVFW) * 0.1;
    rotationYVFW += (targetRotationYVFW - rotationYVFW) * 0.1;

    drawSineWaveVFW();
    requestAnimationFrame(animateVFW); 
}

// triggerVFW.addEventListener("mouseenter", () => {
//     targetRotationXVFW = -45 * (Math.PI / 180);
//     targetRotationYVFW = -45 * (Math.PI / 180);
// });

// triggerVFW.addEventListener("mouseleave", () => {
//     targetRotationXVFW = 0;
//     targetRotationYVFW = 0;
// });

animateVFW(); 