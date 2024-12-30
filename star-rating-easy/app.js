const stars = document.querySelectorAll('.star');

stars.forEach((star, index) => {
    star.addEventListener('click', () => {
        // Send the index to the post api or something...
        // Adding grayscale to all stars
        stars.forEach(s => s.style.filter = 'grayscale(100%)');
        // Setting grayscale to 0 for clicked star and all previous stars\
        for (let i = 0; i <= index; i++) {
            stars[i].style.filter = 'grayscale(0)';
        }
    });
});