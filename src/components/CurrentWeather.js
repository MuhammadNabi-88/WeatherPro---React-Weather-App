import React from 'react';

export default function CurrentWeather({ data, getInfo, unit }) {
  const c = data.current;
  const info = getInfo(c.weather_code);
  const symbol = unit === 'celsius' ? '°C' : '°F';

  const stats = [
    { label: 'Feels Like', value: `${Math.round(c.apparent_temperature)}${symbol}`, icon: '🌡️' },
    { label: 'Humidity', value: `${c.relative_humidity_2m}%`, icon: '💧' },
    { label: 'Precipitation', value: `${c.precipitation} mm`, icon: '🌧️' },
    { label: 'Cloud Cover', value: `${c.cloud_cover}%`, icon: '☁️' },
    { label: 'Wind Speed', value: `${Math.round(c.wind_speed_10m)} km/h`, icon: '💨' },
    { label: 'Wind Direction', value: `${c.wind_direction_10m}°`, icon: '🧭' },
  ];

  return (
    <section className="grid-main">
      <div className="card hero-card">
        <p className="location">📍 {data.cityName}, {data.country}</p>
        <div className="hero-temp">
          <span className="hero-icon">{info.icon}</span>
          <div>
            <h1>{Math.round(c.temperature_2m)}{symbol}</h1>
            <p>Feels like {Math.round(c.apparent_temperature)}{symbol}</p>
            <h3>{info.label}</h3>
          </div>
        </div>
        <p className="updated">Updated: {new Date(c.time).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</p>
      </div>

      <div className="card stats-card">
        <h3>Today's Highlights</h3>
        <div className="stats-grid">
          {stats.map(s => (
            <div key={s.label} className="stat">
              <span>{s.icon}</span>
              <small>{s.label}</small>
              <strong>{s.value}</strong>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}