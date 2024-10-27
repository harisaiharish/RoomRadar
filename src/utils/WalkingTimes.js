// Assuming you've included the Google Maps JavaScript API script
import { loadScript } from '@react-google-maps/api';

export async function getWalkingTimes(userLocation, spots) {
  await loadScript({
    googleMapsApiKey: YOUR_API_KEY,
  });

  const destinations = spots.map((spot) => ({ lat: spot.lat, lng: spot.lng }));
  const service = new google.maps.DistanceMatrixService();

  try {
    const response = await new Promise((resolve, reject) => {
      service.getDistanceMatrix({
        origins: [userLocation],
        destinations,
        travelMode: 'WALKING',
      }, (response, status) => {
        if (status === 'OK') {
          resolve(response);
        } else {
          reject(new Error(`Error with Distance Matrix API: ${status}`));
        }
      });
    });

    if (response.status === 'OK') {
      const spotsWithTimes = spots.map((spot, index) => ({
        ...spot,
        time: response.rows[0].elements[index].status === 'OK'
          ? response.rows[0].elements[index].duration.value / 60 // Convert seconds to minutes
          : Infinity,
      }));
      return spotsWithTimes;
    } else {
      throw new Error(`Error with Distance Matrix API: ${response.status}`);
    }
  } catch (error) {
    // Handle errors appropriately, e.g., console.error or display user-friendly message
    throw error;
  }
}