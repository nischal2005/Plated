const toggles = document.querySelectorAll(".filter-toggle");

for (let i = 0; i < toggles.length; i++) {
    toggles[i].addEventListener("click", function () {
        const group = this.parentElement;
        group.classList.toggle("open");
    });
}
