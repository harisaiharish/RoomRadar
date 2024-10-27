// src/components/PrimarySidebar.js
import React from "react";
import "../styles/primarySidebar.css";

const PrimarySidebar = ({ spots, onSpotClick, highlightedSpotId }) => {
	return (
		<div className="primary-sidebar">
			<h2>Recommended Study Spots</h2>
			<ul>
				{spots.map((spot) => (
					<li
						key={spot.id}
						className={highlightedSpotId === spot.id ? "highlighted" : ""}
						onClick={() => onSpotClick(spot)}
					>
						<div className="spot-info">
							<div className="spot-details">
								<h3>{spot.title}</h3>
								{/* Whiteboard Availability */}
								<p
									className={`icon-text ${
										spot.hasWhiteBoard ? "available" : "not-available"
									}`}
								>
									<span className="material-icons icon">
										{spot.hasWhiteBoard ? "check_circle" : "cancel"}
									</span>
									Whiteboard
								</p>
								{/* Screen Availability */}
								<p
									className={`icon-text ${
										spot.hasScreen ? "available" : "not-available"
									}`}
								>
									<span className="material-icons icon">
										{spot.hasScreen ? "check_circle" : "cancel"}
									</span>
									Screen
								</p>
							</div>
							<div className="spot-capacity">
								<span className="material-icons user-icon">person</span>
								{spot.capacity === -1 ? "N/A" : spot.capacity}
							</div>
						</div>
					</li>
				))}
			</ul>
		</div>
	);
};
export default PrimarySidebar;
