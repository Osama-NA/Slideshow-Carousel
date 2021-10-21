const slider = document.querySelector('.images-slider');
let isDown = false;
let startX;
let scrollLeft;

const imageContainers = [...document.querySelectorAll('.images-slider > .image-container')];

slider.addEventListener('mouseleave', () => {
    isDown = false
    imageContainers.map((container) => container.classList.add("snap"))
});

const x = () => console.log(0)
slider.addEventListener('mouseup', () => {
    isDown = false
    imageContainers.map((container) => container.classList.add("snap"))
});

slider.addEventListener('mousedown', (e) => {
    imageContainers.map((container) => container.classList.remove("snap"))
    isDown = true;
    startX = e.pageX - slider.offsetLeft;
    scrollLeft = slider.scrollLeft;
});

slider.addEventListener('mousemove', (e) => {
    if (!isDown) return;

    e.preventDefault();
    imageContainers.map((container) => container.classList.remove("snap"))
    const x = e.pageX - slider.offsetLeft;
    const walk = (x - startX) * 1; //scroll-fast
    slider.scrollLeft = scrollLeft - walk;
});