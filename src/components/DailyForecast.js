import React from 'react';

export default function DailyForecast({ data, getInfo, unit }) {
  const symbol = unit === 'celsius' ? '°C' : '°F';
  return (
    <section className="card">
      <h3 className="section-title">7-Day Forecast</h3>
      <div className="scroll-row">
        {data.daily.time.map((t, i) => (
          <div key={t} className="day-item">
            <span>{i === 0 ? 'Today' : new Date(t).toLocaleDateString('en', { weekday: 'short' })}</span>
            <span className="day-icon">{getInfo(data.daily.weather_code[i]).icon}</span>
            <strong>{Math.round(data.daily.temperature_2m_max[i])}{symbol} / {Math.round(data.daily.temperature_2m_min[i])}{symbol}</strong>
            <small>{getInfo(data.daily.weather_code[i]).label}</small>
            <small>💧 {data.daily.precipitation_probability_max?.[i] ?? 0}%</small>
          </div>
        ))}
      </div>
    </section>
  );
}