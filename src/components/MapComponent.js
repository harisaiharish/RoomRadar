// src/components/MapComponent.js
import React, { useState, useEffect } from 'react';
import { GoogleMap, LoadScript, Marker } from '@react-google-maps/api';
import Sidebar from './Sidebar';

const containerStyle = {
    width: '100%',
    height: '500px'
};
// ritwik/oj someone do the uiux pls

//default location for now i cba
const center = {
    lat: 40.42813,
    lng: -86.9212
};

// Static data for study spots (to be replaced with MarkerInfo.json later)
const studySpots = [
    { id: 1, title: 'Library', lat: 40.42813, lng: -86.9212, description: 'Quiet study area with WiFi and individual desks.', bookingLink: 'https://example.com/library-booking' },
    { id: 2, title: 'Engineering Building', lat: 40.42685, lng: -86.9200, description: 'Collaborative space for group work, open 24/7.', warning: 'Reservations required for evening hours.' },
];

const MapComponent = () => {
    const [userLocation, setUserLocation] = useState(null);
    const [selectedSpot, setSelectedSpot] = useState(null);

    useEffect(() => {
        // Ask for location permission and update user location
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

    const handleMarkerClick = (spot) => {
        setSelectedSpot(spot);
    };

    return (
        <>
            <LoadScript googleMapsApiKey="AIzaSyBAM7E8FJwP5mvq5o5Pk2vWxzPQzm2BTb4">
                <GoogleMap
                    mapContainerStyle={containerStyle}
                    center={userLocation || center}
                    zoom={15}
                >
                    {userLocation && (
                        <Marker position={userLocation} icon={{ color: 'blue' }} />
                    )}
                    {studySpots.map((spot) => (
                        <Marker
                            key={spot.id}
                            position={{ lat: spot.lat, lng: spot.lng }}
                            onClick={() => handleMarkerClick(spot)}
                        />
                    ))}
                </GoogleMap>
            </LoadScript>
            <Sidebar spot={selectedSpot} />
        </>
    );
};

export default MapComponent;
