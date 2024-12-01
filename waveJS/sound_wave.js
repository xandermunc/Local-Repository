const soundCanvas = document.getElementById("sound-wave-canvas");
const soundTrigger = document.querySelector(".sound-trigger");
const soundCtx = soundCanvas.getContext("2d");

const soundWidth = soundCanvas.width;
const soundHeight = soundCanvas.height;

const soundAmplitude = 50;
const soundFrequency = 0.05;
const soundSpeed = 0.8;

let soundPhase = 0;
let soundTargetRotationY = 0;
let soundTargetRotationX = 0;
let soundRotationY = 0;
let soundRotationX = 0;

function drawSoundWave() {
    soundCtx.clearRect(0, 0, soundWidth, soundHeight);

    soundCtx.save();
    soundCtx.translate(soundWidth / 2, soundHeight / 2);

    soundCtx.beginPath();
    for (let x = -soundWidth / 4; x < soundWidth / 4; x++) {
        const y = soundAmplitude * Math.sin(soundFrequency * (x + soundPhase));
        const z = (x / soundWidth) * 50;

        const cosY = Math.cos(soundRotationY);
        const sinY = Math.sin(soundRotationY);
        const cosX = Math.cos(soundRotationX);
        const sinX = Math.sin(soundRotationX);

        const xRotated = cosY * x + sinY * z;
        const zRotated = -sinY * x + cosY * z;
        const yRotated = cosX * y - sinX * zRotated;

        const projectedX = xRotated;
        const projectedY = -yRotated;

        soundCtx.lineTo(projectedX, projectedY);
    }

    soundCtx.strokeStyle = "blue";
    soundCtx.lineWidth = 2;
    soundCtx.stroke();
    soundCtx.restore();
}

function animateSound() {
    soundPhase += soundSpeed;

    soundRotationX += (soundTargetRotationX - soundRotationX) * 0.1;
    soundRotationY += (soundTargetRotationY - soundRotationY) * 0.1;

    drawSoundWave();
    requestAnimationFrame(animateSound);
}

soundTrigger.addEventListener("mouseenter", () => {
    soundTargetRotationX = -45 * (Math.PI / 180);
    soundTargetRotationY = -45 * (Math.PI / 180);
});

soundTrigger.addEventListener("mouseleave", () => {
    soundTargetRotationX = 0;
    soundTargetRotationY = 0;
});

const canvas = document.getElementById("sineCanvas");
const lightTrigger = document.querySelector(".light-trigger");
const ctx = canvas.getContext("2d");
const infoDiv = document.getElementById("info");

const width = canvas.width;
const height = canvas.height;

const amplitude = 50;
const frequency = 0.05;
const speed = 0.8;
const transitionSpeed = 0.1;

let phase = 0;
let rotationAngle = 0;
let targetRotationAngle = 0;
let isHovered = false;

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

function animate() {
    phase += speed;

    rotationAngle += (targetRotationAngle - rotationAngle) * 0.1;

    if (isHovered) {
        amplitude += (maxAmplitude - amplitude) * transitionSpeed;
    } else {
        amplitude += (0 - amplitude) * transitionSpeed;
    }

    drawSineWave2D();

    requestAnimationFrame(animate);
}

lightTrigger.addEventListener("mouseenter", () => {
    isHovered = true;
    targetRotationAngle = 40 * (Math.PI / 180);
});

lightTrigger.addEventListener("mouseleave", () => {
    isHovered = false;
    targetRotationAngle = 0;
});

animateSound();
animate(); 
