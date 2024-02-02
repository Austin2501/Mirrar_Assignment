import React from 'react';
import './App.css'; // Import CSS file for global styles
import WeatherForecast from './components/WeatherForecast'; // Import WeatherForecast component

function App() {
  return (
    <div>
      <h1>Weather Forecast Dashboard</h1> {/* Main title */}
      <WeatherForecast /> {/* Render WeatherForecast component */}
    </div>
  );
}

export default App;
