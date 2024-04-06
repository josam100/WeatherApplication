// Define constants
const apiKey = '9fe653dc36488aff440273274d1dd7ac';
const apiUrl = 'https://api.openweathermap.org/data/2.5/weather?';

// Initialize variables with meaningful names
let cityName = 'New York'; // Default city name
let inputBox = document.getElementById('search-input');
let searchButton = document.getElementById('search-button');

// Function to initialize the default weather display
async function initDefaultWeather() {
    await getWeather(cityName); // Fetch weather for the default city
}

// Function to fetch weather data
async function getWeather(city) {
    try {
        const response = await fetch(`${apiUrl}q=${city}&appid=${apiKey}`);
        const weatherData = await response.json();

        if (!response.ok) {
            // Check for specific error cases (e.g., city not found)
            if (response.status === 404) {
                // Display alert message for invalid city name
                window.alert('City not found. Please enter a valid city name.');
            } else {
                throw new Error('Failed to fetch weather data');
            }
        } else {
            // Update DOM elements with weather information
            document.getElementById('temperature').innerHTML = Math.round(weatherData.main.temp - 273.15);
            document.getElementById('country-name').innerHTML = weatherData.name;
            document.getElementById('wind-speed').innerHTML = `${weatherData.wind.speed} m/s`;
            document.getElementById('wind-humidity').innerHTML = `${weatherData.main.humidity}%`;
        }

    } catch (error) {
        console.error('Error fetching weather data:', error);
        // Handle any other unexpected errors
        window.alert('Failed to fetch weather data. Please try again later.');
    }
}

// Add event listener to the search button
searchButton.addEventListener('click', async () => {
    cityName = inputBox.value.trim(); // Update cityName with the input value
    await getWeather(cityName); // Call getWeather function with the new cityName
});

// Initialize default weather display on page load
document.addEventListener('DOMContentLoaded', () => {
    initDefaultWeather();
});
