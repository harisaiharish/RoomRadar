// src/App.js
import React, { useState } from 'react';
import MapComponent from './components/MapComponent';

function App() {
    const [showMap, setShowMap] = useState(false);

    return (
        <div className="App" style={{ textAlign: 'center', paddingTop: '20px' }}>
            <h1>Welcome to RoomRadar</h1>
            <p>If you see this message, the app is loading correctly.</p>

            <button onClick={() => setShowMap(!showMap)}>
                {showMap ? 'Hide Map' : 'Show Map'}
            </button>

            {showMap && <MapComponent />}
        </div>
    );
}

export default App;
