const apiKey = '994b11f5e1be4f01106f3a62d2bd6f48'; // Replace with your API key from OpenWeatherMap or any weather API.

const searchBtn = document.getElementById('searchBtn');
const locationInput = document.getElementById('locationInput');
const weatherInfoDiv = document.getElementById('weatherInfo');
const weatherIcon = document.querySelector('.weather-icon');


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
    const description = data.weather[0].main;
    const humidity = `Humidity: ${data.main.humidity}%`;
    document.querySelector('.city').innerHTML = data.name;
    document.querySelector('.temp').innerHTML = `${Math.round(data.main.temp)} °C`;
    document.querySelector('.weatherCondition').innerHTML = data.weather[0].main;
    document.querySelector('.humidity').innerHTML = `${data.main.humidity}%`;
    document.querySelector('.wind').innerHTML = `${data.wind.speed} km/h`;


    if(data.weather[0].main == "Clouds"){
        weatherIcon.src = "images/clouds.png";
    }
    else if(data.weather[0].main == "Clear"){
        weatherIcon.src = "images/clear.png";
    }
    else if(data.weather[0].main == "Rain"){
        weatherIcon.src = "images/rain.png";
    }
    else if(data.weather[0].main == "Drizzle"){
        weatherIcon.src = "images/drizzle.png";
    }
    else if(data.weather[0].main == "Mist"){
        weatherIcon.src = "images/mist.png";
    }
    else if(data.weather[0].main == "Haze"){
        weatherIcon.src = "images/haze.png";
    }

}

function displayError(errorMessage) {
    weatherInfoDiv.innerHTML = `<p class="error">${errorMessage}</p>`;
}




const unitToggle = document.getElementById('unitToggle');
const unitLabel = document.getElementById('unitLabel');

let isCelsius = true; // Default to Celsius

unitToggle.addEventListener('change', () => {
    isCelsius = !isCelsius;
    updateTemperature();
});

function updateTemperature() {
    const temperature = parseFloat(document.querySelector('.temp').textContent);
    const updatedTemperature = isCelsius ? temperature : (temperature * 9/5) + 32;
    const unitText = isCelsius ? 'Celsius' : 'Fahrenheit';
    unitLabel.textContent = unitText;
    document.querySelector('.temp').textContent = updatedTemperature.toFixed(2);
}
