import React from 'react';
import { useLocation } from 'react-router-dom';

function Map() {
  const location = useLocation();
  const { latitude, longitude } = location.state;

  const openInGoogleMaps = () => {
    const mapsUrl = `https://www.google.com/maps?q=${23.7644025},${23.7644025}`;
    window.open(mapsUrl, '_blank');
  };

  return (
    <>
    <div>
      <button onClick={openInGoogleMaps}>Open Location in Google Maps</button>
      <p>Latitude: {latitude}</p>
      <p>Longitude: {longitude}</p>
    </div>
   
    </>
  );
}

export default Map;
