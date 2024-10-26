// src/components/MapComponent.js
import React, { useState, useEffect } from 'react';
import { GoogleMap, LoadScript, Marker } from '@react-google-maps/api';

const containerStyle = {
    width: '100%',
    height: '500px'
};

// Default center location
const center = {
    lat: 40.42813,
    lng: -86.9212
};

// Hardcoded blue markers for testing
const hardcodedSpots = [
    { id: 1, lat: 40.428884, lng: -86.913258 },   // Location 1
    { id: 2, lat: 40.427229, lng: -86.919500 }    // Location 2 (slightly different)
];

const MapComponent = () => {
    const [userLocation, setUserLocation] = useState(null);

    useEffect(() => {
        navigator.geolocation.getCurrentPosition(
            (position) => {
                setUserLocation({
                    lat: position.coords.latitude,
                    lng: position.coords.longitude,
                });
            },
            () => alert('Location access denied.')
        );
    }, []);

    return (
        <LoadScript googleMapsApiKey="AIzaSyBAM7E8FJwP5mvq5o5Pk2vWxzPQzm2BTb4">
            <GoogleMap
                mapContainerStyle={containerStyle}
                center={userLocation || center}
                zoom={15}
            >
                {/* Hardcoded blue markers */}
                {hardcodedSpots.map((spot) => (
                    <Marker
                        key={spot.id}
                        position={{ lat: spot.lat, lng: spot.lng }}
                        icon={{
                            url: 'http://maps.google.com/mapfiles/ms/icons/blue-dot.png' // Blue dot icon
                        }}
                    />
                ))}
                {/* Red marker for user location */}
                {userLocation && (
                    <Marker
                        position={userLocation}
                        icon={{
                            url: 'http://maps.google.com/mapfiles/ms/icons/red-dot.png' // Red dot icon
                        }}
                    />
                )}
            </GoogleMap>
        </LoadScript>
    );
};

export default MapComponent;
