import React from 'react';

function WeatherCard({ forecastWeather }) {
  const weatherDetail = forecastWeather.weather.map((weather) => (
    <div key={weather.id}>
      <img src={`/img/${weather.icon.slice(0, -1)}.svg`} alt="weatherIcon" />
      <p>
        {weather.main}
      </p>
    </div>
  ));

  return (
    <div>
      {weatherDetail}
      <div className="cardContainer">
        <p>
          {forecastWeather.dt_txt}
        </p>
      </div>
    </div>
  );
}

export default WeatherCard;
