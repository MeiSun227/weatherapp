import React, { useState, useEffect } from 'react';

import './App.css';
import weatherService from './services/weatherService';
import WeatherCard from './components/WeatherCard';

function App() {
  const [weatherData, setWeatherData] = useState({});
  const [forecastWeatherData, setforecastWeatherData] = useState([]);

  useEffect(() => {
    navigator.geolocation.getCurrentPosition((position) => {
      const lat = position.coords.latitude;
      const lon = position.coords.longitude;
      weatherService.getWeather(lat, lon).then((weatherResp) => {
        setWeatherData(weatherResp);
      });
      weatherService.getForecast(lat, lon).then((forecastWeatherResp) => {
        setforecastWeatherData(forecastWeatherResp);
      });
    });
  }, []);

  const weatherIcon = weatherData?.icon?.slice(0, -1);
  const weatherDisplay = forecastWeatherData
    .map((weather) => <WeatherCard key={weather.dt} forecastWeather={weather} />);

  return (
    <div className="container">
      <div className="top">
        <div className="icon">
          {weatherIcon && <img src={`/img/${weatherIcon}.svg`} alt="weatherIcon" />}
          <p>{weatherData.description}</p>
        </div>
      </div>
      <div className="weatherCard">
        {weatherDisplay}
      </div>
    </div>
  );
}

export default App;
