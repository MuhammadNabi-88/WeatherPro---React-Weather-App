import React, { useState, useEffect, useCallback } from "react";
import "./App.css";
import SearchBar from "./components/SearchBar";
import CurrentWeather from "./components/CurrentWeather";
import HourlyForecast from "./components/HourlyForecast";
import DailyForecast from "./components/DailyForecast";
import Footer from "./components/Footer";

const WEATHER_CODES = {
  0: { label: "Clear Sky", icon: "☀️" },
  1: { label: "Mainly Clear", icon: "🌤️" },
  2: { label: "Partly Cloudy", icon: "⛅" },
  3: { label: "Overcast", icon: "☁️" },
  45: { label: "Foggy", icon: "🌫️" },
  48: { label: "Foggy", icon: "🌫️" },
  51: { label: "Light Drizzle", icon: "🌦️" },
  61: { label: "Light Rain", icon: "🌧️" },
  63: { label: "Rain", icon: "🌧️" },
  65: { label: "Heavy Rain", icon: "⛈️" },
  71: { label: "Light Snow", icon: "🌨️" },
  73: { label: "Snow", icon: "❄️" },
  80: { label: "Rain Showers", icon: "🌦️" },
  95: { label: "Thunderstorm", icon: "⛈️" },
};

function App() {
  const [city, setCity] = useState("Stuttgart");
  const [unit, setUnit] = useState("celsius"); // celsius | fahrenheit
  const [weather, setWeather] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const fetchWeather = useCallback(
    async (cityName) => {
      try {
        setLoading(true);
        setError("");
        // 1. Geocoding
        const geoRes = await fetch(
          `https://geocoding-api.open-meteo.com/v1/search?name=${encodeURIComponent(cityName)}&count=1&language=en&format=json`,
        );
        const geoData = await geoRes.json();
        if (!geoData.results?.length) throw new Error("City not found");

        const { latitude, longitude, name, country } = geoData.results[0];

        // 2. Weather
        const wRes = await fetch(
          `https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&current=temperature_2m,relative_humidity_2m,apparent_temperature,precipitation,weather_code,cloud_cover,wind_speed_10m,wind_direction_10m&hourly=temperature_2m,precipitation_probability,weather_code&daily=weather_code,temperature_2m_max,temperature_2m_min,precipitation_probability_max&temperature_unit=${unit}&timezone=auto&forecast_days=7`,
        );
        const wData = await wRes.json();
        setWeather({ ...wData, cityName: name, country });
        setCity(name);
      } catch (err) {
        setError(err.message || "Failed to load weather");
      } finally {
        setLoading(false);
      }
    },
    [unit],
  );

  useEffect(() => {
    fetchWeather(city);
  }, [fetchWeather]);

  const handleSearch = (newCity) => fetchWeather(newCity);

  const getInfo = (code) =>
    WEATHER_CODES[code] || { label: "Unknown", icon: "🌤️" };

  return (
    <div className="app">
      <header className="header">
        <div className="logo">
          🌦️ <span>Weather</span>Pro
        </div>
        <SearchBar onSearch={handleSearch} />
        <div className="unit-toggle">
          <button
            className={unit === "celsius" ? "active" : ""}
            onClick={() => setUnit("celsius")}
          >
            °C
          </button>
          <button
            className={unit === "fahrenheit" ? "active" : ""}
            onClick={() => setUnit("fahrenheit")}
          >
            °F
          </button>
        </div>
      </header>

      {loading && <div className="center">Loading weather for {city}...</div>}
      {error && <div className="center error">{error}</div>}

      {weather && !loading && (
        <main className="dashboard">
          <CurrentWeather data={weather} getInfo={getInfo} unit={unit} />
          <HourlyForecast data={weather} getInfo={getInfo} unit={unit} />
          <DailyForecast data={weather} getInfo={getInfo} unit={unit} />
        </main>
      )}

      <Footer />
    </div>
  );
}

export default App;
