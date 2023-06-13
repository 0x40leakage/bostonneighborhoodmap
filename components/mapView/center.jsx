import { Marker, Circle } from '@react-google-maps/api';

import { distance, iconURLs } from '../../utils';

const { close, medium, far } = distance

export default function Center({ center }) {
    return (
        <>
            <Marker
                position={center}
                icon={iconURLs.office}
                title={center.address}
            />

            <Circle center={center} radius={close} options={closeCircleOptions} />
            <Circle center={center} radius={medium} options={middleCircleOptions} />
            <Circle center={center} radius={far} options={farCircleOptions} />
        </>
    )
}

const defaultCircleOptions = {
    strokeOpacity: 0.5,
    strokeWeight: 2,
    clickable: false,
    draggable: false,
    editable: false,
    visible: true,
};
const closeCircleOptions = {
    ...defaultCircleOptions,
    zIndex: 3,
    fillOpacity: 0.05,
    strokeColor: "#8BC34A",
    fillColor: "#8BC34A",
};
const middleCircleOptions = {
    ...defaultCircleOptions,
    zIndex: 2,
    fillOpacity: 0.05,
    strokeColor: "#FBC02D",
    fillColor: "#FBC02D",
};
const farCircleOptions = {
    ...defaultCircleOptions,
    zIndex: 1,
    fillOpacity: 0.05,
    strokeColor: "#FF5252",
    fillColor: "#FF5252",
};