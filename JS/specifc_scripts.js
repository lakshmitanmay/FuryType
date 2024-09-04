// master_typing.html
function add_delay() {
    const sections = ['sec1', 'sec2', 'sec3'];

    for (let index = 0; index < sections.length; index++) { // using loop control
        setTimeout(() => {
            document.getElementById(sections[index]).style.display = 'block';
        }, (index + 1) * 2000); // 2-second delay between each section
    }
}

document.addEventListener("DOMContentLoaded", function () {
    add_delay();
});