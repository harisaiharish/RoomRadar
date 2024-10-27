// src/App.js
import React, { useState, useEffect } from 'react';
import MapComponent from './components/MapComponent';
import SidebarContainer from './components/SidebarContainer';
import spots from './components/MarkerInfo.json';
import { getWalkingTimes } from './utils/WalkingTimes';
import rankingComparator from './utils/rankingComparator';
import './styles/primarySidebar.css';
import './styles/detailedSidebar.css';

function App() {
    const [highlightedSpotId, setHighlightedSpotId] = useState(null);
    const [orderedSpots, setOrderedSpots] = useState([]);
    const [userLocation, setUserLocation] = useState(null);

    useEffect(() => {
        navigator.geolocation.getCurrentPosition(
            async (position) => {
                const userLocation = {
                    lat: position.coords.latitude,
                    lng: position.coords.longitude,
                };
                setUserLocation(userLocation);

                // Get spots with walking times and sort them
                const spotsWithTimes = await getWalkingTimes(userLocation, spots);
                const sortedSpots = spotsWithTimes.sort(rankingComparator); 
                //Akkshay this is call to ur function
                setOrderedSpots(sortedSpots);
            },
            () => alert('Location access denied.')
        );
    }, []);

    return (
        <div className="App">
            {userLocation && (
                <>
                    <MapComponent
                        highlightedSpotId={highlightedSpotId}
                        setHighlightedSpotId={setHighlightedSpotId}
                    />
                    <SidebarContainer
                        spots={orderedSpots} // Using the ordered spots here
                        highlightedSpotId={highlightedSpotId}
                        setHighlightedSpotId={setHighlightedSpotId}
                    />
                </>
            )}
        </div>
    );
}

export default App;
