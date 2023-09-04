import React, { useState, useEffect } from 'react';

import './App.css';
import weatherService from './services/weatherService';
import WeatherCard from './components/WeatherCard';

function App() {
  const [weatherData, setWeatherData] = useState({});
  const [forecastWeatherData, setforecastWeatherData] = useState([]);
  const weekdays = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
  const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];

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

  console.log(forecastWeatherData);

  const weatherIcon = weatherData?.icon?.slice(0, -1);
  const currentWeather = weatherData?.main;
  const weatherDisplay = forecastWeatherData
    .map((weather) => (
      <WeatherCard key={weather.dt} forecastWeather={weather} />
    ));

  const today = new Date();
  const day = weekdays[today.getDay()];
  const time = `${today.getHours()}:${today.getMinutes()}`;
  const month = months[today.getMonth()];
  const date = `${today.getDate()} ${month} ${today.getFullYear()}`;
  const tempList = forecastWeatherData.map((w) => w.main.temp);
  const currentTem = (tempList[0] - 273.15).toFixed();
  console.log(currentTem);

  return (
    <div className="weather-app">
      <div className="container">
        <h2>Weather App</h2>
        <div className="now-weather">
          {weatherIcon && <img src={`/img/${weatherIcon}.svg`} alt="weatherIcon" width={200} height={200} />}
          {`${currentTem} ℃`}
          <h3 className="currentWeather">
            {currentWeather}
          </h3>
        </div>
        <div>
          <h1 className="name">Helsinki</h1>
          <div className="city-date">
            <h3>{day}</h3>
            <small>
              <span className="time">
                {time}
              </span>
              -
              <span className="day">
                {date}
              </span>
            </small>
          </div>
          <div className="weather">
            <div className="cardContainer">
              {weatherDisplay}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
