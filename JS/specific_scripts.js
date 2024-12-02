let startTime, timerInterval;
const maxTime = 15;

document.addEventListener("DOMContentLoaded", function () {
    const popup = document.getElementById('popup');

    function showPopup(event, content) {
        popup.textContent = content;
        popup.style.display = 'block';
        popup.style.left = event.pageX + 15 + 'px';
        popup.style.top = event.pageY + 15 + 'px';
    }

    function hidePopup() {
        popup.style.display = 'none';
    }

    const typingInput = document.getElementById("typingInput");
    if (typingInput) {
        typingInput.addEventListener("input", calculateMetrics);
    }

    const metricsDisplay = document.getElementById("metricsDisplay");
    if (metricsDisplay) {
        metricsDisplay.classList.add("hidden");
    }

    window.showPopup = showPopup;
    window.hidePopup = hidePopup;
});

// index.php
function calculateMetrics() {
    const paragraphText = document.getElementById("testParagraph").innerText;
    const typedText = document.getElementById("typingInput").value;

    if (!startTime) {
        startTime = new Date().getTime();
        timerInterval = setInterval(updateTime, 1000);

        const metricsDisplay = document.getElementById("metricsDisplay");
        metricsDisplay.classList.remove("hidden");
        metricsDisplay.classList.add("visible");
    }

    const wordsTyped = typedText.trim().split(" ").filter(word => word !== "").length;
    const timeElapsedInMinutes = (new Date().getTime() - startTime) / 60000;
    const wpm = Math.round(wordsTyped / timeElapsedInMinutes);

    let correctCharacters = 0;
    const lengthToCheck = Math.min(typedText.length, paragraphText.length);
    for (let i = 0; i < lengthToCheck; i++) {
        if (typedText[i] === paragraphText[i]) {
            correctCharacters++;
        }
    }
    const mistakes = typedText.length - correctCharacters;
    const accuracy = Math.round(((lengthToCheck - mistakes) / lengthToCheck) * 100);

    document.getElementById("wpm").innerText = `Speed: ${wpm} WPM`;
    document.getElementById("accuracy").innerText = `Accuracy: ${accuracy}%`;

    if (typedText === paragraphText) {
        endTest(false);
    }
}

function updateTime() {
    const timeElapsedInSeconds = Math.floor((new Date().getTime() - startTime) / 1000);
    document.getElementById("timeElapsed").innerText = `Time: ${timeElapsedInSeconds}s`;

    if (timeElapsedInSeconds >= maxTime) {
        endTest(true);
    }
}

function endTest(isTimeout) {
    clearInterval(timerInterval);
    document.getElementById("typingInput").disabled = true;

    const timeElapsedInSeconds = Math.floor((new Date().getTime() - startTime) / 1000);
    const wpm = document.getElementById("wpm").innerText.split(" ")[1];
    const accuracy = document.getElementById("accuracy").innerText.split(" ")[1];

    const data = {
        time_elapsed: timeElapsedInSeconds,
        wpm: parseInt(wpm),
        accuracy: parseInt(accuracy)
    };

    fetch('index.php', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(data)
    })
        .then(response => response.text())
        .then(data => {
            console.log(data);
            alert("Metrics saved successfully!");
            location.reload();
        })
        .catch(error => {
            console.error('Error:', error);
        });

}

