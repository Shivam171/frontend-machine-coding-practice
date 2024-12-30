// Step 1 Cache the Dom reference
const stars = document.querySelectorAll('.star');

// Step 2 : Initially selected starts will 0
let selectedRating = 0;

// Step 3: Converting Stars NodeList to array for easier manipulation
const starElements = Array.from(stars);

// Step 5: Debounce Function
function debounce(func, wait) {
    let timer = null;
    return function (...args) {
        if (timer) {
            clearTimeout(timer);
        }
        timer = setTimeout(() => {
            func.apply(null, args)
        }, wait)
    }
}

// Step 7: Function - fillStars
function fillStars(rating) {
    starElements.forEach((star, index) => {
        star.classList.toggle('selected', index < rating);
        star.setAttribute('aria-checked', index < rating);
    })
}

// Step 6: Functions (handleMouseOver, handleMouseOut and handleClick)
function handleMouseOver(index) {
    fillStars(index + 1)
}

function handleMouseOut() {
    fillStars(selectedRating)
}

function handleClick(index) {
    selectedRating = index + 1
    console.log("Selected Rating : ", selectedRating);
}

fillStars(selectedRating)

// Step 4: Event Listeners
starElements.forEach((star, index) => {
    star.addEventListener('mouseover', debounce(() => handleMouseOver(index), 100))
    star.addEventListener('mouseout', debounce(handleMouseOut, 100))
    star.addEventListener('click', debounce(() => handleClick(index), 500))
})

