import React from 'react';
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';

const baseURL = process.env.ENDPOINT;

// weather card display
const WeatherCard = ({ forecastWeather }) => {
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
};

WeatherCard.propTypes = {
  forecastWeather: PropTypes.element.isRequired,
};

class Weather extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      icon: '',
      latitude: '',
      longitude: '',
      forecastWeatherData: [],
    };
  }

  async componentDidMount() {
    global.navigator.geolocation.getCurrentPosition((position) => {
      this.setState({ latitude: position.coords.latitude });
      this.setState({ longitude: position.coords.longitude });
      this.getWeather().then((weather) => {
        this.setState({ icon: weather.icon.slice(0, -1) });
      });
      this.getForecast().then((response) => {
        this.setState({ forecastWeatherData: response });
      });
    });
  }

  async getWeather() {
    const { latitude, longitude } = this.state;
    try {
      const response = await fetch(`${baseURL}/weather?latitude=${latitude}&longitude=${longitude}`);
      return response.json();
    } catch (error) {
      console.error(error);
      return {};
    }
  }

  async getForecast() {
    const { latitude, longitude } = this.state;
    try {
      const response = await fetch(`${baseURL}/forecast?latitude=${latitude}&longitude=${longitude}`);
      return response.json();
    } catch (error) {
      console.error(error);
      return {};
    }
  }

  render() {
    const { icon, forecastWeatherData } = this.state;
    const weatherDisplay = forecastWeatherData
      .map((weather) => <WeatherCard key={weather.dt} forecastWeather={weather} />);

    return (
      <div className="container">
        <div className="top">
          <div className="icon">
            {icon && <img src={`/img/${icon}.svg`} alt="weatherIcon" />}
          </div>
        </div>
        <div className="weatherCard">
          {weatherDisplay}
        </div>
      </div>
    );
  }
}

ReactDOM.render(
  <Weather />,
  document.getElementById('app'),
);
