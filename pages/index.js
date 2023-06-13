// import Head from 'next/head';
import { useLoadScript } from '@react-google-maps/api';

import Map from '../components/map';
import { apiKey } from '../utils';

export default function Home() {
  const { isLoaded: isGoogleMapScriptLoaded, loadError: loadGoogleMapScriptError } = useLoadScript({
    googleMapsApiKey: apiKey,
    libraries: ['places'],
    version: 'beta'
  })
  if (loadGoogleMapScriptError) {
    console.log(`load Google map script error: ${loadGoogleMapScriptError}`)
    return
  }

  return (
    !isGoogleMapScriptLoaded ? (
      <h1>Loading...</h1>
    ) : (
      <Map />
    )
  );
}
