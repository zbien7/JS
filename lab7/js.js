// Czekamy na załadowanie całej zawartości strony
document.addEventListener('DOMContentLoaded', () => {
    // API key dla OpenWeatherMap
    const apiKey = 'e55598585c034b4054a7157ec1298f46';
    // Pobieramy referencje do elementów HTML
    const cityInput = document.getElementById('cityName');
    const addCityBtn = document.getElementById('addCityBtn');
    const weatherInfo = document.getElementById('weatherInfo');

    // Tablica na przechowywanie dodanych miast
    let cities = [];

    // Nasłuchujemy zdarzenia DOMContentLoaded, aby sprawdzić, czy w local storage są już zapisane miasta
    window.addEventListener('DOMContentLoaded', () => {
        if (localStorage.getItem('cities')) {
            cities = JSON.parse(localStorage.getItem('cities'));
            renderCities();
        }
    });

    // Nasłuchujemy zdarzenia kliknięcia na przycisk "Add City"
    addCityBtn.addEventListener('click', () => {
        // Pobieramy nazwę miasta z pola input
        const city = cityInput.value.trim();
        if (city !== '') {
            // Dodajemy miasto do listy
            addCity(city);
            // Czyścimy pole input
            cityInput.value = '';
        }
    });

    // Funkcja dodająca miasto do listy
    function addCity(city) {
        // Sprawdzamy czy nie przekroczono limitu miast
        if (cities.length >= 10) {
            alert('You can add up to ten cities.');
            return;
        }
        // Sprawdzamy czy miasto już nie zostało dodane
        if (!cities.includes(city)) {
            // Dodajemy miasto do tablicy
            cities.push(city);
            // Zapisujemy tablicę miast w local storage
            localStorage.setItem('cities', JSON.stringify(cities));
            // Pobieramy dane o pogodzie dla dodanego miasta
            fetchWeather(city);
        } else {
            // Jeśli miasto już istnieje w liście, wyświetlamy alert
            alert('City already added.');
        }
    }

    // Funkcja usuwająca miasto z listy
    function removeCity(city) {
        // Filtrujemy tablicę, usuwając miasto
        cities = cities.filter(item => item !== city);
        // Aktualizujemy tablicę miast w local storage
        localStorage.setItem('cities', JSON.stringify(cities));
    }

    // Funkcja renderująca dodane miasta na stronie
    function renderCities() {
        // Czyścimy element weatherInfo
        weatherInfo.innerHTML = '';
        // Iterujemy po wszystkich miastach i pobieramy dane o pogodzie
        cities.forEach(city => {
            fetchWeather(city);
        });
    }

    // Funkcja pobierająca dane o pogodzie z API OpenWeatherMap
    function fetchWeather(city) {
        // Wykonujemy zapytanie do API, aby pobrać dane o pogodzie dla danego miasta
        fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}`)
            .then(response => {
                // Sprawdzamy czy odpowiedź jest poprawna
                if (!response.ok) {
                    throw new Error('City not found');
                }
                // Zwracamy dane w formacie JSON
                return response.json();
            })
            .then(data => {
                // Tworzymy nowy element HTML dla miasta i jego informacji o pogodzie
                const weatherDiv = document.createElement('div');
                weatherDiv.classList.add('city');
                weatherDiv.innerHTML = `
                <h2>${data.name}</h2>
                <p>Temperature: ${(data.main.temp - 273.15).toFixed(1)} °C</p>
                <p>Humidity: ${data.main.humidity}%</p>
                <img src="http://openweathermap.org/img/wn/${data.weather[0].icon}.png" alt="${data.weather[0].description}">
                <button class="removeBtn">Remove</button>
            `;
                // Dodajemy element do sekcji z informacjami o pogodzie
                weatherInfo.appendChild(weatherDiv);

                // Dodajemy nasłuchiwanie na przycisk "Remove" dla usuwania miasta
                const removeBtn = weatherDiv.querySelector('.removeBtn');
                removeBtn.addEventListener('click', () => {
                    removeCity(city);
                    weatherDiv.remove();
                });
            })
            .catch(error => {
                // Obsługa błędów - wyświetlamy alert z komunikatem o błędzie
                alert(error.message);
            });
    }

});