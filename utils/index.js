const apiKey = process.env.NEXT_PUBLIC_GOOGLE_MAP_API_KEY
const mapID = process.env.NEXT_PUBLIC_GOOGLE_MAP_ID
// console.log(`apiKey: ${apiKey}, mapID: ${mapID}`)

const bostonNeighborhoodDatasetID = "7496f418-c5bf-47ef-a33d-0df81d111800"

const defaultCenter = {
    lat: 42.339077666543396,
    lng: -71.10319912623676,
    address: 'Harvard Medical School, Shattuck Street, Boston',
}

const defaultZoom = 13;

const distance = {
    close: 1000,
    medium: 3000,
    far: 5000,
}

const iconURLs = {
    office: 'https://developers.google.com/maps/documentation/javascript/examples/full/images/beachflag.png',
    apartmentCandidate: 'http://maps.gstatic.com/mapfiles/ms2/micons/blue-pushpin.png',
    searchedPosition: 'http://maps.google.com/mapfiles/kml/pal3/icon56.png'
}

const apis = {
    apartment: 'api/apartment'
}

// the two clicks of a double click should be within 300ms
const doubleClickThreshold = 1500; // ms

// https://medium.com/trabe/prevent-click-events-on-double-click-with-react-with-and-without-hooks-6bf3697abc40
// https://medium.com/trabe/preventing-click-events-on-double-click-with-react-the-performant-way-1416ab03b835

// FIX: clearTimeout not working
const cancellablePromise = promise => {
    let isCanceled = false;

    const wrappedPromise = new Promise((resolve, reject) => {
        promise.then(
            value => (isCanceled ? reject({ isCanceled, value }) : resolve(value)),
            error => reject({ isCanceled, error }),
        );
    });

    return {
        promise: wrappedPromise,
        cancel: () => (isCanceled = true),
    };
};

const delay = n => new Promise(resolve => setTimeout(resolve, n));

export { apiKey, mapID, bostonNeighborhoodDatasetID, defaultCenter, defaultZoom, distance, iconURLs, apis, doubleClickThreshold, cancellablePromise, delay }