const apiKey = process.env.NEXT_PUBLIC_GOOGLE_MAP_API_KEY
const mapID = process.env.NEXT_PUBLIC_GOOGLE_MAP_ID
// console.log(`apiKey: ${apiKey}, mapID: ${mapID}`)

const bostonNeighborhoodDatasetID = "7496f418-c5bf-47ef-a33d-0df81d111800"

const defaultCenter = {
    coordinate: {
        lat: 42.339077666543396,
        lng: -71.10319912623676,
    },
    name: 'Harvard Medical School',
    cnName: '哈佛医学院',
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

export { apiKey, mapID, bostonNeighborhoodDatasetID, defaultCenter, defaultZoom, distance, iconURLs, apis }