const canvasVLS = document.getElementById("vls-wave");
const ctxVLS = canvasVLS.getContext("2d");

const widthVLS = canvasVLS.width;
const heightVLS = canvasVLS.height;

const amplitudeVLS = 50;
let frequencyVLS = 0.05;
const speedVLS = 0.8;

let phaseVLS = 0;
let targetRotationYVLS = 0;
let targetRotationXVLS = 0;
let rotationYVLS = 0;
let rotationXVLS = 0;

function drawSineWaveVLS() {
    ctxVLS.clearRect(0, 0, widthVLS, heightVLS);

    ctxVLS.save();
    ctxVLS.translate(widthVLS / 2, heightVLS / 2);

    ctxVLS.beginPath();
    for (let xVLS = -widthVLS / 4; xVLS < widthVLS / 4; xVLS++) {
        const yVLS = amplitudeVLS * Math.sin(frequencyVLS * (xVLS + phaseVLS));
        const zVLS = (xVLS / widthVLS) * 50;

        const cosYVLS = Math.cos(rotationYVLS);
        const sinYVLS = Math.sin(rotationYVLS);
        const cosXVLS = Math.cos(rotationXVLS);
        const sinXVLS = Math.sin(rotationXVLS);

        const xRotatedVLS = cosYVLS * xVLS + sinYVLS * zVLS;
        const zRotatedVLS = -sinYVLS * xVLS + cosYVLS * zVLS;
        const yRotatedVLS = cosXVLS * yVLS - sinXVLS * zRotatedVLS;

        const projectedXVLS = xRotatedVLS;
        const projectedYVLS = -yRotatedVLS;

        ctxVLS.lineTo(projectedXVLS, projectedYVLS);
    }

    ctxVLS.strokeStyle = "white";
    ctxVLS.lineWidth = 4;
    ctxVLS.stroke();
    ctxVLS.restore();
}

function animateVLS() {
    phaseVLS += speedVLS;

    rotationXVLS += (targetRotationXVLS - rotationXVLS) * 0.1;
    rotationYVLS += (targetRotationYVLS - rotationYVLS) * 0.1;

    drawSineWaveVLS();
    requestAnimationFrame(animateVLS);
}

animateVLS();

const svg = document.getElementById('svg-slider');
const line = document.getElementById('line');
const circle = document.getElementById('circle');
const colorRect = document.getElementById('color-rect');
const wavelengthDisplay = document.getElementById('wavelength-display');

const lineStartX = parseFloat(line.getAttribute('x1'));
const lineEndX = parseFloat(line.getAttribute('x2'));

let isDragging = false;

const initialWavelength = 470; // #09f
const normalizedPosition = (initialWavelength - 380) / (750 - 380);
const initialSliderPosition = lineStartX + normalizedPosition * (lineEndX - lineStartX);

circle.setAttribute('cx', initialSliderPosition);
frequencyVLS = 0.01 + normalizedPosition * 0.1;
const initialColor = wavelengthToColor(initialWavelength);
colorRect.style.backgroundColor = initialColor;
document.documentElement.style.setProperty('--background-color', initialColor); // Set CSS variable
wavelengthDisplay.textContent = `Wavelength: ${Math.round(initialWavelength)} nm`;

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

        const normalizedPosition = (constrainedX - lineStartX) / (lineEndX - lineStartX);
        frequencyVLS = 0.01 + normalizedPosition * 0.1;

        const wavelength = 380 + normalizedPosition * (750 - 380);
        const newColor = wavelengthToColor(wavelength);

        colorRect.style.backgroundColor = newColor;
        document.documentElement.style.setProperty('--background-color', newColor); // Update CSS variable
        wavelengthDisplay.textContent = `Wavelength: ${Math.round(wavelength)} nm`;
    }
});

svg.addEventListener('mouseup', () => {
    isDragging = false;
});

svg.addEventListener('mouseleave', () => {
    isDragging = false;
});

function wavelengthToColor(wavelength) {
    let R = 0, G = 0, B = 0;

    if (wavelength >= 380 && wavelength < 440) {
        R = (440 - wavelength) / (440 - 380);
        B = 1;
    } else if (wavelength >= 440 && wavelength < 490) {
        G = (wavelength - 440) / (490 - 440);
        B = 1;
    } else if (wavelength >= 490 && wavelength < 510) {
        G = 1;
        B = (510 - wavelength) / (510 - 490);
    } else if (wavelength >= 510 && wavelength < 580) {
        R = (wavelength - 510) / (580 - 510);
        G = 1;
    } else if (wavelength >= 580 && wavelength < 645) {
        R = 1;
        G = (645 - wavelength) / (645 - 580);
    } else if (wavelength >= 645 && wavelength <= 750) {
        R = 1;
    }

    const factor = wavelength < 420 ? 0.3 + 0.7 * (wavelength - 380) / (420 - 380) : wavelength > 700 ? 0.3 + 0.7 * (750 - wavelength) / (750 - 700) : 1;

    R = Math.round(R * 255 * factor);
    G = Math.round(G * 255 * factor);
    B = Math.round(B * 255 * factor);

    return `rgb(${R}, ${G}, ${B})`;
}
