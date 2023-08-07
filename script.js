const apiKey = '994b11f5e1be4f01106f3a62d2bd6f48'; // Replace with your API key from OpenWeatherMap or any weather API.

const searchBtn = document.getElementById('searchBtn');
const locationInput = document.getElementById('locationInput');
const weatherInfoDiv = document.getElementById('weatherInfo');

searchBtn.addEventListener('click', () => {
    const location = locationInput.value.trim();
    if (location !== '') {
        getWeatherData(location);
    }
});

async function getWeatherData(location) {
    const apiURL = `https://api.openweathermap.org/data/2.5/weather?q=${location}&appid=${apiKey}&units=metric`;
    try {
        const response = await fetch(apiURL);
        if (!response.ok) {
            throw new Error('Weather data not available for this location.');
        }
        const data = await response.json();
        displayWeatherData(data);
    } catch (error) {
        displayError(error.message);
    }
}

function displayWeatherData(data) {
    const location = `${data.name}, ${data.sys.country}`;
    const temperature = `${data.main.temp} °C`;
    const description = data.weather[0].description;
    const humidity = `Humidity: ${data.main.humidity}%`;

    const weatherInfoHTML = `
        <h2>${location}</h2>
        <p>${temperature}</p>
        <p>${description}</p>
        <p>${humidity}</p>
    `;

    weatherInfoDiv.innerHTML = weatherInfoHTML;
}

function displayError(errorMessage) {
    weatherInfoDiv.innerHTML = `<p class="error">${errorMessage}</p>`;
}
