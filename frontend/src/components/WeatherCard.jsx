import React from 'react';

import './index.css';

function WeatherCard({ forecastWeather }) {
  const timeTxt = (forecastWeather.dt_txt).split(' ');
  const txt = timeTxt[1];
  const temp = ((forecastWeather.main.temp) - 273.15).toFixed();

  return (
    <div className="container-c">
      <div className="card">
        <h3>
          {txt}
        </h3>
        {forecastWeather.weather.map((weather) => (
          <>
            <div className="imgIcon" key={weather.id}>
              <img src={`/img/${weather.icon.slice(0, -1)}.svg`} alt="weatherIcon" width={30} height={30} />
            </div>
            <div className="contentCard">
              <h4>
                <p>
                  {`${temp} ℃`}
                </p>
                {weather.main}
              </h4>
            </div>
          </>
        ))}
      </div>
    </div>
  );
}

export default WeatherCard;
