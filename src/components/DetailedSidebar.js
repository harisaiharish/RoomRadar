// src/components/DetailedSidebar.js
import React, { useState, useEffect } from "react";
import "../styles/detailedSidebar.css";

const DetailedSidebar = ({ spot, onClose }) => {
	const [userLocation, setUserLocation] = useState(null);

	useEffect(() => {
		// Get the user's current location
		navigator.geolocation.getCurrentPosition(
			(position) => {
				const location = {
					lat: position.coords.latitude,
					lng: position.coords.longitude,
				};
				setUserLocation(location);
			},
			() => alert("Location access denied.")
		);
	}, []);

	const googleMapsUrl = userLocation
		? `https://www.google.com/maps/dir/?api=1&origin=${userLocation.lat},${userLocation.lng}&destination=${spot.lat},${spot.lng}`
		: "#";

	return (
		<div className="detailed-sidebar">
			<button className="back-button" onClick={onClose}>
				← Back
			</button>
			<h2>{spot.title}</h2>
			<p>{spot.description}</p>

			{/* New image element */}
			{spot.imgsrc && (
				<img src={spot.imgsrc} alt={spot.title} className="spot-image" />
			)}
			{spot.bookingLink ? (
				<div className="button-container">
					<a href={spot.bookingLink} target="_blank" rel="noopener noreferrer">
						Book Now
					</a>
				</div>
			) : (
				<p className="warning">{spot.warning}</p>
			)}
			{/* New button to Google Maps - displays regardless of booking link */}
			{userLocation && (
				<a
					href={googleMapsUrl}
					target="_blank"
					rel="noopener noreferrer"
					className="map-button"
				>
					Start Journey
				</a>
			)}
			<p classname="eta">{spot.time && <p classname="eta">ETA: {spot.time} mins</p>}</p>
			{spot.graph ? (
				<img src={spot.graph} alt={spot.title} className="spot-graph" />
			) : (
				<p></p>
			)}
		</div>
	);
};

export default DetailedSidebar;
