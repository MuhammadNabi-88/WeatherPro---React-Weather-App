import React from 'react';

export default function HourlyForecast({ data, getInfo, unit }) {
  const nowHour = new Date().getHours();
  const items = data.hourly.time.slice(0, 24).map((t, i) => ({
    time: new Date(t),
    temp: data.hourly.temperature_2m[i],
    code: data.hourly.weather_code[i],
    precip: data.hourly.precipitation_probability?.[i] ?? 0,
  })).filter(item => item.time.getHours() >= nowHour).slice(0, 12);

  const symbol = unit === 'celsius' ? '°C' : '°F';

  return (
    <section className="card">
      <h3 className="section-title">Hourly Forecast</h3>
      <div className="scroll-row">
        {items.map((item, i) => (
          <div key={i} className="hour-item">
            <span>{i === 0 ? 'Now' : item.time.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</span>
            <span className="hour-icon">{getInfo(item.code).icon}</span>
            <strong>{Math.round(item.temp)}{symbol}</strong>
            <small>💧 {item.precip}%</small>
          </div>
        ))}
      </div>
    </section>
  );
}