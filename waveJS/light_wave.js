const canvas = document.getElementById("sineCanvas");
const trigger = document.querySelector(".light-trigger");
const ctx = canvas.getContext("2d");
const infoDiv = document.getElementById("info");

const width = canvas.width;
const height = canvas.height;

const maxAmplitude = 50;
const frequency = 0.05;
const speed = 0.8;
const transitionSpeed = 0.1;

let phase = 0;
let rotationAngle = 0;
let targetRotationAngle = 0;
let isHovered = false;
let amplitude = 0;

let targetRotationY = 0;
let targetRotationX = 0;
let rotationY = 0;
let rotationX = 0;
const amplitude3D = 50;

function drawSineWave2D() {
    ctx.clearRect(0, 0, width, height);

    ctx.save();
    ctx.translate(width / 2, height / 2);

    const scale = isHovered ? 0.85 : 1;
    ctx.scale(scale, scale);

    ctx.beginPath();
    for (let x = -width / 4; x < width / 4; x++) {
        const y = amplitude * Math.sin(frequency * (x + phase));

        const xRotated = x * Math.cos(rotationAngle) - y * Math.sin(rotationAngle);
        const yRotated = x * Math.sin(rotationAngle) + y * Math.cos(rotationAngle);

        const projectedX = xRotated;
        const projectedY = -yRotated;

        ctx.lineTo(projectedX, projectedY);
    }

    ctx.strokeStyle = "red";
    ctx.lineWidth = 2;
    ctx.stroke();
    ctx.restore();
}

function drawSineWave3D() {
    ctx.save();
    ctx.translate(width / 2, height / 2);

    ctx.beginPath();
    for (let x = -width / 4; x < width / 4; x++) {
        const y = amplitude3D * Math.sin(frequency * (x + phase));
        const z = (x / width) * 50;

        const cosY = Math.cos(rotationY);
        const sinY = Math.sin(rotationY);
        const cosX = Math.cos(rotationX);
        const sinX = Math.sin(rotationX);

        const xRotated = cosY * x + sinY * z;
        const zRotated = -sinY * x + cosY * z;
        const yRotated = cosX * y - sinX * zRotated;

        const projectedX = xRotated;
        const projectedY = -yRotated;

        ctx.lineTo(projectedX, projectedY);
    }

    ctx.strokeStyle = "blue";
    ctx.lineWidth = 2;
    ctx.stroke();
    ctx.restore();
}

function animate() {
    phase += speed;

    rotationAngle += (targetRotationAngle - rotationAngle) * 0.1;

    if (isHovered) {
        amplitude += (maxAmplitude - amplitude) * transitionSpeed;
    } else {
        amplitude += (0 - amplitude) * transitionSpeed;
    }

    drawSineWave2D();
    drawSineWave3D();

    rotationX += (targetRotationX - rotationX) * 0.1;
    rotationY += (targetRotationY - rotationY) * 0.1;

    requestAnimationFrame(animate);
}

trigger.addEventListener("mouseenter", () => {
    isHovered = true;
    targetRotationAngle = 40 * (Math.PI / 180);
    targetRotationX = -45 * (Math.PI / 180);
    targetRotationY = -45 * (Math.PI / 180);
});

trigger.addEventListener("mouseleave", () => {
    isHovered = false;
    targetRotationAngle = 0;
    targetRotationX = 0;
    targetRotationY = 0;
});

animate();