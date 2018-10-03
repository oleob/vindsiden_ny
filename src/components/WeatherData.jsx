import React from 'react';

const WeatherData = ({ meteogramUrl, marinogramUrl }) => {
  return (
    <div>
      {meteogramUrl.length > 0 && (
        <img
          className="weatherImage"
          src={meteogramUrl + 'avansert_meteogram.png'}
          alt="weatherdata"
        />
      )}
      {marinogramUrl.length > 0 && (
        <img
          className="weatherImage"
          src={marinogramUrl + 'marinogram.png'}
          alt="marindata"
        />
      )}
      {(meteogramUrl.length > 0 || marinogramUrl.length > 0) && (
        <p>
          Værdata fra <a href="https://yr.no">yr.no</a>
        </p>
      )}
    </div>
  );
};

export default WeatherData;
