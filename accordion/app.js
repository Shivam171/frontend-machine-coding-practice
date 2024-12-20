const accordionBtn = document.getElementsByClassName("accordion");

for (let i = 0; i < accordionBtn.length; i++) {
    accordionBtn[i].addEventListener("click", function () {
        const panel = this.nextElementSibling;

        // Toggle the hidden class for the panel
        panel.classList.toggle('hidden');
    });
}
