window.onload = function() {
    document.body.offsetHeight;
    const logoIcon = document.getElementById("themeToggle");
    let currentRotation = parseInt(logoIcon.getAttribute('data-rotation') || '0');
    if (currentRotation === 0) {
        currentRotation = 45;
        logoIcon.style.transform = `rotate(${currentRotation}deg)`;
        logoIcon.setAttribute('data-rotation', currentRotation);
    }
};

// theme switcher
function toggle_mode() {
    const bodyElement = document.getElementsByTagName("body")[0];
    const logoIcon = document.getElementById("themeToggle");
    const linkElements = document.querySelectorAll("a");

    let currentRotation = parseInt(logoIcon.getAttribute('data-rotation') || '0');
    currentRotation += 360;

    logoIcon.style.transform = `rotate(${currentRotation}deg)`;
    logoIcon.setAttribute('data-rotation', currentRotation);

    if (bodyElement.classList.contains("body2")) {
        bodyElement.classList.remove("body2");
        bodyElement.classList.add("body");

        linkElements.forEach(link => {
            link.classList.add("dark-mode-link");
            link.classList.remove("light-mode-link");
        });

        currentTheme = 'dark';
    } else {
        bodyElement.classList.remove("body");
        bodyElement.classList.add("body2");

        linkElements.forEach(link => {
            link.classList.add("light-mode-link");
            link.classList.remove("dark-mode-link");
        });

        currentTheme = 'light';
    }

    drawKeyboard(currentTheme);
}


// Location and Weather details
const geocodeApiKey = '4c917072083a4502a4e90947fab8ddf1';
const weatherApiUrl = 'https://api.open-meteo.com/v1/forecast';


document.addEventListener("DOMContentLoaded", function () {
    const locationNameElem = document.getElementById('location-name');
    const typingInputElem = document.getElementById('typingInput');

    async function getLocationName(lat, lon) {
        try {
            const response = await fetch(`https://api.opencagedata.com/geocode/v1/json?q=${lat}+${lon}&key=${geocodeApiKey}`);
            if (!response.ok) throw new Error("Failed to fetch data from OpenCage API");

            const data = await response.json();
            if (data.results && data.results.length > 0) {
                const components = data.results[0].components;
                const area = components.suburb || components.neighbourhood || components.village || components.town || "Unknown Area";
                const city = components.city || components.town || components.state || "Unknown City";
                return `${area}, ${city}`;
            } else {
                return "Location name not found";
            }
        } catch (error) {
            console.error("Error fetching location name:", error.message);
            return "Error fetching location details.";
        }
    }

    async function getWeather(lat, lon) {
        try {
            const response = await fetch(`${weatherApiUrl}?latitude=${lat}&longitude=${lon}&current_weather=true`);
            if (!response.ok) throw new Error("Failed to fetch weather data");

            const data = await response.json();
            if (data.current_weather) {
                const temperature = data.current_weather.temperature;
                return `${temperature}°C`;
            } else {
                return "Weather data not available";
            }
        } catch (error) {
            console.error("Error fetching weather data:", error.message);
            return "Error fetching weather details.";
        }
    }

    function getUserLocation() {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(
                async (position) => {
                    const {latitude, longitude} = position.coords;

                    const locationName = await getLocationName(latitude, longitude);
                    const weather = await getWeather(latitude, longitude);

                    locationNameElem.classList.add('fade-out'); // Fade out
                    setTimeout(() => {
                        locationNameElem.textContent = `${locationName} • ${weather}`;
                        locationNameElem.classList.remove('fade-out');
                        locationNameElem.classList.add('fade-in'); // Fade in
                    }, 2000); // Delay for 2 seconds before fading in
                },
                (error) => {
                    console.error("Geolocation error:", error.message);
                    switch (error.code) {
                        case error.PERMISSION_DENIED:
                            locationNameElem.textContent = "Permission to access location was denied.";
                            break;
                        case error.POSITION_UNAVAILABLE:
                            locationNameElem.textContent = "Location information is unavailable.";
                            break;
                        case error.TIMEOUT:
                            locationNameElem.textContent = "The request to get user location timed out.";
                            break;
                        default:
                            locationNameElem.textContent = "An unknown error occurred while fetching location.";
                    }
                }
            );
        } else {
            locationNameElem.textContent = "Geolocation is not supported by your browser.";
        }
    }

    const currentHour = new Date().getHours();
    let greetingMessage;
    if (currentHour < 12) {
        greetingMessage = "Welcome! A very good morning :) ";
    } else if (currentHour < 18) {
        greetingMessage = "Welcome! A very good afternoon :)";
    } else {
        greetingMessage = "Welcome! A very good evening :) ";
    }

    locationNameElem.textContent = greetingMessage;

    setTimeout(() => {
        getUserLocation();
    }, 1500);

    typingInputElem.focus();
});

const style = document.createElement('style');
style.innerHTML = `
    .fade-out {
        opacity: 0;
        transition: opacity 0.5s ease-out;
    }

    .fade-in {
        opacity: 1;
        transition: opacity 0.5s ease-in;
    }
`;
document.head.appendChild(style);