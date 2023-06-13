import { useState } from 'react';

import Controls from './controls/index';
import MapView from './mapView';

import styles from '../styles/Map.module.css';

export default function Map() {
    const [originPosition, setOriginPosition] = useState()
    const [neighborhoodData, setNeighborhoodData] = useState()
    const [directions, setDirections] = useState()
    const [routeIndex, setRouteIndex] = useState(0)

    return (
        <div className={styles.container}>
            <Controls
                setOriginPosition={setOriginPosition}
                neighborhoodData={neighborhoodData}
                directions={directions}
                setRouteIndex={setRouteIndex}
            />

            <MapView
                setNeighborhoodData={setNeighborhoodData}
                originPosition={originPosition}
                setOriginPosition={setOriginPosition}
                setDirections={setDirections}
                routeIndex={routeIndex}
            />
        </div >
    )
}