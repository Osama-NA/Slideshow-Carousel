
// VARIABLES
let isDown = false;
let startX;
let scrollLeft;
let slideShowIndex = 0;
let slideShowTimer = 10000;

const slider = document.querySelector('.images');
const imageContainers = [...document.querySelectorAll('.images > .image-container')];
const sliderButtonOne = document.querySelector('#car-one-button').children[0];
const sliderButtonTwo = document.querySelector('#car-two-button').children[0];
const sliderButtonThree = document.querySelector('#car-three-button').children[0];



// FUNCTIONS

// TO REMOVE ON LOAD ANIMATIONS
setTimeout(() => {
    $(".links .number").removeAttr("id");
    $(".links .quote").removeAttr("id");
}, 2000);

// TO ADD ON HOVER ANIMATIONS
setTimeout(() => {
    $(".links .number").addClass("links-hover-animation");
    $(".links .quote").addClass("links-hover-animation");
}, 2500);

// GIVES FULL OPACITY TO BUTTON OF CURRENT SLIDE AND REDUCES THE OPACITY OF SIBLINGS
const buttonOneSelected = () => {
    $(sliderButtonOne).css("opacity", 1);
    $(sliderButtonTwo).css("opacity", .4);
    $(sliderButtonThree).css("opacity", .4);
}

const buttonTwoSelected = () => {
    $(sliderButtonOne).css("opacity", .4);
    $(sliderButtonTwo).css("opacity", 1);
    $(sliderButtonThree).css("opacity", .4);
}

const buttonThreeSelected = () => {
    $(sliderButtonOne).css("opacity", .4);
    $(sliderButtonTwo).css("opacity", .4);
    $(sliderButtonThree).css("opacity", 1);
}

// GIVES A SLOW ZOOM IN ANIMATION
const addZoom = () => {
    imageContainers.map(container => {
        container.children[0].classList.add("zoom-animation");
    })
}
const removeZoom = () => {
    imageContainers.map(container => {
        container.children[0].classList.remove("zoom-animation");
    })
}

// n = image width
// range 0 ---- n/2 ---- n, where n is current/first slide and n/2 is towards middle slide, where 0 is middle slide
// if (imageWidth - scrollLeft) is more than n/2, snap to first slide
// if (imageWidth - scrollLeft) is less than n/2, snap to middle slide
const firstImageSnapEffect = (e) => {
    let lengthScrolled = e.target.parentNode.parentNode.scrollLeft;
    if (e.target.parentNode.parentNode.classList == "images-slider") {
        lengthScrolled = e.target.parentNode.parentNode.children[0].scrollLeft;
    } 

    const imageWidth = e.target.offsetWidth;
    let scroll = undefined;

    if (imageWidth - lengthScrolled > imageWidth / 2){
        scroll = 0;
        buttonOneSelected();
    } else {
        scroll = imageWidth;
        buttonTwoSelected();
    }

    $(e.target.parentNode.parentNode).animate({ scrollLeft: scroll });
}

// n = image width
// range -n/2 --- 0 ---- n/2, where -n/2 is towards last slide and n/2 is towards first slide, where 0 is current/middle slide
// if (n - scrollLeft) is more than n/2, snap to first slide
// if (n - scrollLeft) is less than -n/2, snap to last slide
// other wise snap to current slide
const secondImageSnapEffect = (e) => {
    let lengthScrolled = e.target.parentNode.parentNode.scrollLeft;
    if (e.target.parentNode.parentNode.classList == "images-slider") {
        lengthScrolled = e.target.parentNode.parentNode.children[0].scrollLeft;
    }

    const imageWidth = e.target.offsetWidth;
    const halfImageWidth = imageWidth / 2;
    const scrollDifference = imageWidth - lengthScrolled;
    let scroll = undefined;

    if (scrollDifference > halfImageWidth - 100) {
        scroll = 0;
        buttonOneSelected();
    }else if (scrollDifference < -halfImageWidth + 100 ) {
        scroll = imageWidth * 2;
        buttonThreeSelected();
    }else{
        scroll = imageWidth;
        buttonTwoSelected();
    }

    $(e.target.parentNode.parentNode).animate({ scrollLeft: scroll });
}

// n = image width
// range 0 ---- n/2 ---- n, where 0 is current/last slide and n/2 is towards middle slide, where n is middle slide
// if (n - scrollLeft) is more than n/2, snap to middle slide
// other wise snap to current slide
const thirdImageSnapEffect = (e) => {
    let lengthScrolled = e.target.parentNode.parentNode.scrollLeft;
    if (e.target.parentNode.parentNode.classList == "images-slider") {
        lengthScrolled = e.target.parentNode.parentNode.children[0].scrollLeft;
    }

    const imageWidth = e.target.offsetWidth;
    const halfImageWidth = imageWidth / 2;
    const scrollDifference = (imageWidth * 2) - lengthScrolled;
    let scroll = undefined;

    if (scrollDifference > halfImageWidth) {
        scroll = imageWidth;
        buttonTwoSelected();
    }else{
        scroll = imageWidth * 2;
        buttonThreeSelected();
    }

    $(e.target.parentNode.parentNode).animate({ scrollLeft: scroll });
}

// This function checks slider buttons opacity and returns 'current-slide' index is accordingly
const getSlideShowIndex = () => {
    switch ("1") {
        case $(sliderButtonOne).css("opacity"):
            return 0;
        case $(sliderButtonTwo).css("opacity"):
            return 1;
        case $(sliderButtonThree).css("opacity"):
            return 2;
        default:
            return -1;
    }
}

const slideShow = setInterval(() => {
    if(isDown) return; // If slider being clicked or dragged stop slideshow
    
    let slideShowIndex = getSlideShowIndex();
    if (slideShowIndex < 0) return; // if no index returned, then exit function. 

    removeZoom(); // to re-use animation

    const scroll = imageContainers[0].children[0].offsetWidth; // image width

    switch (slideShowIndex) {
        case 0:
            slideOne(scroll)
            break;
        case 1:
            slideTwo(scroll * 2)
            break;
        default:
            slideThree(0)
            break;
    }
}, slideShowTimer)

// THESE BUTTONS SCROLLS TO THE GIVEN SLIDE
// BUTTON OF GIVEN SLIDE IS SELECTED AND ZOOM ANIMATION IS ADDED
const slideOne = (scroll) => {
    $(slider).animate({ scrollLeft: scroll });
    buttonTwoSelected();
    addZoom();
}
const slideTwo = (scroll) => {
    $(slider).animate({ scrollLeft: scroll });
    buttonThreeSelected();
    addZoom();
}
const slideThree = (scroll) => {
    $(slider).animate({ scrollLeft: scroll });
    buttonOneSelected();
    addZoom();
}

// EVENT LISTENERS

// SLIDER BUTTONS 
$(sliderButtonOne).click(() => buttonOneSelected())

$(sliderButtonTwo).click(() => buttonTwoSelected());

$(sliderButtonThree).click(() => buttonThreeSelected())

// DRAG SCROLL SLIDER CONTROLS
slider.addEventListener('mouseleave', (e) => {
    isDown = false
    addZoom();
});

slider.addEventListener('mouseup', () => {
    isDown = false
    addZoom();
});

slider.addEventListener('mousedown', (e) => {
    isDown = true; // To disable snap effect and slideshow while slider is being scrolled or clicked
    startX = e.pageX - slider.offsetLeft;
    scrollLeft = slider.scrollLeft;
    removeZoom();

    // TO RESET SLIDESHOW TIMER, TO AVOID SCROLLING AWAY FROM A SLIDE AFTER SLIDING TO IT DUE TO INTERVAL TIMER
    slideShowTimer = 10000; 
});

slider.addEventListener('mousemove', (e) => {
    if (!isDown) return;
    e.preventDefault();

    const x = e.pageX - slider.offsetLeft;
    const walk = (x - startX) * .8; //scroll-fast
    slider.scrollLeft = scrollLeft - walk;
});

// 'MOUSE UP' EVENT ON IMAGE CONTAINERS
imageContainers[0].addEventListener('mouseup', (e) => firstImageSnapEffect(e));

imageContainers[1].addEventListener('mouseup', (e) => secondImageSnapEffect(e));

imageContainers[2].addEventListener('mouseup', (e) => thirdImageSnapEffect(e));

// 'MOUSE LEAVE' EVENT ON IMAGE CONTAINERS
imageContainers[0].addEventListener('mouseleave', (e) => firstImageSnapEffect(e));

imageContainers[1].addEventListener('mouseleave', (e) => secondImageSnapEffect(e));

imageContainers[2].addEventListener('mouseleave', (e) => thirdImageSnapEffect(e));

// 'MOUSE UP' EVENT ON IMAGE CONTAINERS
imageContainers[0].addEventListener('mousedown', ( ) => buttonOneSelected());

imageContainers[1].addEventListener('mousedown', ( ) => buttonTwoSelected());

imageContainers[2].addEventListener('mousedown', ( ) => buttonThreeSelected());

// 'MOUSE LEAVE' EVENT ON IMAGE CONTAINERS
imageContainers[0].addEventListener('mousemove', ( ) => buttonOneSelected());

imageContainers[1].addEventListener('mousemove', ( ) => buttonTwoSelected());

imageContainers[2].addEventListener('mousemove', ( ) => buttonThreeSelected());