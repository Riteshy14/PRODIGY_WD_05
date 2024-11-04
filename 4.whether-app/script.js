const apiKey = "7d5e74e7b112e34001dc87b79a2fc7c3";
const apiUrl = "https://api.openweathermap.org/data/2.5/weather?units=metric&q=";
const searchBox = document.querySelector(".search input");
const searchBtn = document.querySelector(".search button");
const weatherIcon = document.querySelector(".weather-icon");

async function checkWeather(city) {
    const response = await fetch(apiUrl + city + `&appid=${apiKey}`);

    if (response.status == 404) {
        document.querySelector(".error").style.display = "block";
        document.querySelector(".weather").style.display = "none";
    } else {
        const data = await response.json();
        
        document.querySelector(".city").innerHTML = data.name;
        document.querySelector(".temp").innerHTML = Math.round(data.main.temp) + "°C";
        document.querySelector(".humidity").innerHTML = data.main.humidity + "%";
        document.querySelector(".wind").innerHTML = data.wind.speed + " km/h";

        const weatherCondition = data.weather[0].main;
        if (weatherCondition == "Clouds") {
            weatherIcon.src = "img/clouds.png";
        } else if (weatherCondition == "Clear") {
            weatherIcon.src = "img/clear.png";
        } else if (weatherCondition == "Rain") {
            weatherIcon.src = "img/rain.png";
        } else if (weatherCondition == "Drizzle") {
            weatherIcon.src = "img/drizzle.png";
        } else if (weatherCondition == "Mist") {
            weatherIcon.src = "img/mist.png";
        }

        document.querySelector(".weather").style.display = "block";
        document.querySelector(".error").style.display = "none";
    }
}

searchBtn.addEventListener("click", () => {
    checkWeather(searchBox.value);
});

searchBox.addEventListener("keypress", (event) => {
    if (event.key === "Enter") {
        checkWeather(searchBox.value);
    }
});

// Navigation Functions
const homeSection = document.getElementById('home');
const aboutSection = document.getElementById('about');
const contactSection = document.getElementById('contact');

document.querySelector(".nav-home").addEventListener("click", () => {
    homeSection.style.display = "block";
    aboutSection.style.display = "none";
    contactSection.style.display = "none";
});

document.querySelector(".nav-about").addEventListener("click", () => {
    homeSection.style.display = "none";
    aboutSection.style.display = "block";
    contactSection.style.display = "none";
});

document.querySelector(".nav-contact").addEventListener("click", () => {
    homeSection.style.display = "none";
    aboutSection.style.display = "none";
    contactSection.style.display = "block";
});

document.querySelectorAll('.back-btn').forEach(button => {
    button.addEventListener('click', () => {
        homeSection.style.display = "block";
        aboutSection.style.display = "none";
        contactSection.style.display = "none";
    });
});


checkWeather("Mumbai");
