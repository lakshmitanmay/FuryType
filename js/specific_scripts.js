const testText = "The intrepid explorer navigated the labyrinthine cave, their heart filled with a sanguine fervor. Obsidian shards glinted in the ethereal light filtering through the celestial opening. Despite the melancholic gloom, a sense of serendipity pervaded the air. The zephyr whispered through the cavern, carrying the ephemeral scent of unknown blooms.";

let currentIndex = 0;
let totalTime = 30;
let timeLeft = totalTime;
let correctChars = 0;
let totalChars = 0;
let timerInterval = null;
let timerStarted = false;


function initializeTypingTest() {
    currentIndex = 0;
    correctChars = 0;
    totalChars = 0;
    timeLeft = totalTime;
    updateMetrics(0, 100);

    const timeBar = document.getElementById('timeBar');
    timeBar.style.visibility = 'hidden';
    timeBar.style.width = '100%';

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
    updateCaretPosition(caret, typeTest.querySelector('span.untyped'));

    const typingMetrics = document.createElement('div');
    typingMetrics.id = 'typingMetrics';
    typingMetrics.innerHTML = `
        <span id="wpm">0</span>
        <span id="accuracy">0%</span>
    `;
    typingMetrics.style.position = 'absolute';
    typingMetrics.style.top = '-55px';
    typingMetrics.style.left = '0';
    typeTest.appendChild(typingMetrics);
    typingMetrics.classList.remove('visible');



    document.addEventListener('keydown', (event) => handleTyping(event, caret));
}

const highlightTimeouts = {};
const keyStates = {};
let lastKey = null;
let longPressHandled = false;
let pressedKey = null;

function handleTyping(event, caret) {
    const validKeyRegex = /^[a-zA-Z0-9 .,;'/[\]\\\-_=+{}|:>?<()*&^!@#$%~`]$/;
    const typedChar = event.key;
    if ((!validKeyRegex.test(typedChar) && event.key !== 'Backspace') || event.ctrlKey || event.altKey || event.metaKey) {
        return;
    }
    if (typedChar === pressedKey) {
        return;
    }
    pressedKey = typedChar;
    if (!timerStarted && validKeyRegex.test(typedChar) && typedChar !== ' ' && typedChar !== 'Backspace') {
        startTimer();
        timerStarted = true;
        const timeBar = document.getElementById('timeBar');
        timeBar.style.visibility = 'visible';
        typingMetrics.classList.remove('visible');
    }
    const typeTest = document.getElementById('typeTest');
    const spans = typeTest.querySelectorAll('span');
    if (currentIndex >= testText.length) return;
    const currentChar = testText[currentIndex];
    if (typedChar === 'Backspace' && currentIndex > 0) {
        currentIndex--;
        spans[currentIndex].classList.remove('correct', 'incorrect');
        spans[currentIndex].classList.add('untyped');
        updateCaretPosition(caret, spans[currentIndex]);
        return;
    }
    totalChars++;
    function highlightKey(key, isCorrect) {
        const normalizedKey = key.toLowerCase();
        const keyMap = {
            ' ': 'space',
            '.': '.',
            ',': ',',
            ';': ';',
            "'": "'",
            '/': '/',
            '[': '[',
            ']': ']',
        };
        const displayKey = keyMap[normalizedKey] || normalizedKey;
        if (highlightTimeouts[displayKey]) {
            clearTimeout(highlightTimeouts[displayKey]);
            delete highlightTimeouts[displayKey];
        }
        if (!isCorrect) {
            incorrectKeys.add(displayKey);
            pressedKeys.delete(displayKey);
        } else {
            if (!incorrectKeys.has(displayKey)) {
                pressedKeys.add(displayKey);
            }
        }
        drawKeyboard(currentTheme);
        highlightTimeouts[displayKey] = setTimeout(() => {
            if (isCorrect) {
                pressedKeys.delete(displayKey);
            } else {
                incorrectKeys.delete(displayKey);
            }
            delete highlightTimeouts[displayKey];
            drawKeyboard(currentTheme);
        }, 175);
    }
    if (typedChar === currentChar) {
        correctChars++;
        spans[currentIndex].classList.replace('untyped', 'correct');
        highlightKey(typedChar, true);
        currentIndex++;
    } else if (typedChar.length === 1) {
        spans[currentIndex].classList.replace('untyped', 'incorrect');
        highlightKey(typedChar, false);
        currentIndex++;
    }
    if (currentIndex < testText.length) {
        updateCaretPosition(caret, spans[currentIndex]);
    }
    const wpm = calculateWPM(correctChars, totalTime - timeLeft);
    const accuracy = calculateAccuracy(correctChars, totalChars);
    updateMetrics(wpm, accuracy);
}

document.addEventListener('keyup', (event) => {
    if (event.key === pressedKey) {
        pressedKey = null;
    }
});

function startTimer() {
    const timeBar = document.getElementById('timeBar');
    timeBar.style.visibility = 'visible';
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



function updateCaretPosition(caret, targetSpan) {
    if (targetSpan) {
        caret.style.left = `${targetSpan.offsetLeft}px`;
        caret.style.top = `${targetSpan.offsetTop}px`;
    }
}

function calculateWPM(correctChars, elapsedTime) {
    if (elapsedTime === 0) return 0;
    return Math.round((correctChars / 5) / (elapsedTime / 60));
}

function calculateAccuracy(correctChars, totalChars) {
    if (totalChars === 0) return 100;
    return Math.round((correctChars / totalChars) * 100);
}

function updateMetrics(wpm, accuracy) {
    if (!typingMetrics.classList.contains('visible')) {
        typingMetrics.classList.add('visible');
    }
    document.getElementById('wpm').textContent = `${wpm}wpm  |`;
    document.getElementById('accuracy').textContent = `${accuracy}%acc`;
}

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

let shiftPressed = false;

function drawKeyboard(theme) {
    document.fonts.ready.then(() => {
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
            row.forEach(({ label, size }) => {
                totalRowWidth += keyWidth * size + keySpacing;
            });
            totalRowWidth -= keySpacing;

            let x = (canvas.width / scaleFactor - totalRowWidth) / 2;

            row.forEach(({ label, size }) => {
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
                ctx.font = '16px "Ubuntu Sans Mono"';
                ctx.textAlign = 'center';
                ctx.textBaseline = 'middle';

                const displayLabel = shiftPressed ? label.toUpperCase() : label;

                ctx.fillText(displayLabel, x + width / 2, y + keyHeight / 2);

                x += width + keySpacing;
            });

            y += keyHeight + keySpacing;
        });
    });
}

function handleKeyDown(event) {
    let key = event.key.toLowerCase();
    if (key === " ") key = "space";

    if (event.key === "Shift") {
        shiftPressed = true;
        drawKeyboard(currentTheme);
    }
}

function handleKeyUp(event) {
    let key = event.key.toLowerCase();
    if (key === " ") key = "space";

    if (event.key === "Shift") {
        shiftPressed = false;
        drawKeyboard(currentTheme);
    }
}

window.addEventListener('keydown', handleKeyDown);
window.addEventListener('keyup', handleKeyUp);

document.addEventListener('DOMContentLoaded', () => {
    document.fonts.ready.then(() => {
        initializeTypingTest();
        drawKeyboard(currentTheme);
    });
});

// tutorial.html
function showPopup(event, text) {
    const popup = document.getElementById('popup');
    popup.style.left = `${event.pageX + 10}px`;
    popup.style.top = `${event.pageY + 10}px`;
    popup.textContent = text;
    popup.style.display = 'block';
}

function hidePopup() {
    const popup = document.getElementById('popup');
    popup.style.display = 'none';
}

