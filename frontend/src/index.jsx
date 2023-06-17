import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Route, Routes, Link} from 'react-router-dom';

const baseURL = process.env.ENDPOINT;

const getWeatherFromApi = async () => {
  try {
    const response = await fetch(`${baseURL}/weather`);
    return response.json();
  } catch (error) {
    console.error(error);
  }

  return {};
};

class Weather extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      dt: 0,
      icon: "",
      description: "",
      temp: 0,
      humidity: 0,
      pressure: 0,
      windSpeed: 0,
      feels_like: 0,
    };
  }

  async componentDidMount() {
    const weather = await getWeatherFromApi();
    this.setState({
      icon: weather.icon.slice(0, -1),
      description: weather.description,
      temp: weather.temp,
      humidity: weather.humidity,
      pressure: weather.pressure,
      windSpeed: weather.windSpeed,
      feels_like: weather.feels_like
    });
  }

  render() {
    const { icon, description, temp, humidity, pressure, windSpeed, feels_like } = this.state;

    return (
      <div>
        <Link className="nav-link" to="/forecast">See Forecast</Link>
        <h1>Current weather</h1>
        <div className="weather">
          <div className="weather-item">
            <div className='temperature'>{Math.round(temp)} °C</div>
            { icon && <img src={`/img/${icon}.svg`} />}
            <div>Feels Like: {Math.round(feels_like)} °C</div>
            <div>Pressure: {pressure} hPa</div>
            <div>Wind Speed: {windSpeed}</div>
            <div>Humidity: {humidity}%</div>
            <div>{description}</div>
          </div>
        </div>
      </div>
    );
  }
}

class Forecast extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      forecast: [],
    };
  }

  async componentDidMount() {
    const forecast = await fetch(`${baseURL}/forecast`).then(response => response.json());
    this.setState({forecast: forecast});
  }

  render() {
    const { forecast } = this.state;

    return (
      <div>
        <Link className="nav-link" to="/weather">See Current Weather</Link>
        <h1>Forecast</h1>
      <div className="forecast">
        {forecast.map((forecastItem, index) => (
          <div key={index} className="forecast-item">
            <div>
              <div>{new Date(forecastItem.dt * 1000).toLocaleString()}</div>
              <div className='temperature'>{Math.round(forecastItem.main.temp)} °C</div>
              <img src={`/img/${forecastItem.weather[0].icon.slice(0, -1)}.svg`} />
              <div>Feels Like: {Math.round(forecastItem.main.feels_like)} °C</div>
              <div>Pressure: {forecastItem.main.pressure} hPa</div>
              <div>Wind: {Math.round(forecastItem.wind.speed * 3.6)} km/h</div>
              <div>Humidity: {forecastItem.main.humidity}%</div>
              <div>{forecastItem.weather[0].description}</div>

            </div>
          </div>
        ))}
      </div>
      </div>
    );
  }
}


ReactDOM.render(
  <Router>
    <Routes>
      <Route path="/" element={<Weather />} />
      <Route path="/weather" element={<Weather />} />
      <Route path="/forecast" element={<Forecast />} />
    </Routes>
  </Router>,
  document.getElementById('app')
);
