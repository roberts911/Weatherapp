import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Route, Router} from 'react-router-dom';

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
      icon: "",
    };
  }

  async componentDidMount() {
    const weather = await getWeatherFromApi();
    this.setState({icon: weather.icon.slice(0, -1)});
  }

  render() {
    const { icon } = this.state;

    return (
      <div className="icon">
        { icon && <img src={`/img/${icon}.svg`} /> }
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
    );
  }
}


ReactDOM.render(
  <Router>
    <Routes>
      <Route path="/weather" element={<Weather />} />
      <Route path="/forecast" element={<Forecast />} />
    </Routes>
  </Router>,
  document.getElementById('app')
);
