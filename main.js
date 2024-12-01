// Progress Bar 
const progressTag = document.querySelector(".progress_bar");
const bodyTag = document.querySelector("body");

// put it in a function and call on load
function updateProgressBar() {
    const pixelsScrolled = window.scrollY;
    const pageHeight = bodyTag.getBoundingClientRect().height;
    const totalScrollableDistance = pageHeight - window.innerHeight;
    const percentage = pixelsScrolled / totalScrollableDistance;
    progressTag.style.width = `${percentage * 100}%`;
}

updateProgressBar();
document.addEventListener("scroll", updateProgressBar);

// SVG hover state Mobile
function updateHoverState() {
    const glossaryItems = document.querySelectorAll(".mobile-grid-middle, .mobile-hover-state");
    const viewportCenter = window.innerHeight / 2;

    let closestItem = null;
    let closestDistance = Infinity;

    glossaryItems.forEach((item) => {
        const itemRect = item.getBoundingClientRect();
        const itemCenter = itemRect.top + itemRect.height / 2;
        const distanceToCenter = Math.abs(viewportCenter - itemCenter);

        if (distanceToCenter < closestDistance) {
            closestDistance = distanceToCenter;
            closestItem = item;
        }

        item.classList.remove("hover");
    });

    if (closestItem) {
        closestItem.classList.add("hover");
    }
}

function updateHoverStateText() {
    const glossaryItems = document.querySelectorAll(".mobile-hover-state-text");
    const viewportCenter = window.innerHeight / 2;

    let closestItem = null;
    let closestDistance = Infinity;

    glossaryItems.forEach((item) => {
        const itemRect = item.getBoundingClientRect();
        const itemCenter = itemRect.top + itemRect.height / 2;
        const distanceToCenter = Math.abs(viewportCenter - itemCenter);

        if (distanceToCenter < closestDistance) {
            closestDistance = distanceToCenter;
            closestItem = item;
        }

        item.classList.remove("hover");
    });

    if (closestItem) {
        closestItem.classList.add("hover");
    }
}

document.addEventListener("scroll", () => {
    updateHoverState();
    updateHoverStateText();
});

window.addEventListener("resize", () => {
    updateHoverState();
    updateHoverStateText();
});

window.addEventListener("load", () => {
    updateHoverState();
    updateHoverStateText();
});

// Header Text
const sections = document.querySelectorAll("section");
const headers = {
    top: document.getElementById("top-header"),
    glossary: document.getElementById("glossary-header"),
    bottom: document.getElementById("bottom-header"),
};

const headersMobile = {
    top: document.getElementById("top-header-mobile"),
    glossary: document.getElementById("glossary-header-mobile"),
    bottom: document.getElementById("bottom-header-mobile"),
};

const offset = 100;

function updateHeaders() {
    const pixelsScrolled = window.scrollY;
    sections.forEach((section) => {
        if (section.offsetTop <= pixelsScrolled + offset && section.offsetTop + section.offsetHeight > pixelsScrolled + offset) {
            Object.values(headers).forEach((header) => {
                header.style.color = "black";
            });
            headers[section.id].style.color = "#09f";

            Object.values(headersMobile).forEach((header) => {
                header.style.color = "black";
            });
            headersMobile[section.id].style.color = "#09f";
        }
    });
}

document.addEventListener("scroll", updateHeaders);

// Mobile scroll on click function
document.getElementById('top-header-mobile').addEventListener('click', function () {
    const section = document.querySelector('.top-section-mobile');
    section.scrollIntoView({ behavior: 'smooth' });
});

document.getElementById('glossary-header-mobile').addEventListener('click', function () {
    const section = document.querySelector('.glossary-section-mobile');
    section.scrollIntoView({ behavior: 'smooth' });
});

document.getElementById('bottom-header-mobile').addEventListener('click', function () {
    const section = document.querySelector('.bottom-section-mobile');
    section.scrollIntoView({ behavior: 'smooth' });
});

// Desktop scroll on click function 
document.getElementById('top-header').addEventListener('click', function () {
    const section = document.querySelector('.top-section');
    section.scrollIntoView({ behavior: 'smooth' });
});

document.getElementById('glossary-header').addEventListener('click', function () {
    const section = document.querySelector('.glossary-section');
    section.scrollIntoView({ behavior: 'smooth' });
});

document.getElementById('bottom-header').addEventListener('click', function () {
    const section = document.querySelector('.bottom-section');
    section.scrollIntoView({ behavior: 'smooth' });
});

// header hover 
const headerTextHovers = document.querySelectorAll('.header-text-hover');

headerTextHovers.forEach(headerText => {
    headerText.addEventListener('click', (event) => {
        event.stopPropagation();
        headerText.classList.toggle('active');
        setTimeout(() => {
            headerText.classList.remove('active');
        }, 500);
    });
});
