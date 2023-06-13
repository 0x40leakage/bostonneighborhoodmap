import { DirectionsService } from '@react-google-maps/api';

export default function Directions({ origin, destination, setFetchedDirections, routeServiceFinished, setRouteServiceFinished, setDirectionsProp }) {
    // TODO: custom transit time
    const directionRequest = {
        travelMode: google.maps.TravelMode.TRANSIT,
        unitSystem: google.maps.UnitSystem.METRIC,
        origin,
        destination,
        provideRouteAlternatives: true
    }

    const cb = (result, status) => {
        // console.log(result, status)
        if (status === google.maps.DirectionsStatus.OK && result) {
            setFetchedDirections(result)
            setDirectionsProp(result)
            setRouteServiceFinished(true)
        } else {
            console.log(`Error fetching directions, status: ${status}`)
        }
    }

    /*  const handleDirectionsLoaded = directionService => {
         console.log(directionService)
     } */

    return (
        !routeServiceFinished ?
            <DirectionsService
                options={directionRequest}
                callback={(directionResult, directionStatus) => cb(directionResult, directionStatus)}
            // onLoad={handleDirectionsLoaded}
            />
            : null
    )
}
