// VARIABLES
let isDown = false;
let isUp = true;
let startX;
let scrollLeft;

const slider = document.querySelector('.images');
const imageContainers = [...document.querySelectorAll('.images > .image-container')];
const sliderButtonOne = document.querySelector('#car-one-button').children[0];
const sliderButtonTwo = document.querySelector('#car-two-button').children[0];
const sliderButtonThree = document.querySelector('#car-three-button').children[0];

// FUNCTIONS

// TO REMOVE ON LOAD ANIMATIONS AFTER 2 SECONDS OF LOADING, TO ALLOW ON HOVER ANIMATIONS
setTimeout(() => {
    $(".links .number").removeAttr("id");
    $(".links .quote").removeAttr("id");
}, 2000);

// TO ADD ON HOVER ANIMATIONS
setTimeout(() => {
    $(".links .number").addClass("links-hover-animation");
    $(".links .quote").addClass("links-hover-animation");
}, 2500);

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

const scrollSnap = (e) => {
    let lengthScrolled = e.target.parentNode.parentNode.scrollLeft;
    if (e.target.parentNode.parentNode.classList == "images-slider") {
        lengthScrolled = e.target.parentNode.parentNode.children[0].scrollLeft;
    }

    const imageWidth = e.target.offsetWidth;
    if (lengthScrolled < imageWidth / 2 && lengthScrolled < imageWidth && lengthScrolled != 0) {
        $(e.target.parentNode.parentNode).animate({ scrollLeft: 0 });
    } else if (lengthScrolled > imageWidth / 2 && lengthScrolled < imageWidth * 1.5 && lengthScrolled != imageWidth) {
        $(e.target.parentNode.parentNode).animate({ scrollLeft: imageWidth });
    } else if (lengthScrolled > imageWidth * 1.5 && lengthScrolled != imageWidth * 2) {
        $(e.target.parentNode.parentNode).animate({ scrollLeft: imageWidth * 2 });
    }
}

const slideShow = () => {
    if (isDown) return; // If slider being clicked or dragged stop slideshow

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
        case 2:
            slideThree(0)
            break;
    }
}

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

// This function checks slider's scrollLeft and returns 'current-slide' index accordingly
const getSlideShowIndex = () => {
    const imageWidth = imageContainers[0].children[0].offsetWidth;
    const scrolled = slider.scrollLeft;

    switch (scrolled) {
        case 0:
            return 0;
        case imageWidth:
            return 1;
        case (imageWidth * 2):
            return 2;
        default:
            return -1;
    }
}

let slideShowInterval = setInterval(slideShow, 10000);

const resetSlideShowInterval = () => {
    clearInterval(slideShowInterval);
    slideShowInterval = setInterval(slideShow, 10000);
}

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

// EVENT LISTENERS

// SLIDER BUTTONS 
$(sliderButtonOne).click(() => buttonOneSelected())

$(sliderButtonTwo).click(() => buttonTwoSelected());

$(sliderButtonThree).click(() => buttonThreeSelected())

// DRAG SCROLL SLIDER CONTROLS

// Here scrollSnap is only called if the mouse is clicked so that the function isn't called twice by 'mouseout' event and 'mouseup' event
slider.addEventListener('mouseout', (e) => {
    if (!isUp) scrollSnap(e); //SCROLL
    resetSlideShowInterval(); // RESET SLIDESHOW, TO AVOID AUTO-SCROLL AFTER USER ALREADY SCROLLING
});

slider.addEventListener('mouseleave', () => {
    isDown = false;
    isUp = true;
});

slider.addEventListener('mouseup', (e) => {
    isDown = false;
    isUp = true;
    addZoom();
    scrollSnap(e); //SCROLL
    resetSlideShowInterval(); // RESET SLIDESHOW, TO AVOID AUTO-SCROLL AFTER USER ALREADY SCROLLING
});

slider.addEventListener('mousedown', (e) => {
    isDown = true; // To disable snap effect and slideshow while slider is being scrolled or clicked
    isUp = false;

    scrollLeft = slider.scrollLeft;
    startX = e.pageX - scrollLeft;
    removeZoom();
});

slider.addEventListener('mousemove', (e) => {
    if (!isDown) return;
    isUp = false;
    e.preventDefault();

    const walk = (e.pageX - scrollLeft - startX) * .76; //scroll-speed 
    //NOTE: INCREASING SPEED MORE MIGHT CAUSE THE SCROLL EFFECT TO GET STUCK ON REPEAT AND CRASH

    slider.scrollLeft = scrollLeft - walk;
});

// 'MOUSE UP' EVENT ON IMAGE CONTAINERS
imageContainers[0].addEventListener('mousedown', ( ) => buttonOneSelected());
imageContainers[1].addEventListener('mousedown', ( ) => buttonTwoSelected());
imageContainers[2].addEventListener('mousedown', ( ) => buttonThreeSelected());

// 'MOUSE UP' EVENT ON IMAGE CONTAINERS
imageContainers[0].addEventListener('mousemove', ( ) => buttonOneSelected());
imageContainers[1].addEventListener('mousemove', ( ) => buttonTwoSelected());
imageContainers[2].addEventListener('mousemove', ( ) => buttonThreeSelected());