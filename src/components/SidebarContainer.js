// src/components/SidebarContainer.js
import React, { useEffect } from 'react';
import PrimarySidebar from './PrimarySidebar';
import DetailedSidebar from './DetailedSidebar';

const SidebarContainer = ({ spots, highlightedSpotId, setHighlightedSpotId }) => {
    const selectedSpot = spots.find((spot) => spot.id === highlightedSpotId);

    useEffect(() => {
        console.log("SidebarContainer received highlightedSpotId:", highlightedSpotId);
    }, [highlightedSpotId]);

    const handleSpotClick = (spot) => {
        setHighlightedSpotId(spot.id); // Sync with MapComponent
    };

    const handleCloseDetailView = () => {
        setHighlightedSpotId(null); // Reset when closing the detailed view
    };

    return (
        <div className="sidebar-container">
            {selectedSpot ? (
                <DetailedSidebar spot={selectedSpot} onClose={handleCloseDetailView} />
            ) : (
                <PrimarySidebar
                    spots={spots}
                    onSpotClick={handleSpotClick}
                    highlightedSpotId={highlightedSpotId}
                />
            )}
        </div>
    );
};

export default SidebarContainer;
