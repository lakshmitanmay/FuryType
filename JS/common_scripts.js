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