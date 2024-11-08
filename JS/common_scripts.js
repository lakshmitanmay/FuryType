function toggle_mode() {
    const bodyElement = document.getElementsByTagName("body")[0];
    const paragraphElement = document.querySelector(".paragraph");
    const typingMetricsElement = document.querySelector(".typing_metrics");

    if (bodyElement.classList.contains("body2")) {
        bodyElement.classList.remove("body2");
        bodyElement.classList.add("body");

        paragraphElement.classList.add("dark-mode-paragraph");
        paragraphElement.classList.remove("light-mode-paragraph");
        typingMetricsElement.classList.add("dark-mode-metrics");
        typingMetricsElement.classList.remove("light-mode-metrics");

    } else {
        bodyElement.classList.remove("body");
        bodyElement.classList.add("body2");

        paragraphElement.classList.add("light-mode-paragraph");
        paragraphElement.classList.remove("dark-mode-paragraph");
        typingMetricsElement.classList.add("light-mode-metrics");
        typingMetricsElement.classList.remove("dark-mode-metrics");
    }
}
