const canvas = document.getElementById('keyboardCanvas');
const ctx = canvas.getContext('2d');

// Set high-resolution canvas for sharper rendering
const scaleFactor = window.devicePixelRatio || 2; // Adjust for high-DPI screens
canvas.width = 1000 * scaleFactor; // Canvas resolution (width)
canvas.height = 500 * scaleFactor; // Canvas resolution (height)
canvas.style.width = "1000px"; // Display size (width)
canvas.style.height = "500px"; // Display size (height)
ctx.scale(scaleFactor, scaleFactor); // Scale all drawings

// Keyboard layout without arrow keys and with fixed tilde (`~`) key
const keys = [
    [
        { label: '`', size: 1 }, { label: '1', size: 1 }, { label: '2', size: 1 }, { label: '3', size: 1 },
        { label: '4', size: 1 }, { label: '5', size: 1 }, { label: '6', size: 1 }, { label: '7', size: 1 },
        { label: '8', size: 1 }, { label: '9', size: 1 }, { label: '0', size: 1 }, { label: '-', size: 1 },
        { label: '=', size: 1 }, { label: 'Backspace', size: 2 }
    ],
    [
        { label: 'Tab', size: 1.5 }, { label: 'Q', size: 1 }, { label: 'W', size: 1 }, { label: 'E', size: 1 },
        { label: 'R', size: 1 }, { label: 'T', size: 1 }, { label: 'Y', size: 1 }, { label: 'U', size: 1 },
        { label: 'I', size: 1 }, { label: 'O', size: 1 }, { label: 'P', size: 1 }, { label: '[', size: 1 },
        { label: ']', size: 1 }, { label: '\\', size: 1.5 }
    ],
    [
        { label: 'Caps Lock', size: 1.75 }, { label: 'A', size: 1 }, { label: 'S', size: 1 }, { label: 'D', size: 1 },
        { label: 'F', size: 1 }, { label: 'G', size: 1 }, { label: 'H', size: 1 }, { label: 'J', size: 1 },
        { label: 'K', size: 1 }, { label: 'L', size: 1 }, { label: ';', size: 1 }, { label: '\'', size: 1 },
        { label: 'Enter', size: 2.25 }
    ],
    [
        { label: 'Shift', size: 2.25 }, { label: 'Z', size: 1 }, { label: 'X', size: 1 }, { label: 'C', size: 1 },
        { label: 'V', size: 1 }, { label: 'B', size: 1 }, { label: 'N', size: 1 }, { label: 'M', size: 1 },
        { label: ',', size: 1 }, { label: '.', size: 1 }, { label: '/', size: 1 }, { label: 'Shift', size: 2.75 }
    ],
    [
        { label: 'Ctrl', size: 1.25 }, { label: 'Fn', size: 1.25 }, { label: 'Win', size: 1.25 }, { label: 'Alt', size: 1.25 },
        { label: ' ', size: 6.25 }, { label: 'Alt', size: 1.25 }, { label: 'Ctrl', size: 1.25 }
    ]
];

// Layout settings
const keyWidth = 50;
const keyHeight = 50;
const keySpacing = 8;
const startX = 20;
const startY = 20;
const radius = 5;

let pressedKey = null;

// Draw keyboard
function drawKeyboard() {
    ctx.clearRect(0, 0, canvas.width / scaleFactor, canvas.height / scaleFactor);

    let y = startY;
    keys.forEach((row) => {
        let x = startX;
        row.forEach(({ label, size }) => {
            const width = keyWidth * size;

            // Draw key background
            ctx.fillStyle = label === pressedKey ? '#87CEFA' : '#ddd';
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

            // Draw key border
            ctx.strokeStyle = '#000';
            ctx.lineWidth = 1.5;
            ctx.stroke();

            // Draw key label
            ctx.fillStyle = '#000';
            ctx.font = '16px Arial';
            ctx.textAlign = 'center';
            ctx.textBaseline = 'middle';
            ctx.fillText(label, x + width / 2, y + keyHeight / 2);

            x += width + keySpacing;
        });
        y += keyHeight + keySpacing;
    });
}

// Handle key press
window.addEventListener('keydown', (event) => {
    const key = event.key.toUpperCase();
    const foundKey = keys.flat().find(({ label }) => label.toUpperCase() === key);

    if (foundKey) {
        pressedKey = foundKey.label;
        drawKeyboard();
        setTimeout(() => {
            pressedKey = null;
            drawKeyboard();
        }, 200);
    }
});

// Initial draw
drawKeyboard();