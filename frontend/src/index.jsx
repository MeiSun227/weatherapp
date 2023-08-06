import React from 'react';
import ReactDOM from 'react-dom';

const baseURL = process.env.ENDPOINT;

// weather card display
const WeatherCard = ({ forecastWeather }) => {
  const weatherDetail = forecastWeather.weather.map((weather) => <div key={weather.id}><img src={`/img/${weather.icon.slice(0, -1)}.svg`}/><p>{weather.main}</p></div>)
  return (
    <div>
      {weatherDetail}
      <div className='cardContainer'>
        <p>{forecastWeather.dt_txt}</p>
        <p></p>
      </div>
    </div>
  )
}

class Weather extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      icon: "",
      latitude: "",
      longitude: "",
      forecast: []
    };
  }

  async getWeather() {
    try {
      const response = await fetch(`${baseURL}/weather?latitude=${this.state.latitude}&longitude=${this.state.longitude}`)
      return response.json();
    } catch (error) {
      console.error(error);
    }
  }

  async getForecast() {
    try {
      const response = await fetch(`${baseURL}/forecast?latitude=${this.state.latitude}&longitude=${this.state.longitude}`)
      return response.json();
    }
    catch (error) {
      console.error(error);
    }
  }


  async componentDidMount() {
    navigator.geolocation.getCurrentPosition((position) => {
      this.setState({ latitude: position.coords.latitude })
      this.setState({ longitude: position.coords.longitude })
      this.getWeather().then((weather) => {
        this.setState({ icon: weather.icon.slice(0, -1) });
      });
      this.getForecast().then(response => {
        this.setState({ forecast: response })
      })
    })
  }

  render() {
    const { icon } = this.state;
    const forecastWeatherData = this.state.forecast
    const weatherDisplay = forecastWeatherData.map((weather) => <WeatherCard key={weather.dt} forecastWeather={weather} />)

    return (
      <div className='container'>
        <div className='top'>
          <div className="icon">
            {icon && <img src={`/img/${icon}.svg`} />}
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
  document.getElementById('app')
);
