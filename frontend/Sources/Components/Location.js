import React, { useState } from 'react';
import './Location.css';
import axios from 'axios';  // Removed the backslash
import algoliasearch from 'algoliasearch/lite';


function Location() {
    const [location, setLocation] = useState('');
    const [coordinates, setCoordinates] = useState(null);
    const [suggestions, setSuggestions] = useState([]);
    const getEmail = localStorage.getItem('emailData');
    console.log('from Location', getEmail);


    const ALGOLIA_APP_ID = 'JF607WAX4U';
    const ALGOLIA_API_KEY = '9ba6d38841279d113bbe8060bc36a4f5';
    const searchClient = algoliasearch('JF607WAX4U', '9ba6d38841279d113bbe8060bc36a4f5');
    //const placesIndex = searchClient.initPlaces();


    const convertLocationToCoordinates = async () => {
        const apiKey = '8177afded48b4b94bc3111b0c96b379b';
        const locationQuery = encodeURIComponent(location);

        try {
            const response = await fetch(`https://api.opencagedata.com/geocode/v1/json?q=${locationQuery}&key=${apiKey}`);
            const data = await response.json();
            if (data.results.length > 0) {
                const { lat, lng } = data.results[0].geometry;
                setCoordinates({ latitude: lat, longitude: lng });
            } else {
                setCoordinates(null);
            }
        } catch (error) {
            console.error('Error converting location to coordinates:', error);
            setCoordinates(null);
        }
    };

    const sendDataToServer = async () => {
        if (coordinates) {
            try {
                const response = await axios.post('/updateLocationData', {
                    email: getEmail,
                    latitude: coordinates.latitude,
                    longitude: coordinates.longitude,
                });
                console.log(response.data);
            } catch (error) {
                console.error('Error sending data to the server:', error);
            }
        }
    };

    const openInGoogleMaps = () => {
        const mapsUrl = `https://www.google.com/maps?q=${coordinates.latitude},${coordinates.longitude}`;
        window.open(mapsUrl, '_blank');
    };

    const handleLocationInput = async (e) => {
        const inputLocation = e.target.value;
        setLocation(inputLocation);

        if (inputLocation.length > 2) {
            try {
                const placesIndex = searchClient.initIndex('places');
                const { hits } = await placesIndex.search(inputLocation);
                setSuggestions(hits);
            } catch (error) {
                console.error('Error fetching location suggestions:', error);
            }
        } else {
            setSuggestions([]);
        }
    };

    return (
        <div className="locationContainer">
          <div className="container">
            <input
              type="text"
              placeholder="Enter location"
              value={location}
              onChange={handleLocationInput}
              className="mapvalueb     "
            />
            <ul>
              {suggestions.map((suggestion) => (
                <li
                  key={suggestion.objectID}
                  onClick={() => {
                    setLocation(suggestion.locale_names[0]);
                    setSuggestions([]);
                  }}
                >
                  {suggestion.locale_names[0]}
                </li>
              ))}
            </ul>
            <button onClick={convertLocationToCoordinates} className="btn-primary">Convert</button>
            {coordinates && (
              <p>
                Coordinates: Latitude {coordinates.latitude}, Longitude {coordinates.longitude}
              </p>
            )}
            <div>
              <button onClick={sendDataToServer} className="btn-primary">
                Save
              </button>
            </div>
            <div>
              <button onClick={openInGoogleMaps} className="btn-primary">
                Open  in  Maps
              </button>
            </div>
          </div>
        </div>
      );
};
export default Location;