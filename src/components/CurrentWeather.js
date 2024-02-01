// CurrentWeather.js
import React from 'react';
import '../Styles/CurrentWeather.css'; // Import CSS file
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSun, faCloud, faCloudRain, faSnowflake, faWind } from '@fortawesome/free-solid-svg-icons';

function CurrentWeather({ weatherData, unit }) {
  const { main, wind, weather } = weatherData;

  const convertTemperature = (temp) => {
    return unit === 'metric' ? temp.toFixed(2) : ((temp * 9 / 5) + 32).toFixed(2);
  };

  const getWeatherIcon = (weatherId) => {
    // Map weather condition to FontAwesome icons
    switch (true) {
      case weatherId >= 200 && weatherId < 300: // Thunderstorm
        return <FontAwesomeIcon icon={faCloudRain} />;
      case weatherId >= 300 && weatherId < 600: // Drizzle or Rain
        return <FontAwesomeIcon icon={faCloudRain} />;
      case weatherId >= 600 && weatherId < 700: // Snow
        return <FontAwesomeIcon icon={faSnowflake} />;
      case weatherId >= 700 && weatherId < 800: // Atmosphere
        return <FontAwesomeIcon icon={faSun} />;
      case weatherId === 800: // Clear
        return <FontAwesomeIcon icon={faSun} />;
      case weatherId > 800 && weatherId < 900: // Clouds
        return <FontAwesomeIcon icon={faCloud} />;
      default:
        return null;
    }
  };

  const getWindDirection = (degrees) => {
    // Convert wind direction in degrees to a human-readable direction
    const directions = ['N', 'NE', 'E', 'SE', 'S', 'SW', 'W', 'NW'];
    const index = Math.round((degrees % 360) / 45);
    return directions[index % 8];
  };

  return (
    <div>
      <h2>Current Weather</h2>
      <div className="current-weather">
        <p>Temperature: {convertTemperature(main.temp)}°{unit === 'metric' ? 'C' : 'F'}</p>
        <p>Min Temperature: {convertTemperature(main.temp_min)}°{unit === 'metric' ? 'C' : 'F'}</p>
        <p>Max Temperature: {convertTemperature(main.temp_max)}°{unit === 'metric' ? 'C' : 'F'}</p>
        <p>Humidity: {main.humidity}%</p>
        <p className="wind-info">Wind: {getWindDirection(wind.deg)} {wind.speed} m/s <FontAwesomeIcon icon={faWind} /></p>
        <p>Weather: {weather[0].description} {getWeatherIcon(weather[0].id)}</p>
      </div>
    </div>
  );
}

export default CurrentWeather;
