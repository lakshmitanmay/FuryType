// index.html
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

let pressedKeys = new Set(); // Track multiple pressed keys

let keyPressDuration = 150; // Time in milliseconds for key press effect
let keyReleaseDuration = 200; // Time in milliseconds for key release effect

function drawKeyboard() {
    ctx.clearRect(0, 0, canvas.width / scaleFactor, canvas.height / scaleFactor);

    let y = startY;
    keys.forEach((row, rowIndex) => {
        let totalRowWidth = 0;
        row.forEach(({label, size}) => {
            totalRowWidth += keyWidth * size + keySpacing;
        });
        totalRowWidth -= keySpacing;

        let x = (canvas.width / scaleFactor - totalRowWidth) / 2;

        row.forEach(({label, size}) => {
            const width = keyWidth * size;
            const height = keyHeight;

            const keyColor = 'rgb(46,52,64)';
            const pressedKeyColor = 'rgb(136,192,208)';
            const keyTextColor = 'rgb(145,154,171)';
            const strokeColor = 'rgba(0, 0, 0, 0)';

            // Smooth color transition: pressed key and released key color change gradually
            let keyFillColor = keyColor;
            if (pressedKeys.has(label)) {
                keyFillColor = pressedKeyColor;
            }

            ctx.fillStyle = keyFillColor;

            ctx.beginPath();
            ctx.moveTo(x + radius, y);
            ctx.lineTo(x + width - radius, y);
            ctx.quadraticCurveTo(x + width, y, x + width, y + radius);
            ctx.lineTo(x + width, y + keyHeight - radius);
            ctx.quadraticCurveTo(x + width, y + keyHeight, x + width - radius, y + keyHeight);
            ctx.lineTo(x + radius, y + keyHeight);
            ctx.quadraticCurveTo(x, y + keyHeight, x, y + keyHeight - radius);
            ctx.lineTo(x, y + radius);
            ctx.quadraticCurveTo(x, y, x + radius, y);
            ctx.closePath();
            ctx.fill();

            ctx.strokeStyle = strokeColor;
            ctx.lineWidth = 1.5;
            ctx.stroke();

            ctx.fillStyle = keyTextColor;
            ctx.font = '16px Helvetica';
            ctx.textAlign = 'center';
            ctx.textBaseline = 'middle';
            ctx.fillText(label, x + width / 2, y + keyHeight / 2);

            if (label === 'f' || label === 'j') {
                ctx.fillStyle = keyTextColor;
                ctx.font = '20px Arial';
                ctx.fillText('_', x + width / 2, y + keyHeight / 1.4);
            }

            x += width + keySpacing;
        });

        y += keyHeight + keySpacing;
    });
}

function handleKeyDown(event) {
    let key = event.key.toLowerCase();

    if (key === " ") {
        key = "space";
    }

    if (event.ctrlKey || event.altKey || event.metaKey || ['shift', 'control', 'alt', 'meta'].includes(key)) {
        return;
    }

    const foundKey = keys.flat().find(({ label }) => label === key);

    if (foundKey && !pressedKeys.has(key)) {
        pressedKeys.add(key);
        drawKeyboard();
    }
}

function handleKeyUp(event) {
    let key = event.key.toLowerCase();

    if (key === " ") {
        key = "space";
    }

    if (event.ctrlKey || event.altKey || event.metaKey || ['shift', 'control', 'alt', 'meta'].includes(key)) {
        return;
    }

    const foundKey = keys.flat().find(({ label }) => label === key);

    if (foundKey) {
        pressedKeys.delete(key);
        drawKeyboard();
    }
}

window.addEventListener('keydown', handleKeyDown);
window.addEventListener('keyup', handleKeyUp);

drawKeyboard();


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