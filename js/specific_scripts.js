const paragraphs = [
    "The intrepid explorer navigated the labyrinthine cave, their heart filled with a sanguine fervor. Obsidian shards glinted in the ethereal light filtering through the celestial opening. Despite the melancholic gloom, a sense of serendipity pervaded the air.",
    "Beneath the sprawling oak tree, a whimsical tune carried on the breeze. The golden sun cast a kaleidoscope of shadows on the forest floor, painting a mosaic of life. A lone fox darted between the bushes, its coat shimmering like fire.",
    "The bustling city street was alive with energy, a cacophony of car horns, distant laughter, and hurried footsteps. Neon lights flickered above, advertising dreams in vibrant hues. A street artist sketched portraits, capturing fleeting moments of humanity.",
    "In the quiet solitude of the library, pages whispered tales of adventure and romance. The scent of old books mingled with the faint aroma of coffee. A young student poured over texts, their pencil dancing across a notebook.",
    "A storm brewed on the horizon, its dark clouds roiling like an angry sea. Thunder cracked, echoing through the valley as the first drops of rain kissed the parched earth. Nature prepared its symphony, wild and untamed.",
    "The tranquil garden was a sanctuary of peace, where colorful butterflies flitted amongst blooming flowers. A gentle stream babbled nearby, its waters reflecting the azure sky. Birds chirped melodically, creating a harmonious backdrop.",
    "High atop the mountain peak, the world seemed to stretch endlessly. Snow-capped tips glistened under the sun's embrace, while the crisp air invigorated the spirit. A lone eagle soared gracefully, a symbol of freedom and majesty.",
    "In the heart of the village, a festival erupted with vibrant colors and joyous laughter. Stalls lined the streets, offering exotic spices and handmade crafts. Children danced around a maypole, their faces painted in vivid patterns.",
    "The morning sun crept over the horizon, casting a warm glow upon the sleepy town. The sweet scent of freshly baked bread wafted from the bakery, enticing the senses. A young couple strolled hand-in-hand, their laughter echoing through the empty streets.",
    "Aboard the wooden ship, the salty sea breeze whipped through the sails. Seagulls cried overhead as the crew worked in tandem, their muscles flexing with each wave. The captain's eyes scanned the horizon, his heart yearning for adventure.",
    "In the quiet hours of dawn, the city's underbelly stirred. Streetlights flickered, casting shadows on the deserted streets. A lone figure emerged from the darkness, their footsteps echoing off the skyscrapers.",
    "Amidst the ancient ruins, a lone traveler stumbled upon a forgotten artifact. The relic glowed with an ethereal light, its secrets waiting to be unearthed. The air was heavy with an air of mystery, whispers of a long-lost civilization.",
    "The snow-capped mountains loomed in the distance, their peaks shrouded in mist. A lone skier carved through the powder, their tracks weaving a serpentine path down the mountain. The wind howled through the valleys, its icy breath biting at the skin.",
    "In the heart of the forest, a clearing beckoned. A babbling brook flowed through its center, its waters reflecting the dappled sunlight filtering through the trees. A doe and her fawn grazed peacefully, their large eyes watchful yet serene.",
    "The sleek starship hurtled through the inky void, its engines humming a song of distant galaxies. Nebulas painted the viewport in swirling hues of purple and gold. A lone astronaut gazed at the cosmic panorama, contemplating the vast unknown.",
    "Cybernetic implants pulsed beneath the skin of the augmented operative. Rain lashed against the neon-drenched streets of Neo-Tokyo. A data stream flowed through their neural interface, connecting them to the city's digital heart.",
    "A dense fog clung to the cobbled streets of the old town, obscuring the secrets it held. A single lamppost cast a feeble glow, revealing a trail of muddy footprints. A detective pulled their coat tighter, their senses alert for a hidden clue.",
    "The locked room held an air of unease, the silence heavy with unspoken truths. An antique clock ticked ominously in the corner, its hands frozen at a peculiar time. A faint scent of almonds hung in the air, a telltale sign of foul play.",
    "The elven archer drew back their bow, the string humming with latent power. A shimmer of magic enveloped their arrow, its tip glowing with ethereal light. The dark forest rustled with unseen creatures, their eyes glinting in the shadows.",
    "The dragon soared through the sky, its scales shimmering like a thousand emeralds. A plume of smoke trailed behind it as it descended upon the castle, its roar shaking the very foundations of the ancient fortress.",
    "The cobblestones of Rome echoed with the footsteps of legionaries marching to war. The sun beat down on their bronze armor, reflecting the heat of the day. A chariot raced through the streets, its driver determined to reach the forum in time.",
    "The grand ballroom was aglow with candlelight, the air filled with the scent of roses and expensive perfume. Ladies in silk gowns twirled with their partners, their laughter blending with the music of a live orchestra.",
    "The aroma of freshly brewed coffee filled the trendy café, attracting a diverse clientele. A laptop sat open on a table, a screenplay in progress. A group of friends laughed over lattes, their conversation animated and loud.",
    "A lone skateboarder weaved through the park, their board gliding over the concrete. The setting sun painted the sky in hues of orange and pink. The rhythmic sound of the wheels echoed through the twilight, a fleeting moment of freedom."
];

let testText = getRandomParagraph();

let currentIndex = 0;
let totalTime = 30;
let timeLeft = totalTime;
let correctChars = 0;
let totalChars = 0;
let timerInterval = null;
let timerStarted = false;
let startTime = null;
let wpmHistory = [];
let consistencyScores = [];
let lastCharacterTime = null;
let currentConsistency = 100;


function initializeTypingTest() {
    currentIndex = 0;
    correctChars = 0;
    totalChars = 0;
    timeLeft = totalTime;
    updateMetrics(0, 100, 0);
    wpmHistory = [];
    consistencyScores = [];
    startTime = null;
    lastCharacterTime = null;
    currentConsistency = 100;


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
        <span id="wpm">0wpm</span> <span id="accuracy">0%acc</span>  <span id="rawWpm">0raw</span>
    `;
    typingMetrics.style.position = 'absolute';
    typingMetrics.style.top = '-55px';
    typingMetrics.style.left = '0';
    typeTest.appendChild(typingMetrics);
    typingMetrics.classList.remove('visible');


    document.removeEventListener('keydown', handleTyping);
    document.addEventListener('keydown', handleTyping);
}

function getRandomParagraph() {
    const randomIndex = Math.floor(Math.random() * paragraphs.length);
    return paragraphs[randomIndex];
}

const highlightTimeouts = {};
const keyStates = {};
let lastKey = null;
let longPressHandled = false;
let pressedKey = null;

function handleTyping(event) {
    const validKeyRegex = /^[a-zA-Z0-9 .,;'/[\]\\\-_=+{}|:>?<()*&^!@#$%~`]$/;
    const typedChar = event.key;

    if ((!validKeyRegex.test(typedChar) && event.key !== 'Backspace') || event.metaKey) {
        return;
    }
    if (typedChar === pressedKey) {
        return;
    }
    pressedKey = typedChar;
    if (!timerStarted && validKeyRegex.test(typedChar) && typedChar !== ' ' && typedChar !== 'Backspace') {
        startTimer();
        timerStarted = true;
        startTime = new Date().getTime();
        lastCharacterTime = new Date().getTime();
        const timeBar = document.getElementById('timeBar');
        timeBar.style.visibility = 'visible';
        startMetricUpdater();
    }

    const typeTest = document.getElementById('typeTest');
    const spans = typeTest.querySelectorAll('span');
    const caret = typeTest.querySelector('.caret');

    if (typedChar === 'Backspace') {
        if (event.ctrlKey || event.altKey || event.metaKey) {
            deletePreviousWord(spans, caret);
        } else if (currentIndex > 0) {
            currentIndex--;
            spans[currentIndex].classList.remove('correct', 'incorrect');
            spans[currentIndex].classList.add('untyped');
            if (caret && spans[currentIndex]) {
                updateCaretPosition(caret, spans[currentIndex]);
            }
        }
        return;
    }

    if(currentIndex >= testText.length) return;
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

    const currentChar = testText[currentIndex];

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
        if (caret && spans[currentIndex]) {
            updateCaretPosition(caret, spans[currentIndex]);
        }
    } else if (currentIndex === testText.length) {
        endTypingTest();
    }

    if (startTime) {
        const now = new Date().getTime();
        const elapsedTime = (now - startTime) / 1000;
        const wpm = calculateWPM(correctChars, elapsedTime);
        wpmHistory.push({ time: totalTime - timeLeft, wpm: wpm });
        if (lastCharacterTime) {
            const timeSinceLastChar = (now - lastCharacterTime) / 1000;
            consistencyScores.push(timeSinceLastChar);
            currentConsistency = calculateConsistency();
        }
        lastCharacterTime = now;
    }
}


function deletePreviousWord(spans, caret) {
    if (currentIndex <= 0) return;
    let initialIndex = currentIndex;

    while (currentIndex > 0 && testText[currentIndex-1] === ' ') {
        currentIndex--;
    }

    while (currentIndex > 0 && testText[currentIndex - 1] !== ' ') {
        currentIndex--;
    }

    for (let i = initialIndex -1; i >= currentIndex; i--) {
        spans[i].classList.remove('correct', 'incorrect');
        spans[i].classList.add('untyped');
    }

    if (caret && spans[currentIndex]) {
        updateCaretPosition(caret, spans[currentIndex]);
    }
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
            endTypingTest();
        }
    }, 1000);
}

function updateCaretPosition(caret, targetSpan) {
    if (caret && targetSpan) {
        caret.style.left = `${targetSpan.offsetLeft}px`;
        caret.style.top = `${targetSpan.offsetTop}px`;
    }
}

function calculateWPM(correctChars, elapsedTime) {
    if (elapsedTime <= 0 || correctChars === 0) return 0;
    const wordsTyped = Math.floor(correctChars / 5);
    return Math.round(wordsTyped / (elapsedTime / 60));
}

function calculateAccuracy(correctChars, totalChars) {
    if (totalChars === 0) return 100;
    return Math.round((correctChars / totalChars) * 100);
}

function updateMetrics(wpm, accuracy, rawWpm) {
    let typingMetrics = document.getElementById('typingMetrics');

    if (!typingMetrics) {
        typingMetrics = document.createElement('div');
        typingMetrics.id = 'typingMetrics';
        typingMetrics.style.position = 'absolute';
        typingMetrics.style.top = '-55px';
        typingMetrics.style.left = '0';
        const typeTest = document.getElementById('typeTest');
        if (typeTest) typeTest.appendChild(typingMetrics);
    }

    if (!typingMetrics.classList.contains('visible')) {
        typingMetrics.classList.add('visible');
    }


    typingMetrics.innerHTML = `
        <span id="wpm">${wpm}wpm</span> <span id="accuracy">${accuracy}%acc</span> <span id="rawWpm">${rawWpm}raw</span>
    `;
}

let metricUpdaterInterval = null;

function startMetricUpdater() {
    metricUpdaterInterval = setInterval(() => {
        if (startTime) {
            const elapsedTime = (new Date().getTime() - startTime) / 1000;
            const wpm = calculateWPM(correctChars, elapsedTime);
            const accuracy = calculateAccuracy(correctChars, totalChars);
            const rawWpm = Math.round((totalChars / elapsedTime) * 60 * 0.2);

            updateMetrics(wpm, accuracy, rawWpm);
        }
    }, 100);
}


function endTypingTest() {
    clearInterval(timerInterval);
    clearInterval(metricUpdaterInterval);

    const typeTest = document.getElementById('typeTest');
    if (typeTest) {
        typeTest.style.display = 'none';
    }

    let resultScreen = document.getElementById('resultScreen');
    if (!resultScreen) {
        resultScreen = document.createElement('div');
        resultScreen.id = 'resultScreen';
        resultScreen.classList.add('result-screen');
        document.body.appendChild(resultScreen);
    }

    const wpm = calculateWPM(correctChars, totalTime - timeLeft);
    const accuracy = calculateAccuracy(correctChars, totalChars);
    const numCorrect = correctChars
    const numIncorrect = totalChars - correctChars;
    const numUntyped = testText.length - totalChars;


    const resultTime = totalTime - timeLeft;
    const rawWpm = Math.round((totalChars / resultTime) * 60 * 0.2).toFixed(2);

    currentConsistency = calculateConsistency();

    resultScreen.innerHTML = `
         <h2>test complete</h2>
        <div class="main-result">
                ${wpm}<span>wpm</span> | ${accuracy}<span>%acc</span>
          </div>
        <div class="metrics-container">
            <div class="metric">
                raw
                <span>${rawWpm}</span>
            </div>
             <div class="metric">
                characters
                <span>${numCorrect}/${numIncorrect}/${numUntyped}</span>
            </div>
             <div class="metric">
                consistency
                <span>${currentConsistency.toFixed(2)}%</span>
            </div>
             <div class="metric">
                time
                <span>${resultTime.toFixed(2)}s</span>
            </div>
             <canvas id="resultGraph"></canvas>

        </div>
         <button class="retry-button">></button>
    `;
    drawGraph();

    const tryAgainButton = document.querySelector('.retry-button');
    tryAgainButton.addEventListener('click', resetTestState);

    const typingMetrics = document.getElementById('typingMetrics');
    if (typingMetrics) {
        typingMetrics.remove();
    }
}


function calculateConsistency() {
    if (consistencyScores.length < 2) return 100;

    let averageConsistencyDifference = 0
    for(let i = 1; i < consistencyScores.length; i++){
        const currentChange = Math.abs(consistencyScores[i] - consistencyScores[i-1])
        averageConsistencyDifference = (averageConsistencyDifference * 0.9) + (currentChange * 0.1)
    }

    const standardPercentage =  Math.max(0, 100 - (averageConsistencyDifference * 200))
    let modifiedPercentage;
    if (standardPercentage < 20){
        modifiedPercentage =  Math.round(standardPercentage * 0.4)
    } else {
        modifiedPercentage =  Math.round(standardPercentage);
    }
    return  Math.max(0, Math.min(100, modifiedPercentage));
}


function resetTestState() {
    try {
        console.log('Resetting test state...');

        currentIndex = 0;
        correctChars = 0;
        totalChars = 0;
        timerStarted = false;
        timeLeft = totalTime;
        startTime = null;
        lastCharacterTime = null;
        consistencyScores = []
        currentConsistency = 100;

        if (timerInterval) {
            clearInterval(timerInterval);
            timerInterval = null;
        }

        if (metricUpdaterInterval) {
            clearInterval(metricUpdaterInterval);
            metricUpdaterInterval = null;
        }

        const resultScreen = document.getElementById('resultScreen');
        if (resultScreen) {
            resultScreen.classList.add('fadeOut');

            resultScreen.addEventListener('animationend', () => {
                if(resultScreen.parentNode){
                    resultScreen.remove();
                }
            }, {once:true});
        }

        const typeTest = document.getElementById('typeTest');
        if (typeTest) {
            typeTest.style.display = 'block';
        }

        testText = getRandomParagraph();
        initializeTypingTest();

        console.log('Test state reset successfully.');
    } catch (error) {
        console.error('Error resetting test state:', error);
    }
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

function drawGraph() {
    const graphCanvas = document.getElementById('resultGraph');
    const ctx = graphCanvas.getContext('2d');
    const scaleFactor = window.devicePixelRatio || 2;
    graphCanvas.width = 500 * scaleFactor;
    graphCanvas.height = 150 * scaleFactor;
    graphCanvas.style.width = "500px";
    graphCanvas.style.height = "150px";
    ctx.scale(scaleFactor, scaleFactor);

    const padding = 15;
    const graphWidth = graphCanvas.width / scaleFactor - 2 * padding;
    const graphHeight = graphCanvas.height / scaleFactor - 2 * padding;

    if (wpmHistory.length === 0) return;
    const maxWpm = Math.max(...wpmHistory.map(item => item.wpm), 10);
    const startTime = wpmHistory[0].time;
    const endTime = wpmHistory[wpmHistory.length - 1].time
    const themeColors = {
        dark: {
            graphBackgroundColor: 'rgb(36,41,51)',
            graphLineColor: 'rgb(136,192,208)'
        },
        light: {
            graphBackgroundColor: 'rgb(235,239,243)',
            graphLineColor: 'rgb(121,163,162)'
        }
    };
    ctx.fillStyle = themeColors[currentTheme].graphBackgroundColor;
    ctx.fillRect(0, 0, graphCanvas.width / scaleFactor, graphCanvas.height / scaleFactor)

    ctx.beginPath();
    ctx.strokeStyle = themeColors[currentTheme].graphLineColor;
    ctx.lineWidth = 2;

    const xIncrement = graphWidth / (wpmHistory.length - 1);

    let x = padding;
    ctx.moveTo(x, graphHeight - (wpmHistory[0].wpm / maxWpm) * graphHeight + padding)

    for (let i = 1; i < wpmHistory.length; i++) {
        const y = graphHeight - (wpmHistory[i].wpm / maxWpm) * graphHeight + padding

        ctx.lineTo(x, y);
        x += xIncrement;
    }

    ctx.stroke();

}