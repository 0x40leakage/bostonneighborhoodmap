import { useState, useEffect } from 'react';
import { Marker, DistanceMatrixService } from '@react-google-maps/api';

import { iconURLs, apis } from '../../utils';

export default function Apartments({ destination, setOriginPosition }) {
    const cb = (result, status) => {
        console.log(result, status)
    }

    const [apartments, setApartments] = useState([])
    useEffect(() => {
        console.log(window.location.host, window.location.hostname, window.location.href, window.location.origin)
        fetch(apis.apartment)
            .then(res => res.json())
            .then(data => {
                setApartments(data)
            })
            .catch(err => {
                console.log(err)
            })
    }, [])

    const origins = aggregateApartmentCoordinates(apartments)

    const distanceMatrixRequest = {
        travelMode: google.maps.TravelMode.TRANSIT,
        unitSystem: google.maps.UnitSystem.METRIC,
        origins,
        destinations: [destination],
    }

    return (
        <>
            {
                apartments.map(apartment => {
                    return (
                        <Marker
                            key={`${apartment.lat}, ${apartment.lng}`}
                            position={{ lat: apartment.lat, lng: apartment.lng }}
                            icon={iconURLs.apartmentCandidate}
                        />
                    )
                })

            }

            {false && <DistanceMatrixService
                options={distanceMatrixRequest}
                callback={cb}
            />}

        </>
    )
}

const aggregateApartmentCoordinates = (apartments) => {
    return apartments.map(apartment => {
        return { lat: apartment.lat, lng: apartment.lng }
    })
}