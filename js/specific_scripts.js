// Sample Text for Typing Test
const testText = "The intrepid explorer navigated the labyrinthine cave, their heart filled with a sanguine fervor. Obsidian shards glinted in the ethereal light filtering through the celestial opening. Despite the melancholic gloom, a sense of serendipity pervaded the air. The zephyr whispered through the cavern, carrying the ephemeral scent of unknown blooms.";

// Typing Test State Variables
let currentIndex = 0;
let totalTime = 60; // Total time for the test in seconds
let timeLeft = totalTime;
let correctChars = 0;
let totalChars = 0;
let timerInterval = null;
let timerStarted = false; // Flag to track if the timer has started

// Initialize Typing Test
function initializeTypingTest() {
    currentIndex = 0;
    correctChars = 0;
    totalChars = 0;
    timeLeft = totalTime;
    updateMetrics(0, 100); // Reset metrics display

    // Reset time bar and hide it initially
    const timeBar = document.getElementById('timeBar');
    timeBar.style.width = '100%';
    timeBar.style.visibility = 'hidden';  // Hide time bar initially

    // Initialize spans and caret
    const typeTest = document.getElementById('typeTest');
    typeTest.innerHTML = '';
    testText.split('').forEach((char) => {
        const span = document.createElement('span');
        span.textContent = char;
        span.classList.add('untyped');
        typeTest.appendChild(span);
    });

    const caret = document.createElement('div');
    caret.classList.add('caret');
    typeTest.appendChild(caret);
    setTimeout(() => updateCaretPosition(caret, typeTest.querySelector('span')), 0);

    document.addEventListener('keydown', (event) => handleTyping(event, caret));
}

// Handle Typing Logic
const highlightTimeouts = {}; // Tracks active timeouts for each key
const keyStates = {}; // Tracks the current state of each key ('correct' or 'incorrect')

function handleTyping(event, caret) {
    if (!timerStarted) {
        startTimer();
        timerStarted = true;

        const timeBar = document.getElementById('timeBar');
        timeBar.style.visibility = 'visible';
    }

    const typeTest = document.getElementById('typeTest');
    const spans = typeTest.querySelectorAll('span');

    if (currentIndex >= testText.length) return;

    if (event.key.length > 1 && event.key !== 'Backspace') return;

    const currentChar = testText[currentIndex];
    const typedChar = event.key.toLowerCase();

    // Handle Backspace
    if (typedChar === 'backspace' && currentIndex > 0) {
        currentIndex--;
        spans[currentIndex].classList.remove('correct', 'incorrect');
        spans[currentIndex].classList.add('untyped');
        updateCaretPosition(caret, spans[currentIndex]);
        return;
    }

    totalChars++;

    function highlightKey(key, isCorrect) {
        // Clear any existing timeout for the key
        if (highlightTimeouts[key]) {
            clearTimeout(highlightTimeouts[key]);
            delete highlightTimeouts[key];
        }

        // Ensure priority: Incorrect keys take precedence
        if (isCorrect && keyStates[key] === 'incorrect') return;

        if (!isCorrect && keyStates[key] === 'correct') {
            // If switching from correct to incorrect, remove correct state
            pressedKeys.delete(key);
        }

        // Update key state
        keyStates[key] = isCorrect ? 'correct' : 'incorrect';

        // Add the key to the respective set
        if (isCorrect) {
            pressedKeys.add(key);
            incorrectKeys.delete(key);
        } else {
            incorrectKeys.add(key);
            pressedKeys.delete(key);
        }

        drawKeyboard(currentTheme);

        // Schedule removal of the highlight
        highlightTimeouts[key] = setTimeout(() => {
            // Clear the state and update visuals
            if (isCorrect) {
                pressedKeys.delete(key);
            } else {
                incorrectKeys.delete(key);
            }
            delete keyStates[key]; // Reset the key state
            drawKeyboard(currentTheme);
            delete highlightTimeouts[key];
        }, 150); // Adjustable highlight duration
    }

    // Handle typing logic
    if (typedChar === currentChar.toLowerCase()) {
        // Correct key: Only highlight if no incorrect key is triggered
        if (!incorrectKeys.has(typedChar)) {
            correctChars++;
            spans[currentIndex].classList.replace('untyped', 'correct');
            highlightKey(typedChar, true);
        }
    } else if (typedChar.length === 1) {
        // Incorrect key: Override any correct key highlight
        spans[currentIndex].classList.replace('untyped', 'incorrect');
        highlightKey(typedChar, false);
    }

    currentIndex++;
    if (currentIndex < testText.length) {
        updateCaretPosition(caret, spans[currentIndex]);
    }

    const wpm = calculateWPM(correctChars, totalTime - timeLeft);
    const accuracy = calculateAccuracy(correctChars, totalChars);
    updateMetrics(wpm, accuracy);
}

// Start Timer
function startTimer() {
    const timeBar = document.getElementById('timeBar');
    timerInterval = setInterval(() => {
        timeLeft--;
        const progress = (timeLeft / totalTime) * 100;
        timeBar.style.width = `${progress}%`;

        if (timeLeft <= 0) {
            clearInterval(timerInterval);
            alert("Time's up! Typing test completed.");
        }
    }, 1000);
}

// Update Caret Position
function updateCaretPosition(caret, targetSpan) {
    caret.style.left = `${targetSpan.offsetLeft}px`;
    caret.style.top = `${targetSpan.offsetTop + targetSpan.offsetHeight / 2 - caret.offsetHeight / 2}px`;
}

// Calculate WPM
function calculateWPM(correctChars, elapsedTime) {
    if (elapsedTime === 0) return 0;
    return Math.round((correctChars / 5) / (elapsedTime / 60)); // Words are ~5 chars
}

// Calculate Accuracy
function calculateAccuracy(correctChars, totalChars) {
    if (totalChars === 0) return 100;
    return Math.round((correctChars / totalChars) * 100);
}

// Update Metrics Display
function updateMetrics(wpm, accuracy) {
    document.getElementById('wpm').textContent = `${wpm}`;
    document.getElementById('accuracy').textContent = `${accuracy}%`;
}

// Keyboard Visualization Logic
const canvas = document.getElementById('keyboardCanvas');
const ctx = canvas.getContext('2d');

const scaleFactor = window.devicePixelRatio || 2;
canvas.width = 750 * scaleFactor;
canvas.height = 250 * scaleFactor;
canvas.style.width = "750px";
canvas.style.height = "250px";
ctx.scale(scaleFactor, scaleFactor);

const keys = [
    [
        {label: 'q', size: 1}, {label: 'w', size: 1}, {label: 'e', size: 1}, {label: 'r', size: 1},
        {label: 't', size: 1}, {label: 'y', size: 1}, {label: 'u', size: 1}, {label: 'i', size: 1},
        {label: 'o', size: 1}, {label: 'p', size: 1}, {label: '[', size: 1}, {label: ']', size: 1}
    ],
    [
        {label: 'a', size: 1}, {label: 's', size: 1}, {label: 'd', size: 1}, {label: 'f', size: 1},
        {label: 'g', size: 1}, {label: 'h', size: 1}, {label: 'j', size: 1}, {label: 'k', size: 1},
        {label: 'l', size: 1}, {label: ';', size: 1}, {label: '\'', size: 1}
    ],
    [
        {label: 'z', size: 1}, {label: 'x', size: 1}, {label: 'c', size: 1}, {label: 'v', size: 1},
        {label: 'b', size: 1}, {label: 'n', size: 1}, {label: 'm', size: 1}, {label: ',', size: 1},
        {label: '.', size: 1}, {label: '/', size: 1}
    ],
    [
        {label: 'space', size: 6.25}
    ]
];

const keyWidth = 50;
const keyHeight = 50;
const keySpacing = 8;
const startX = 20;
const startY = 20;
const radius = 20;

let pressedKeys = new Set();
let incorrectKeys = new Set();
let currentTheme = 'dark';

function drawKeyboard(theme) {
    ctx.clearRect(0, 0, canvas.width / scaleFactor, canvas.height / scaleFactor);

    const themeColors = {
        dark: {
            keyColor: 'rgb(46,52,64)',
            pressedKeyColor: 'rgb(136,192,208)',
            incorrectKeyColor: 'rgb(191,97,106)',
            keyTextColor: 'rgb(145,154,171)',
        },
        light: {
            keyColor: 'rgb(216,222,233)',
            pressedKeyColor: 'rgb(143,188,187)',
            incorrectKeyColor: 'rgb(191,97,106)',
            keyTextColor: 'rgb(105,119,145)',
        }
    };

    let y = startY;
    keys.forEach((row) => {
        let totalRowWidth = 0;
        row.forEach(({label, size}) => {
            totalRowWidth += keyWidth * size + keySpacing;
        });
        totalRowWidth -= keySpacing;

        let x = (canvas.width / scaleFactor - totalRowWidth) / 2;

        row.forEach(({label, size}) => {
            const width = keyWidth * size;
            const height = keyHeight;

            const keyColor = themeColors[theme].keyColor;
            const pressedKeyColor = themeColors[theme].pressedKeyColor;
            const incorrectKeyColor = themeColors[theme].incorrectKeyColor;
            const keyTextColor = themeColors[theme].keyTextColor;

            let keyFillColor = keyColor;
            if (incorrectKeys.has(label)) {
                keyFillColor = incorrectKeyColor;
            } else if (pressedKeys.has(label)) {
                keyFillColor = pressedKeyColor;
            }

            ctx.fillStyle = keyFillColor;
            ctx.beginPath();
            ctx.roundRect(x, y, width, height, radius);
            ctx.closePath();
            ctx.fill();

            ctx.fillStyle = keyTextColor;
            ctx.font = '16px Ubuntu Sans Mono';
            ctx.textAlign = 'center';
            ctx.textBaseline = 'middle';
            ctx.fillText(label, x + width / 2, y + keyHeight / 2);

            x += width + keySpacing;
        });

        y += keyHeight + keySpacing;
    });
}

function handleKeyDown(event) {
    let key = event.key.toLowerCase();
    if (key === " ") key = "space";
    if (!event.ctrlKey && !event.altKey && !event.metaKey) {
        pressedKeys.add(key);
        drawKeyboard(currentTheme);
    }
}

function handleKeyUp(event) {
    let key = event.key.toLowerCase();
    if (key === " ") key = "space";
    if (!event.ctrlKey && !event.altKey && !event.metaKey) {
        pressedKeys.delete(key);
        drawKeyboard(currentTheme);
    }
}

window.addEventListener('keydown', handleKeyDown);
window.addEventListener('keyup', handleKeyUp);

// Initialize Both Typing Test and Keyboard Visualization
document.addEventListener('DOMContentLoaded', () => {
    initializeTypingTest();
    drawKeyboard(currentTheme);
});