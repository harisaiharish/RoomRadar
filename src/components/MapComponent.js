// src/components/MapComponent.js
import React, { useState, useEffect } from 'react';
import { GoogleMap, LoadScript, Marker } from '@react-google-maps/api';
import spots from './MarkerInfo.json';

const containerStyle = {
    width: '100%',
    height: '500px'
};

const center = {
    lat: 40.42813,
    lng: -86.9212
};

const MapComponent = ({ highlightedSpotId, setHighlightedSpotId }) => {
    const [userLocation, setUserLocation] = useState(null);
    const [hoveredSpotId, setHoveredSpotId] = useState(null);

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

    const handleMarkerClick = (spotId) => {
        setHighlightedSpotId((prevId) => (prevId === spotId ? null : spotId)); // Sync with App.js
    };

    return (
        <>
            <LoadScript googleMapsApiKey="AIzaSyBAM7E8FJwP5mvq5o5Pk2vWxzPQzm2BTb4">
                <GoogleMap
                    mapContainerStyle={containerStyle}
                    center={userLocation || center}
                    zoom={15}
                >
                    {spots.map((spot) => (
                        <Marker
                            key={spot.id}
                            position={{ lat: spot.lat, lng: spot.lng }}
                            onClick={() => handleMarkerClick(spot.id)}
                            onMouseOver={() => setHoveredSpotId(spot.id)}
                            onMouseOut={() => setHoveredSpotId(null)}
                            icon={{
                                url: highlightedSpotId === spot.id
                                    ? 'http://maps.google.com/mapfiles/ms/icons/green-dot.png'
                                    : 'http://maps.google.com/mapfiles/ms/icons/blue-dot.png',
                                scaledSize: (hoveredSpotId === spot.id || highlightedSpotId === spot.id)
                                    ? new window.google.maps.Size(35, 35)
                                    : new window.google.maps.Size(25, 25)
                            }}
                        />
                    ))}

                    {userLocation && (
                        <Marker
                            position={userLocation}
                            icon={{ url: 'http://maps.google.com/mapfiles/ms/icons/red-dot.png' }}
                        />
                    )}
                </GoogleMap>
            </LoadScript>
        </>
    );
};

export default MapComponent;
