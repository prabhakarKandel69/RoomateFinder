import React, { useState, useEffect } from "react";

function LocationComponent() {
  const [location, setLocation] = useState({
    latitude: null,
    longitude: null,
    accuracy: null,
  });
  const [error, setError] = useState("");

  // Function to request and update the location
  const updateLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude, accuracy } = position.coords;
          const userLocation = { latitude, longitude, accuracy };
          setLocation(userLocation);
          // Save location for future use
          localStorage.setItem("userLocation", JSON.stringify(userLocation));
          setError("");
        },
        (err) => {
          setError("Permission denied or unable to fetch location.");
        }
      );
    } else {
      setError("Geolocation is not supported by this browser.");
    }
  };

  // Request location on component mount
  useEffect(() => {
    updateLocation();
  }, []);

  return (
    <div style={{ padding: "20px", textAlign: "center" }}>
      <h2>User Location</h2>
      {location.latitude && location.longitude ? (
        <div>
          <p>Latitude: {location.latitude}</p>
          <p>Longitude: {location.longitude}</p>
          <p>Accuracy: {location.accuracy} meters</p>
        </div>
      ) : (
        <p>Fetching location...</p>
      )}
      <button onClick={updateLocation}>Update Location</button>
      {error && <p style={{ color: "red" }}>{error}</p>}
    </div>
  );
}

export default LocationComponent;
