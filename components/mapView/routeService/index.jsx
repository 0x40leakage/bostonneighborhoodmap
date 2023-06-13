import { DirectionsRenderer } from '@react-google-maps/api';

import Directions from './directions';

export default function RouteService({ routeServiceFinished, setRouteServiceFinished, origin, destination, setDirections: setDirectionsProp, routeIndex, fetchedDirections, setFetchedDirections }) {
    return (
        <>
            <Directions
                origin={origin}
                destination={destination}
                setFetchedDirections={setFetchedDirections}
                setDirectionsProp={setDirectionsProp}

                routeServiceFinished={routeServiceFinished}
                setRouteServiceFinished={setRouteServiceFinished}
            />

            {
                fetchedDirections && <DirectionsRenderer
                    directions={fetchedDirections}
                    routeIndex={routeIndex}
                    options={{ markerOptions: { visible: false } }}
                />
            }
        </>
    )
}