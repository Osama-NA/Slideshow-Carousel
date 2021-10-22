// VARIABLES
let isDown = false;
let startX;
let scrollLeft;

const slider = document.querySelector('.images');
const imageContainers = [...document.querySelectorAll('.images > .image-container')];


// FUNCTIONS
const addZoom = (e) => e.classList.add("zoom-animation");

const removeZoom = (e) => e.classList.remove("zoom-animation");

// n = image width
// range 0 ---- n/2 ---- n, where n is current/first slide and n/2 is towards middle slide, where 0 is middle slide
// if (imageWidth - scrollLeft) is more than n/2, snap to first slide
// if (imageWidth - scrollLeft) is less than n/2, snap to middle slide
const firstImageSnapEffect = (e) => {
    const lengthScrolled = e.target.parentNode.parentNode.scrollLeft;
    const imageWidth = e.target.offsetWidth;
    const scroll = (imageWidth - lengthScrolled) > (imageWidth / 2) ? 0 : imageWidth;
    $(e.target.parentNode.parentNode).animate({ scrollLeft: scroll });
    addZoom(e.target.children[0]); //add zoom effect to image after snap scroll
}

// n = image width
// range -n/2 --- 0 ---- n/2, where -n/2 is towards last slide and n/2 is towards first slide, where 0 is current/middle slide
// if (n - scrollLeft) is more than n/2, snap to first slide
// if (n - scrollLeft) is less than -n/2, snap to last slide
// other wise snap to current slide
const secondImageSnapEffect = (e) => {
    const lengthScrolled = e.target.parentNode.parentNode.scrollLeft;
    const imageWidth = e.target.offsetWidth;
    const halfImageWidth = imageWidth / 2;
    const scrollDifference = imageWidth - lengthScrolled;
    let scroll = imageWidth;

    if (scrollDifference > halfImageWidth)
        scroll = 0;
    else if (scrollDifference < -halfImageWidth)
        scroll = imageWidth * 2;

    $(e.target.parentNode.parentNode).animate({ scrollLeft: scroll });
    addZoom(e.target.children[0]); //add zoom effect to image after snap scroll
}

// n = image width
// range 0 ---- n/2 ---- n, where 0 is current/last slide and n/2 is towards middle slide, where n is middle slide
// if (n - scrollLeft) is more than n/2, snap to middle slide
// other wise snap to current slide
const thirdImageSnapEffect = (e) => {
    const lengthScrolled = e.target.parentNode.parentNode.scrollLeft;
    const imageWidth = e.target.offsetWidth;
    const halfImageWidth = imageWidth / 2;
    const scrollDifference = (imageWidth * 2) - lengthScrolled;
    let scroll = imageWidth * 2;

    if (scrollDifference > halfImageWidth)
        scroll = imageWidth;

    $(e.target.parentNode.parentNode).animate({ scrollLeft: scroll });
    addZoom(e.target.children[0]); //add zoom effect to image after snap scroll
}


// EVENT LISTENERS
// Drag to scroll slider controls
slider.addEventListener('mouseleave', (e) => {
    isDown = false
});

slider.addEventListener('mouseup', () => {
    isDown = false
});

slider.addEventListener('mousedown', (e) => {
    isDown = true;
    startX = e.pageX - slider.offsetLeft;
    scrollLeft = slider.scrollLeft;
});

slider.addEventListener('mousemove', (e) => {
    if (!isDown) return;
    e.preventDefault();

    const x = e.pageX - slider.offsetLeft;
    const walk = (x - startX) * 1; //scroll-fast
    slider.scrollLeft = scrollLeft - walk;
});

// MOUSE UP EVENT ON IMAGE CONTAINERS
imageContainers[0].addEventListener('mouseup', (e) => firstImageSnapEffect(e));

imageContainers[1].addEventListener('mouseup', (e) => secondImageSnapEffect(e));

imageContainers[2].addEventListener('mouseup', (e) => thirdImageSnapEffect(e));

// MOUSE DOWN EVENT ON IMAGE CONTAINERS
imageContainers[0].addEventListener('mousedown', (e) => removeZoom(e));

imageContainers[1].addEventListener('mousedown', (e) => removeZoom(e));

imageContainers[2].addEventListener('mousedown', (e) => removeZoom(e));

// MOUSE MOVE EVENT ON IMAGE CONTAINERS
imageContainers[0].addEventListener('mousemove', (e) => removeZoom(e));

imageContainers[1].addEventListener('mousemove', (e) => removeZoom(e));

imageContainers[2].addEventListener('mousemove', (e) => removeZoom(e));

// MOUSE LEAVE EVENT ON IMAGE CONTAINERS
imageContainers[0].addEventListener('mouseleave', (e) => firstImageSnapEffect(e));

imageContainers[1].addEventListener('mouseleave', (e) => secondImageSnapEffect(e));

imageContainers[2].addEventListener('mouseleave', (e) => thirdImageSnapEffect(e));