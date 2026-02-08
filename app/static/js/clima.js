const OPENWEATHER_API_KEY = "a205e3a0b728763157068ed555778885";
const LAT = 9.51391918397255;     
const LON = -84.35773842890467;

const CLIMA_URL = `https://api.openweathermap.org/data/2.5/weather?lat=${LAT}&lon=${LON}&appid=${OPENWEATHER_API_KEY}&units=metric&lang=es`;

class WeatherService {
    constructor() {
        this.cacheDuration = 10 * 60 * 1000; // 10 minutos
        this.cacheKey = 'lionsV8_weather_cache';
    }

    getCachedWeather() {
        const data = localStorage.getItem(this.cacheKey);
        return data ? JSON.parse(data) : null;
    }

    isCacheExpired(cached) {
        return Date.now() - cached.time > this.cacheDuration;
    }

    saveToCache(data) {
        localStorage.setItem(this.cacheKey, JSON.stringify({
            data,
            time: Date.now()
        }));
    }

    async getCurrentWeather() {
        try {
            const cached = this.getCachedWeather();
            if (cached && !this.isCacheExpired(cached)) {
                return cached.data;
            }

            const response = await fetch(CLIMA_URL);
            if (!response.ok) throw new Error("Error en OpenWeather");

            const data = await response.json();

            // Normalizamos la respuesta
            const clima = {
                temperatura: Math.round(data.main.temp),
                minima: Math.round(data.main.temp_min),
                maxima: Math.round(data.main.temp_max),
                descripcion: data.weather[0].description,
                icono: data.weather[0].icon
            };

            this.saveToCache(clima);
            return clima;

        } catch (error) {
            console.error("Error obteniendo clima:", error);
            return null;
        }
    }
}
document.addEventListener("DOMContentLoaded", async () => {
    const weatherService = new WeatherService();
    const clima = await weatherService.getCurrentWeather();

    if (!clima) {
        document.getElementById("currentTemp").textContent =
            "Clima no disponible";
        return;
    }

    const { temperatura, minima, maxima, descripcion, icono } = clima;

    document.getElementById("currentTemp").textContent =
        `°C - Actual ${temperatura} °C - Máxima ${maxima}`;

    const iconEl = document.getElementById("weatherIcon");

    if (iconEl) {
        iconEl.className = "fas";

        if (icono.includes("d")) iconEl.classList.add("fa-sun");
        else if (icono.includes("n")) iconEl.classList.add("fa-moon");
        else iconEl.classList.add("fa-cloud");
    }

    const weatherValue = document.getElementById("weatherValue");
    if (weatherValue) {
        weatherValue.textContent =
            `Actual ${temperatura}°C | Máx ${maxima}°C | ${descripcion}`;
    }
});

