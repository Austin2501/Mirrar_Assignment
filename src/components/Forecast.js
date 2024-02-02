import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSun, faCloud, faCloudRain, faSnowflake } from '@fortawesome/free-solid-svg-icons';
import '../Styles/Forecast.css'; // Import CSS file

const API_KEY = '58346ee8026ae4958fd92d5aab574de7';

function Forecast({ city, unit, isSearchClicked, setIsSearchClicked }) {
  // State variables
  const [forecastData, setForecastData] = useState(null);
  const [isForecastVisible, setIsForecastVisible] = useState(false); // State to track visibility of forecast

  // Fetch forecast data from API when city or unit changes
  useEffect(() => {
    setIsForecastVisible(false); // Reset forecast visibility when city or unit changes
  
    if (isSearchClicked && city) {
      axios.get(`https://api.openweathermap.org/data/2.5/forecast?q=${city}&units=${unit}&appid=${API_KEY}`)
        .then(response => {
          setForecastData(response.data);
          setIsSearchClicked(false); // Reset search clicked state
        })
        .catch(error => {
          console.error('Error fetching forecast data:', error);
        });
    }
  }, [city, unit, isSearchClicked, setIsSearchClicked]);

  // Function to toggle forecast visibility
  const toggleForecastVisibility = () => {
    setIsForecastVisible(!isForecastVisible); // Toggle visibility state
  };

  // Function to map weather condition to FontAwesome icons
  const getWeatherIcon = (weatherId) => {
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

  // Function to group forecast data by day
  const groupForecastByDay = () => {
    if (!forecastData) return [];

    const groupedForecast = {};

    forecastData.list.forEach(forecastItem => {
      const date = forecastItem.dt_txt.split(' ')[0];
      if (!groupedForecast[date]) {
        groupedForecast[date] = [];
      }
      groupedForecast[date].push(forecastItem);
    });

    return Object.entries(groupedForecast);
  };

  // Function to convert temperature based on unit
  const convertTemperature = (temp) => {
    return unit === 'metric' ? temp.toFixed(2) : ((temp * 9 / 5) + 32).toFixed(2);
  };

  return (
    <div>
      {/* Header to toggle forecast visibility */}
      <h2 onClick={toggleForecastVisibility} style={{ cursor: 'pointer' }}>5-Day Forecast</h2>
      {/* Render forecast only if visible */}
      {isForecastVisible && (
        <div className="forecast-container">
          {/* Map and render forecast data by day */}
          {groupForecastByDay().map(([date, forecasts]) => (
            <div key={date} className="forecast-day">
              <h3>{new Date(date).toDateString()}</h3>
              {/* Map and render forecast items for each day */}
              {forecasts.map((forecastItem, index) => (
                <div key={index} className="forecast-item">
                  <p>Time: {forecastItem.dt_txt.split(' ')[1]}</p>
                  <p>Temperature: {convertTemperature(forecastItem.main.temp)}°{unit === 'metric' ? 'C' : 'F'}</p>
                  <p>Weather: {forecastItem.weather[0].description}</p>
                  <div className="weather-icon">{getWeatherIcon(forecastItem.weather[0].id)}</div>
                </div>
              ))}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default Forecast;
