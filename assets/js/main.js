/*=============== SCROLL SECTIONS ACTIVE LINK ===============*/
const sections = document.querySelectorAll('section[id]');

function scrollActive() {
    const scrollY = window.pageYOffset;

    sections.forEach(current => {
        const sectionHeight = current.offsetHeight;
        const sectionTop = current.offsetTop - 50;
        const sectionId = current.getAttribute('id');

        const link = document.querySelector('.nav__menu a[href*="' + sectionId + '"]');

        if (link) {  // Check if the link exists
            if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
                link.classList.add('active-link');
            } else {
                link.classList.remove('active-link');
            }
        }
    });
}

window.addEventListener('scroll', scrollActive);

/*=============== CHANGE BACKGROUND HEADER ===============*/
function scrollHeader() {
    const header = document.getElementById('header');
    // When the scroll is greater than 80 viewport height, add the scroll-header class to the header tag
    if (this.scrollY >= 80) {
        header.classList.add('scroll-header');
    } else {
        header.classList.remove('scroll-header');
    }
}

window.addEventListener('scroll', scrollHeader);




document.addEventListener('DOMContentLoaded', () => {
    const toggleOverlayButtons = document.querySelectorAll('.toggle-overlay');
    const playButtons = document.querySelectorAll('.play-btn');
    const closeButtons = document.querySelectorAll('.close-btn');
    const marquees = document.querySelectorAll('marquee');
    
    toggleOverlayButtons.forEach((button, index) => {
        button.addEventListener('click', () => {
            const fullLay = button.closest('.j').querySelector('.full-lay');
            fullLay.style.display = fullLay.style.display === 'none' || !fullLay.style.display ? 'flex' : 'none';
        });
    });
    
    
    playButtons.forEach((button, index) => {
        button.addEventListener('click', () => {
            const icon = button.querySelector('i');
            const marquee = button.closest('.j').querySelector('marquee');
            if (icon.classList.contains('bx-play')) {
                icon.classList.replace('bx-play', 'bx-pause');
                marquee.start();
            } else {
                icon.classList.replace('bx-pause', 'bx-play');
                marquee.stop();
            }
        });
    });

    closeButtons.forEach((button) => {
        button.addEventListener('click', () => {
            const fullLay = button.closest('.full-lay');
            fullLay.style.display = 'none';
        });
    });
});



// JavaScript for swiping functionality
const carousel = document.getElementById('imageCarousel');
let isDown = false;
let startX;
let scrollLeft;

carousel.addEventListener('mousedown', (e) => {
    isDown = true;
    startX = e.pageX - carousel.offsetLeft;
    scrollLeft = carousel.scrollLeft;
});

carousel.addEventListener('mouseleave', () => {
    isDown = false;
});

carousel.addEventListener('mouseup', () => {
    isDown = false;
});

carousel.addEventListener('mousemove', (e) => {
    if (!isDown) return;
    e.preventDefault();
    const x = e.pageX - carousel.offsetLeft;
    const walk = (x - startX) * 2; // Adjust scrolling speed here
    carousel.scrollLeft = scrollLeft - walk;
});



 