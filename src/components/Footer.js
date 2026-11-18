import React from 'react';

export default function Footer() {
  return (
    <footer className="footer">
      <div className="footer-container">
        
        {/* LEFT - Brand */}
        <div className="footer-brand">
          <div className="footer-logo">🌦️ Weather<span>Pro</span></div>
          <p>A modern, responsive weather dashboard built with React. Real-time data, 7-day forecast and clean UI - designed for everyday use.</p>
          <div className="footer-badges">
            <span>React</span>
            <span>JavaScript</span>
            <span>Open-Meteo API</span>
            <span>CSS3</span>
          </div>
        </div>

        {/* MIDDLE - Quick Links */}
        <div className="footer-links">
          <h4>Explore</h4>
          <a href="#current">Current Weather</a>
          <a href="#hourly">Hourly Forecast</a>
          <a href="#daily">7-Day Forecast</a>
          <a href="#search">Search City</a>
        </div>

        {/* RIGHT - Contact for HR */}
        <div className="footer-contact">
          <h4>Let's Connect</h4>
          <p>Open to Full Stack Developer roles • React, Node.js & Modern Web Apps</p>
          <div className="social-row">
            <a href="https://github.com/MuhammadNabi-88" target="_blank" rel="noreferrer">GitHub ↗</a>
            <a href="#" target="_blank" rel="noreferrer">LinkedIn ↗</a>
            <a href="#">Email ↗</a>
          </div>
          <a href="https://web-app-entwickler.vercel.app/" className="portfolio-btn" target="_blank" rel="noreferrer">
            View My Portfolio →
          </a>
        </div>
      </div>

      {/* BOTTOM BAR */}
      <div className="footer-bottom">
        <p>© {new Date().getFullYear()} WeatherPro • Built by <strong>Muhammad Nabi</strong> • Metzingen, Germany</p>
        <p>Data: <a href="https://open-meteo.com" target="_blank" rel="noreferrer">Open-Meteo</a> • Designed & Developed with React</p>
      </div>
    </footer>
  );
}