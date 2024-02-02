import React, { useState } from 'react';
import axios from 'axios';
import CurrentWeather from './CurrentWeather';
import Forecast from './Forecast';
import UnitToggle from './UnitToggle';
import '../Styles/WeatherForecast.css'; // Import CSS file

const API_KEY = '58346ee8026ae4958fd92d5aab574de7';

function WeatherForecast() {
  // State variables
  const [city, setCity] = useState('');
  const [weatherData, setWeatherData] = useState(null);
  const [unit, setUnit] = useState('metric'); // Default to Celsius
  const [error, setError] = useState('');
  const [isSearchClicked, setIsSearchClicked] = useState(false); // Track if search button is clicked
  const [selectedTab, setSelectedTab] = useState('current'); // Track selected tab

  // Function to handle search button click
  const handleSearch = () => {
    // Validate city input
    if (city.trim() === '') {
      setError('Please enter a city name');
      return;
    }
    setError('');
    setIsSearchClicked(true); // Set search button clicked
    fetchWeatherData();
  };

  // Function to fetch weather data from API
  const fetchWeatherData = () => {
    axios.get(`https://api.openweathermap.org/data/2.5/weather?q=${city}&units=${unit}&appid=${API_KEY}`)
      .then(response => {
        setWeatherData(response.data);
      })
      .catch(error => {
        if (error.response && error.response.status === 404) {
          setError('City not found. Please enter a valid city name.');
        } else {
          setError('An error occurred while fetching weather data. Please try again later.');
        }
        setWeatherData(null);
      });
  };

  return (
    <div className="weather-forecast-container">
      {/* Unit toggle component */}
      <div className="unit-toggle">
        <UnitToggle unit={unit} setUnit={setUnit} />
      </div>
      {/* Search bar */}
      <div className="search-bar">
        <input
          type="text"
          placeholder="Enter city name"
          value={city}
          onChange={(e) => setCity(e.target.value)}
          id="cityInput"
          name="cityInput"
        />
        <button onClick={handleSearch}>Search</button>
      </div>
      {/* Error message */}
      {error && <p className="error">{error}</p>}
      {/* Tabs for current weather and forecast */}
      <div className="tabs">
        <button
          className={selectedTab === 'current' ? 'active-tab' : ''}
          onClick={() => setSelectedTab('current')}
        >
          Current Weather
        </button>
        <button
          className={selectedTab === 'forecast' ? 'active-tab' : ''}
          onClick={() => setSelectedTab('forecast')}
        >
          5-Day Forecast
        </button>
      </div>
      {/* Render weather components based on selected tab */}
      {weatherData && (
        <div>
          {selectedTab === 'current' && (
            <CurrentWeather weatherData={weatherData} unit={unit} />
          )}
          {selectedTab === 'forecast' && (
            <Forecast city={city} unit={unit} isSearchClicked={isSearchClicked} setIsSearchClicked={setIsSearchClicked} />
          )}
        </div>
      )}
    </div>
  );
}

export default WeatherForecast;
