function toggle_mode() {
    const bodyElement = document.getElementsByTagName("body")[0];

    // Check the current color to determine which styles to apply
    if (bodyElement.classList.contains("body")) {
        bodyElement.classList.remove("body");
        bodyElement.classList.add("body2");
        bodyElement.getElementsByTagName("a")[0].style.color = "black";
        // bodyElement.getElementsByClassName(".topnav")[0].style.color = "black";
    } else {
        bodyElement.classList.remove("body2");
        bodyElement.classList.add("body");
        bodyElement.getElementsByTagName("a")[0].style.color = "white";
    }
}
