"use client";

import React from 'react'
import { GoogleMap, useJsApiLoader, MarkerF } from '@react-google-maps/api';
import { Button } from '@mui/material';


const containerStyle = {
  width: '35vw',
  height: '80vh'
};


type MapProps = {
  location: string;
  setLoca: (location: string) => void;
  saveLoca: (location: string) => Promise<void>;
};

// const center = {
//   lat: 23.97555, lng: 120.97361
// };

function MapComponent({ location, setLoca, saveLoca }: MapProps) {
  const { isLoaded } = useJsApiLoader({
    id: 'dfb0ed321bfd06d3',
    googleMapsApiKey: "AIzaSyAQmlApIesOpt3qQJ6FvX4HqvTtbp8QH3k"
  })

  const latlngArr = location.split("/").map(Number);
  const center = {lat: latlngArr[0], lng: latlngArr[1]};
  
  const [oldLoca, setOldLoca] = React.useState(location);
  // const center = {
  //   lat: location.lat, lng: location.lng
  // }



// eslint-disable-next-line
  const [map, setMap] = React.useState(null);

  const onLoad = React.useCallback(function callback(map) {
    // This is just an example of getting and using the map instance!!! don't just blindly copy!
    // const bounds = new window.google.maps.LatLngBounds(center);
    // map.fitBounds(bounds);

    setMap(map)
  }, [])

// eslint-disable-next-line
  const onUnmount = React.useCallback(function callback(map) {
    setMap(null)
    // console.log(map);
  }, [])


  async function handleClick(){
    setOldLoca(location);
    await saveLoca(location);
  }

  function MarkerFinishDrag(event){
    const coordArray = [event.latLng.lat(), event.latLng.lng()]
    setLoca(coordArray.join("/"));
  }


  return isLoaded ? (
    <>
      <div className='flex flex-col'>
        <GoogleMap
          mapContainerStyle={containerStyle}
          center={center}
          zoom={7}
          onLoad={onLoad}
          onUnmount={onUnmount}
          mapContainerClassName='rounded-xl'
        >
          <MarkerF
            position={center}
            draggable={true}
            onDragEnd={MarkerFinishDrag}
          />
        </GoogleMap>

        <Button
          onClick={() => {
            handleClick();
          }}
          variant="outlined"
          className={`mt-2 ${(oldLoca !== location) ? "bg-#88c7f7" : ""}`}
          disabled={oldLoca === location}
        >
          save as main location
        </Button>
      </div>
    </>
  ) : <></>
}

export default MapComponent