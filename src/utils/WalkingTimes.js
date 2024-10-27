// src/utils/WalkingTimes.js
import { DistanceMatrixService } from '@react-google-maps/api';

export async function getWalkingTimes(userLocation, spots) {
    const destinations = spots.map((spot) => ({ lat: spot.lat, lng: spot.lng }));
    const service = new DistanceMatrixService();

    return new Promise((resolve, reject) => {
        service.getDistanceMatrix(
            {
                origins: [userLocation],
                destinations,
                travelMode: 'WALKING',
            },
            (response, status) => {
                if (status === 'OK') {
                    const spotsWithTimes = spots.map((spot, index) => ({
                        ...spot,
                        time: response.rows[0].elements[index].status === 'OK'
                            ? response.rows[0].elements[index].duration.value / 60 // Convert seconds to minutes
                            : Infinity,
                    }));
                    resolve(spotsWithTimes);
                } else {
                    reject(`Error with Distance Matrix API: ${status}`);
                }
            }
        );
    });
}
