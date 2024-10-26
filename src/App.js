// src/App.js
import React, { useState } from 'react';
import MapComponent from './components/MapComponent';
import SidebarContainer from './components/SidebarContainer';
import spots from './components/MarkerInfo.json'; // Sample data file with spot information
import './styles/primarySidebar.css';
import './styles/detailedSidebar.css';

function App() {
    const [highlightedSpotId, setHighlightedSpotId] = useState(null);

    const handleSelectSpot = (spotId) => {
        setHighlightedSpotId(spotId); // Highlight the selected spot marker
    };

    const handleCloseDetailView = () => {
        setHighlightedSpotId(null); // Reset highlighting when closing detail view
    };

    return (
        <div className="App">
            <MapComponent highlightedSpotId={highlightedSpotId} />
            <SidebarContainer
                spots={spots}
                onSelectSpot={handleSelectSpot}
                highlightedSpotId={highlightedSpotId}
                onCloseDetailView={handleCloseDetailView}
            />
        </div>
    );
}

export default App;
