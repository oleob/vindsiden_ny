import React from 'react';

const InfoBox = ({ name, city, region, copyright, text }) => {
  const copyrightString = copyright.length > 0 ? 'Eies av ' + copyright : '';
  const regionString = region.length > 0 ? ', ' + region : '';
  return (
    <div className="infoBox">
      <h1>{name}</h1>
      <h2>
        {city}
        {regionString}
      </h2>
      <h3>{copyrightString}</h3>
      <p>{text}</p>
    </div>
  );
};

export default InfoBox;
