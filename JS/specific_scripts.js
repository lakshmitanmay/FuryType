let startTime, timerInterval;
const maxTime = 15;

document.addEventListener("DOMContentLoaded", function () {
    if (document.querySelector('.steps_frame') || document.querySelector('.youtube_video')) {
        add_frame_delay();
    }
    if (document.getElementById('sec1') || document.getElementById('sec2') || document.getElementById('sec3')) {
        add_sec_delay();
    }

    const typingInput = document.getElementById("typingInput");
    if (typingInput) {
        typingInput.addEventListener("input", calculateMetrics);
    }

    const metricsDisplay = document.getElementById("metricsDisplay");
    if (metricsDisplay) {
        metricsDisplay.classList.add("hidden");
    }
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

// tutorial.html
function add_frame_delay() {
    const element1 = document.querySelector('.steps_frame');
    const element2 = document.querySelector('.youtube_video');

    if (element1 && element2) {
        setTimeout(() => {
            element1.style.display = 'block';
            setTimeout(() => {
                element1.style.opacity = '1';
            }, 10);

            element2.style.display = 'block';
            setTimeout(() => {
                element2.style.opacity = '1';
            }, 10);
        }, 1000);
    }
}

function add_sec_delay() {
    const sections = ['sec1', 'sec2', 'sec3'];

    sections.forEach((sectionId, index) => {
        const element = document.getElementById(sectionId);
        if (element) {
            setTimeout(() => {
                element.style.display = 'block';
                setTimeout(() => {
                    element.style.opacity = '1';
                }, 10);
            }, (index + 1) * 1500);
        }
    });
}
