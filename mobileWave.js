const canvasMobile = document.getElementById("mobile-wave");
const ctxMobile = canvasMobile.getContext("2d");

const widthMobile = canvasMobile.width;
const heightMobile = canvasMobile.height;

const amplitudeMobile = 50;
const frequencyMobile = 0.05;
const speedMobile = 0.8;

let phaseMobile = 0;
let targetRotationYMobile = 0;
let targetRotationXMobile = 0;
let rotationYMobile = 0;
let rotationXMobile = 0;

function drawSineWaveMobile() {
    ctxMobile.clearRect(0, 0, widthMobile, heightMobile);

    ctxMobile.save();
    ctxMobile.translate(widthMobile / 2, heightMobile / 2);

    ctxMobile.beginPath();
    for (let xMobile = -widthMobile / 2; xMobile < widthMobile / 2; xMobile++) {
        const yMobile = amplitudeMobile * Math.sin(frequencyMobile * (xMobile + phaseMobile));
        const zMobile = (xMobile / widthMobile) * 50;

        const cosYMobile = Math.cos(rotationYMobile);
        const sinYMobile = Math.sin(rotationYMobile);
        const cosXMobile = Math.cos(rotationXMobile);
        const sinXMobile = Math.sin(rotationXMobile);

        const xRotatedMobile = cosYMobile * xMobile + sinYMobile * zMobile;
        const zRotatedMobile = -sinYMobile * xMobile + cosYMobile * zMobile;
        const yRotatedMobile = cosXMobile * yMobile - sinXMobile * zRotatedMobile;

        const projectedXMobile = xRotatedMobile;
        const projectedYMobile = -yRotatedMobile;

        ctxMobile.lineTo(projectedXMobile, projectedYMobile);
    }

    ctxMobile.strokeStyle = "black";
    ctxMobile.lineWidth = 4;
    ctxMobile.stroke();
    ctxMobile.restore();
}

function animateMobile() {
    phaseMobile += speedMobile;

    rotationXMobile += (targetRotationXMobile - rotationXMobile) * 0.1;
    rotationYMobile += (targetRotationYMobile - rotationYMobile) * 0.1;

    drawSineWaveMobile();
    requestAnimationFrame(animateMobile);
}

animateMobile();
