document.addEventListener('DOMContentLoaded', (event) => {
    document.getElementById('forecastButton').addEventListener('click', getForecast);
});

function getForecast() {
    const lat = document.getElementById('lat').value;
    const lon = document.getElementById('lon').value;
    const apiKey = '3ca979f46e38c0690e2e59c19c01c55f';
    const url = `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=${apiKey}`;

    fetch(url)
        .then(response => response.json())
        .then(data => {
            const forecastDiv = document.getElementById('forecast');
            forecastDiv.innerHTML = '';

            data.list.forEach(item => {
                const forecastItem = document.createElement('div');
                forecastItem.className = 'forecast-item';
                forecastItem.innerHTML = `
                    <p>Date: ${new Date(item.dt_txt).toLocaleString()}</p>
                    <p>Temperature: ${(item.main.temp - 273.15).toFixed(2)} °C</p>
                    <p>Weather: ${item.weather[0].description}</p>
                `;
                forecastDiv.appendChild(forecastItem);
            });
        })
        .catch(error => console.error('Error fetching the forecast:', error));
}
