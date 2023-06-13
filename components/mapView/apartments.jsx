import { useState, useEffect } from 'react';
import { Marker, DistanceMatrixService } from '@react-google-maps/api';

import { iconURLs, apis, doubleClickThreshold, cancellablePromise, delay } from '../../utils';

export default function Apartments({ destination, setOriginPosition, planRoutes, trigger, updateTrigger, setFetchedDirections }) {
    const cb = (result, status) => {
        console.log(result, status)
    }

    const [apartments, setApartments] = useState([])
    useEffect(() => {
        // console.log(window.location.host, window.location.hostname, window.location.href, window.location.origin)
        fetch(apis.apartment)
            .then(res => res.json())
            .then(data => {
                setApartments(data.map(apartment => ({ ...apartment, visible: true })))
            })
            .catch(err => {
                console.log(err)
            })
    }, [trigger])

    const origins = aggregateApartmentCoordinates(apartments)

    const distanceMatrixRequest = {
        travelMode: google.maps.TravelMode.TRANSIT,
        unitSystem: google.maps.UnitSystem.METRIC,
        origins,
        destinations: [destination],
    }

    let clickTimer
    // save location
    const handleDbClick = e => {
        // console.log('dbclick')
        clearTimeout(clickTimer)
        // console.log('click', e, e.domEvent.type, e.latLng.lat(), e.latLng.lng())
        const { address, lat, lng } = apartments.find(apartment => apartment.lat === e.latLng.lat() && apartment.lng === e.latLng.lng())
        // POST to server
        fetch(apis.apartment, {
            method: 'POST',
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ address, lat, lng })
        })
            .then(res => res.json())
            .then(data => {
                // console.log(data, typeof data)
                updateTrigger()
                if (data.includes("remove")) {
                    // don't render direction
                    setFetchedDirections(null)
                }
            })
            .catch(err => {
                console.log(`save apartment error: ${err.message}`)
            })
    }

    // show direction
    const handleClick = e => {
        // console.log('click')
        clickTimer = setTimeout(() => {

            // console.log('click', e, e.domEvent.type, e.latLng.lat(), e.latLng.lng())
            setOriginPosition({ lat: e.latLng.lat(), lng: e.latLng.lng() })
            planRoutes()

        }, doubleClickThreshold)
        e.stop()
    }

    return (
        <>
            {
                apartments.map(({ lat, lng, address, visible, justSaved }) => {
                    return (
                        <Marker
                            key={`${lat}, ${lng}`
                            }
                            position={{ lat: lat, lng: lng }}
                            icon={iconURLs.apartmentCandidate}
                            onClick={handleClick}
                            onDblClick={handleDbClick}
                            title={address}
                            visible={visible}
                            label={justSaved ? 'just saved' : ''}
                        />
                    )
                })

            }

            {
                false && <DistanceMatrixService
                    options={distanceMatrixRequest}
                    callback={cb}
                />
            }

        </>
    )
}

const aggregateApartmentCoordinates = (apartments) => {
    return apartments.map(apartment => {
        return { lat: apartment.lat, lng: apartment.lng }
    })
}
