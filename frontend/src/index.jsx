import React from 'react';
import ReactDOM from 'react-dom';
import {
  BrowserRouter as Router, Route, Routes, Link,
} from 'react-router-dom';

const baseURL = process.env.ENDPOINT;

const getLocation = () => {
  return new Promise((resolve, reject) => {
    if (!navigator.geolocation) {
      reject(new Error('Geolocation is not supported by your browser'));
    } else {
      navigator.geolocation.getCurrentPosition((position) => {
        resolve({
          lat: position.coords.latitude,
          lon: position.coords.longitude
        });
      }, () => {
        reject(new Error('Unable to retrieve your location'));
      });
    }
  });
};

const getWeatherFromApi = async () => {
  try {
    const location = await getLocation();
    const response = await fetch(`${baseURL}/weather?lat=${location.lat}&lon=${location.lon}`);
    return response.json();
  } catch (error) {
    console.error(error);
  }

  return {};
};

const getForecastFromApi = async () => {
  try {
    const location = await getLocation();
    const response = await fetch(`${baseURL}/forecast?lat=${location.lat}&lon=${location.lon}`);
    return response.json();
  } catch (error) {
    console.error(error);
  }

  return [];
};

class Weather extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      icon: '',
      description: '',
      temp: 0,
      humidity: 0,
      pressure: 0,
      windSpeed: 0,
      feelsLike: 0,
      name: '',
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
      feelsLike: weather.feels_like,
      name: weather.name
    });
  }

  render() {
    const {
      icon, description, temp, humidity, pressure, windSpeed, feelsLike,  name,
    } = this.state;

    return (
      <div>
        <Link className="nav-link" to="/forecast">See Forecast</Link>
        <h1>Current weather for {name}</h1>
        <div className="weather">
          <div className="weather-item">
            <div className="temperature">
              {Math.round(temp)}
              {' '}
              °C
            </div>
            { icon && <img src={`/img/${icon}.svg`} alt="icon" />}
            <div>
              Feels Like:
              {Math.round(feelsLike)}
              {' '}
              °C
            </div>
            <div>
              Pressure:
              {pressure}
              {' '}
              hPa
            </div>
            <div>
              Wind Speed:
              {windSpeed}
            </div>
            <div>
              Humidity:
              {humidity}
              %
            </div>
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
    const forecast = await getForecastFromApi();
    this.setState({ forecast });
  }

  render() {
    const { forecast } = this.state;

    return (
      <div>
        <Link className="nav-link" to="/weather">See Current Weather</Link>
        <h1>Forecast</h1>
        <div className="forecast">
          {forecast.map((forecastItem) => (
            <div key={forecastItem.dt} className="forecast-item">
              <div>
                <div>{new Date(forecastItem.dt * 1000).toLocaleString()}</div>
                <div className="temperature">
                  {Math.round(forecastItem.main.temp)}
                  {' '}
                  °C
                </div>
                <img src={`/img/${forecastItem.weather[0].icon.slice(0, -1)}.svg`} alt="icon" />
                <div>
                  Feels Like:
                  {Math.round(forecastItem.main.feels_like)}
                  {' '}
                  °C
                </div>
                <div>
                  Pressure:
                  {forecastItem.main.pressure}
                  {' '}
                  hPa
                </div>
                <div>
                  Wind:
                  {Math.round(forecastItem.wind.speed * 3.6)}
                  {' '}
                  km/h
                </div>
                <div>
                  Humidity:
                  {forecastItem.main.humidity}
                  %
                </div>
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
  document.getElementById('app'),
);
