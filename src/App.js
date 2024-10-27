// src/App.js
import React, { useState } from "react";
import MapComponent from "./components/MapComponent";
import SidebarContainer from "./components/SidebarContainer";
import spots from "./components/MarkerInfo.json";
import "./styles/primarySidebar.css";
import "./styles/detailedSidebar.css";

function App() {
	const [highlightedSpotId, setHighlightedSpotId] = useState(null);

	// Define rankingComparator directly in App.js
	const rankingComparator = (marker1, marker2) => {
		if (
			marker1.time / marker2.time <= Math.log(marker1.quality) / Math.log(marker2.quality) ||
			marker1.time - marker2.time <= 6 * (marker1.quality - marker2.quality)
		) {
			return -1;
		} else {
			return 1;
		}
	};

	// Sort spots using the in-app rankingComparator
	const sorted = spots.sort((a, b) => rankingComparator(a, b));

	return (
		<div className="App">
			<MapComponent
				highlightedSpotId={highlightedSpotId}
				setHighlightedSpotId={setHighlightedSpotId} // Pass setter directly
			/>
			<SidebarContainer
				spots={sorted}
				highlightedSpotId={highlightedSpotId}
				setHighlightedSpotId={setHighlightedSpotId} // Pass setter directly
			/>
		</div>
	);
}

export default App;
