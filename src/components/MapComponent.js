// src/components/MapComponent.js
import React, { useState, useEffect } from 'react';
import { GoogleMap, LoadScript, Marker } from '@react-google-maps/api';
import spots from './MarkerInfo.json'; // Import the data file
import SidebarContainer from './SidebarContainer'; // Import the sidebar component

const containerStyle = {
    width: '100%',
    height: '500px'
};

// Default center location
const center = {
    lat: 40.42813,
    lng: -86.9212
};

const MapComponent = () => {
    const [userLocation, setUserLocation] = useState(null);
    const [highlightedSpotId, setHighlightedSpotId] = useState(null);
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
        console.log("Marker clicked:", spotId); // Log the clicked marker ID
        setHighlightedSpotId((prevId) => (prevId === spotId ? null : spotId));
        // setHighlightedSpotId(spotId);
    };

    const handleSidebarClose = () => {
        setHighlightedSpotId(null); // Reset marker icon when sidebar is closed
    };

    return (
        <>
            <LoadScript googleMapsApiKey="AIzaSyBAM7E8FJwP5mvq5o5Pk2vWxzPQzm2BTb4">
                <GoogleMap
                    mapContainerStyle={containerStyle}
                    center={userLocation || center}
                    zoom={15}
                >
                    {/* Map markers from MarkerInfo.json */}
                    {spots.map((spot) => (
                        <Marker
                            key={spot.id}
                            position={{ lat: spot.lat, lng: spot.lng }}
                            onClick={() => handleMarkerClick(spot.id)}
                            onMouseOver={() => setHoveredSpotId(spot.id)}
                            onMouseOut={() => setHoveredSpotId(null)}
                            icon={{
                                url: highlightedSpotId === spot.id
                                    ? 'http://maps.google.com/mapfiles/ms/icons/green-dot.png' // Green when selected
                                    : 'http://maps.google.com/mapfiles/ms/icons/blue-dot.png', // Blue by default
                                scaledSize: (hoveredSpotId === spot.id || highlightedSpotId === spot.id)
                                    ? new window.google.maps.Size(35, 35) // Grow on hover or selected
                                    : new window.google.maps.Size(25, 25) // Default size
                            }}
                        />
                    ))}

                    {/* Red marker for user location */}
                    {userLocation && (
                        <Marker
                            position={userLocation}
                            icon={{
                                url: 'http://maps.google.com/mapfiles/ms/icons/red-dot.png'
                            }}
                        />
                    )}
                </GoogleMap>
            </LoadScript>

            {/* Sidebar Container for the primary and detailed sidebars */}
            <SidebarContainer
                spots={spots}
                selectedSpotId={highlightedSpotId}
                onSelectSpot={handleMarkerClick}
                onCloseDetailView={handleSidebarClose}
            />
        </>
    );
};

export default MapComponent;
