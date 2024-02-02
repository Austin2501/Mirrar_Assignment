import React from 'react';
import '../Styles/UnitToggle.css'; // Import CSS file

function UnitToggle({ unit, setUnit }) {
  // Function to toggle between metric and imperial units
  const toggleUnit = () => {
    setUnit(unit === 'metric' ? 'imperial' : 'metric');
  };

  return (
    <div className="unit-toggle-container">
      {/* Button to toggle unit */}
      <button className="unit-toggle-button" onClick={toggleUnit}>
        {/* Display text based on current unit */}
        {unit === 'metric' ? 'Switch to Fahrenheit' : 'Switch to Celsius'}
      </button>
    </div>
  );
}

export default UnitToggle;
