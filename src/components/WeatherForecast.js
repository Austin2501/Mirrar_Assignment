import React, { useState } from 'react';
import axios from 'axios';
import CurrentWeather from './CurrentWeather';
import Forecast from './Forecast';
import UnitToggle from './UnitToggle';
import '../Styles/WeatherForecast.css'; // Import CSS file

const API_KEY = '58346ee8026ae4958fd92d5aab574de7';

function WeatherForecast() {
  const [city, setCity] = useState('');
  const [weatherData, setWeatherData] = useState(null);
  const [unit, setUnit] = useState('metric'); // Default to Celsius
  const [error, setError] = useState('');
  const [isSearchClicked, setIsSearchClicked] = useState(false); // Track if search button is clicked

  const handleSearch = () => {
    if (city.trim() === '') {
      setError('Please enter a city name');
      return;
    }
    setError('');
    setIsSearchClicked(true); // Set search button clicked
    fetchWeatherData();
  };

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
      <div className="unit-toggle">
        <UnitToggle unit={unit} setUnit={setUnit} />
      </div>
      <div className="search-bar">
        <input
          type="text"
          placeholder="Enter city name"
          value={city}
          onChange={(e) => setCity(e.target.value)}
        />
        <button onClick={handleSearch}>Search</button>
      </div>
      {error && <p className="error">{error}</p>}
      {weatherData && (
        <div>
          <CurrentWeather weatherData={weatherData} unit={unit} />
          <Forecast city={city} unit={unit} isSearchClicked={isSearchClicked} /> {/* Pass isSearchClicked prop */}
        </div>
      )}
    </div>
  );
}

export default WeatherForecast;