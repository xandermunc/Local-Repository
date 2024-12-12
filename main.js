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
// function changeHeaderColor(headerId, isVisible) {
//     const header = document.getElementById(headerId);
//     header.style.color = isVisible ? '#09f' : '';
// }

// const observer = new IntersectionObserver((entries) => {
//     let visibleHeaderId = null;

//     entries.forEach(entry => {
//         if (entry.isIntersecting) {
//             switch (entry.target.className) {
//                 case 'glossary-section':
//                     visibleHeaderId = 'top-header';
//                     break;
//                 case 'wavelength-section':
//                     visibleHeaderId = 'glossary-header';
//                     break;
//                 case 'bottom-section':
//                     visibleHeaderId = 'bottom-header';
//                     break;
//             }
//         }
//     });

//     changeHeaderColor('top-header', visibleHeaderId === 'top-header');
//     changeHeaderColor('glossary-header', visibleHeaderId === 'glossary-header');
//     changeHeaderColor('bottom-header', visibleHeaderId === 'bottom-header');
// }, { threshold: 0.5 });

// document.querySelectorAll('.glossary-section, .wavelength-section, .bottom-section').forEach(section => {
//     observer.observe(section);
// });

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
    const section = document.querySelector('.glossary-section');
    section.scrollIntoView({ behavior: 'smooth' });
});

document.getElementById('glossary-header').addEventListener('click', function () {
    const section = document.querySelector('.wavelength-section');
    section.scrollIntoView({ behavior: 'smooth' });
});

document.getElementById('bottom-header').addEventListener('click', function () {
    const section = document.querySelector('.contrast-section');
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

// hover sound 
// const hoverElements = document.querySelectorAll('.hover-effect');
// const hoverSound = document.getElementById('hoverSound');

// hoverElements.forEach(element => {
//     element.addEventListener('mouseenter', () => {
//         hoverSound.currentTime = 0;
//         hoverSound.play().catch(error => {
//             console.error("Audio play failed:", error);
//         });
//     });
// });
