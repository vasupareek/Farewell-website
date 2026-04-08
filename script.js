const logoBtn = document.getElementById("logoBtn");
const dropdown = document.getElementById("dropdownMenu");

logoBtn.addEventListener("click", () => {
    dropdown.classList.toggle("show");
});

window.addEventListener("click", (e) => {
    if (!logoBtn.contains(e.target) && !dropdown.contains(e.target)) {
        dropdown.classList.remove("show");
    }
});
