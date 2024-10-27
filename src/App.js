// src/App.js
import React, { useState } from 'react';
import MapComponent from './components/MapComponent';
import SidebarContainer from './components/SidebarContainer';
import spots from './components/MarkerInfo.json';
import './styles/primarySidebar.css';
import './styles/detailedSidebar.css';

function App() {
    const [highlightedSpotId, setHighlightedSpotId] = useState(null);

    return (
        <div className="App">
            <MapComponent
                highlightedSpotId={highlightedSpotId}
                setHighlightedSpotId={setHighlightedSpotId} // Pass setter directly
            />
            <SidebarContainer
                spots={spots}
                highlightedSpotId={highlightedSpotId}
                setHighlightedSpotId={setHighlightedSpotId} // Pass setter directly
            />
        </div>
    );
}

export default App;
