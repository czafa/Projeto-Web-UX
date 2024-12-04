document.addEventListener("scroll", function () {
    const footer = document.querySelector("footer");
    const scrollHeight = document.documentElement.scrollHeight;
    const clientHeight = document.documentElement.clientHeight;
    const scrollTop = window.scrollY;

    if (scrollTop + clientHeight >= scrollHeight - 100) {
        footer.classList.add("visible");
    } else {
        footer.classList.remove("visible");
    }
});
