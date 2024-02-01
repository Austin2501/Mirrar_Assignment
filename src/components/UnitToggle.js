// UnitToggle.js

import React from 'react';
import '../Styles/UnitToggle.css'; // Import CSS file

function UnitToggle({ unit, setUnit }) {
  const toggleUnit = () => {
    setUnit(unit === 'metric' ? 'imperial' : 'metric');
  };

  return (
    <div className="unit-toggle-container">
      <button className="unit-toggle-button" onClick={toggleUnit}>
        {unit === 'metric' ? 'Switch to Fahrenheit' : 'Switch to Celsius'}
      </button>
    </div>
  );
}

export default UnitToggle;
