import { useState, useEffect, useCallback, useMemo, useRef } from 'react';
import { GoogleMap, Marker, TransitLayer } from '@react-google-maps/api';

import Center from './center';
import RouteService from './routeService';
import Apartments from './apartments';

import styles from '../../styles/MapView.module.css';

import { mapID, bostonNeighborhoodDatasetID, defaultCenter, defaultZoom, iconURLs } from '../../utils';

export default function MapView({ originPosition, setOriginPosition, setNeighborhoodData, setDirections, routeIndex }) {
    const [routeServiceFinished, setRouteServiceFinished] = useState(false)
    const [routeServiceEnabled, setRouteServiceEnabled] = useState(false)

    const handleMapLoaded = useCallback(map => {
        mapRef.current = map
        addBoundaryLayer(map, setNeighborhoodData)
    }, [])

    const mapRef = useRef()
    const office = useMemo(() => defaultCenter.coordinate, [])
    const options = useMemo(
        () => ({
            mapId: mapID,
            // disableDefaultUI: true,
            // clickableIcons: false,
        }),
        []
    )

    useEffect(() => {
        if (originPosition) {
            mapRef.current.panTo(originPosition)
        }
    }, [originPosition])

    const planRoutes = () => {
        setRouteServiceFinished(false) // reset

        setRouteServiceEnabled(true)
    }

    return (
        <div className={styles["map-container"]}>
            <GoogleMap
                onLoad={handleMapLoaded}
                mapContainerClassName={styles.map}
                center={office}
                zoom={defaultZoom}
                options={options}
            >
                {/* mark searched position on the map */}
                {originPosition && <Marker
                    position={originPosition}
                    icon={iconURLs.searchedPosition}
                    onClick={planRoutes}
                />}

                {routeServiceEnabled && <RouteService
                    origin={originPosition}
                    destination={office}
                    routeServiceFinished={routeServiceFinished}
                    setRouteServiceFinished={setRouteServiceFinished}
                    setDirections={setDirections}
                    routeIndex={routeIndex}
                />}

                <Apartments
                    destination={office}
                    setOriginPosition={setOriginPosition}
                />

                <Center center={office} />

                <TransitLayer />
            </GoogleMap>
        </div>
    )
}

const addBoundaryLayer = (map, setNeighborhoodData) => {
    if (!map.getMapCapabilities().isDataDrivenStylingAvailable) {
        console.log("Data-driven styling is not available.")
        return
    }

    // https://developers.google.com/maps/documentation/javascript/reference/map#Map.getDatasetFeatureLayer
    // !!! getDatasetFeatureLayer is Available only in the v=beta channel
    const bostonNeighborhoodLayer = map.getDatasetFeatureLayer(bostonNeighborhoodDatasetID)
    bostonNeighborhoodLayer.style = (params) => {
        // OBJECTID: 27-52 (26 neighborhoods)
        return {
            fillColor: convertNumberToColor(params.feature.datasetAttributes.OBJECTID),
            fillOpacity: 0.5,
            strokeColor: 'green',
            strokeOpacity: 1.0,
            strokeWeight: 0.75
        }
    }
    bostonNeighborhoodLayer.addListener('click', (e) => {
        // FIX: new object, render everytime
        setNeighborhoodData({
            name: e.features[0].datasetAttributes.Name
        })

    })
    console.log("add click listener to neighborhood layer")

    // const featureLayer = map.getFeatureLayer(window.google.maps.FeatureType.ADMINISTRATIVE_AREA_LEVEL_1)
    // featureLayer.style = () => {
    //     return {
    //         fillColor: '#ccedc5',
    //         fillOpacity: 0.5,
    //         strokeColor: 'green',
    //         strokeOpacity: 1.0,
    //         strokeWeight: 0.75
    //     }
    // }
}

const convertNumberToColor = id => {
    return neighborhoodColors[id % neighborhoodColors.length]
}

// 26
const neighborhoodColors = [
    "#FFC0CB",
    "#FFA07A",
    "#FFD700",
    "#ADFF2F",
    "#7FFF00",
    "#00FF00",
    "#00FA9A",
    "#00FFFF",
    "#1E90FF",
    "#0000FF",
    "#8A2BE2",
    "#EE82EE",
    "#FF69B4",
    "#FF1493",
    "#CD5C5C",
    "#F08080",
    "#FA8072",
    "#B22222",
    "#800000",
    "#808000",
    "#556B2F",
    "#6B8E23",
    "#008080",
    "#2F4F4F",
    "#696969",
]