// Sample Text for Typing Test
const testText = "The intrepid explorer navigated the labyrinthine cave, their heart filled with a sanguine fervor. Obsidian shards glinted in the ethereal light filtering through the celestial opening. Despite the melancholic gloom, a sense of serendipity pervaded the air. The zephyr whispered through the cavern, carrying the ephemeral scent of unknown blooms.";

// Typing Test State Variables
let currentIndex = 0;

// Initialize Typing Test
function initializeTypingTest() {
    const typeTest = document.getElementById('typeTest');
    typeTest.innerHTML = '';

    // Render Text as Spans
    testText.split('').forEach((char) => {
        const span = document.createElement('span');
        span.textContent = char;
        span.classList.add('untyped');
        typeTest.appendChild(span);
    });

    // Add Caret Element
    const caret = document.createElement('div');
    caret.classList.add('caret');
    typeTest.appendChild(caret);

    // Position the caret at the start after DOM rendering
    setTimeout(() => {
        const firstSpan = typeTest.querySelector('span');
        updateCaretPosition(caret, firstSpan);
    }, 0);

    // Add Key Listener
    document.addEventListener('keydown', (event) => handleTyping(event, caret));
}

function handleTyping(event, caret) {
    const typeTest = document.getElementById('typeTest');
    const spans = typeTest.querySelectorAll('span');

    // Stop if test is done
    if (currentIndex >= testText.length) return;

    // Ignore non-character keys
    if (event.key.length > 1 && event.key !== 'Backspace') return;

    const currentChar = testText[currentIndex];
    const typedChar = event.key;

    // Handle Backspace
    if (typedChar === 'Backspace' && currentIndex > 0) {
        currentIndex--;
        spans[currentIndex].classList.remove('correct', 'incorrect');
        spans[currentIndex].classList.add('untyped');
        // Ensure the caret position updates correctly
        updateCaretPosition(caret, spans[currentIndex]);

        // Remove the key from the incorrect set if backspace is used
        incorrectKeys.delete(currentChar.toLowerCase());
        drawKeyboard(currentTheme); // Re-render keyboard after backspace
        return;
    }

    // Check if correct or incorrect
    if (typedChar === currentChar) {
        spans[currentIndex].classList.remove('untyped');
        spans[currentIndex].classList.add('correct');
        // Remove from incorrect set if typed correctly
        incorrectKeys.delete(currentChar.toLowerCase());
    } else if (typedChar.length === 1) {
        spans[currentIndex].classList.remove('untyped');
        spans[currentIndex].classList.add('incorrect');
        // Add incorrect key to the pressed keys set
        incorrectKeys.add(typedChar.toLowerCase());
        // Set a timeout to remove the incorrect key highlight after a short period
        setTimeout(() => {
            incorrectKeys.delete(typedChar.toLowerCase());
            drawKeyboard(currentTheme); // Re-render the keyboard
        }, 100); // Remove highlight after 1 second
    }

    // Move to the next character
    currentIndex++;
    if (currentIndex < testText.length) {
        updateCaretPosition(caret, spans[currentIndex]);
    }

    drawKeyboard(currentTheme); // Re-render the keyboard to reflect changes
}

// Update Caret Position
function updateCaretPosition(caret, targetSpan) {
    caret.style.left = `${targetSpan.offsetLeft}px`;
    caret.style.top = `${targetSpan.offsetTop + targetSpan.offsetHeight / 2 - caret.offsetHeight / 2}px`;
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