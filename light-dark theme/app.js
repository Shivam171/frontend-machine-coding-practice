(function () {
    const themeBtn = document.getElementById('themeTrigger');
    const body = document.getElementById('body');
    themeBtn.addEventListener("click", () => {
        if (body.classList.contains('light')) {
            body.classList.remove('light');
            body.classList.add('dark');
            themeBtn.textContent = 'Switch to Light'; // Update button text
        } else {
            body.classList.remove('dark');
            body.classList.add('light');
            themeBtn.textContent = 'Switch to Dark'; // Update button text
        }
    })
})()