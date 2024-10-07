function toggle_mode() {
    const bodyElement = document.getElementsByTagName("body")[0];

    // Check the current color to determine which styles to apply using decision control statements
    if (bodyElement.classList.contains("body")) {
        bodyElement.classList.remove("body");
        bodyElement.classList.add("body2");
    } else {
        bodyElement.classList.remove("body2");
        bodyElement.classList.add("body");
    }
}

function mouseoverevent(element) {
    const previewId = element.getAttribute("data-preview");
    const previewImage = document.getElementById(previewId);
    previewImage.style.display = "block";
    setTimeout(() => {
        previewImage.style.opacity = '1';
    }, 500);
}

function mouseleaveevent(element) {
    const previewId = element.getAttribute("data-preview");
    const previewImage = document.getElementById(previewId);
    previewImage.style.opacity = '0';
    setTimeout(() => {
        previewImage.style.display = "none";
    }, 300);
}