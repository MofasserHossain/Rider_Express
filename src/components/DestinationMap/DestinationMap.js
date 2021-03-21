import React from 'react';
import { GoogleMap, LoadScript } from '@react-google-maps/api';

const DestinationMap = () => {
  const mapStyles = {
    height: '100vh',
    width: '100%',
  };

  const defaultCenter = {
    lat: 41.3851,
    lng: 2.1734,
  };
  return (
    <LoadScript googleMapsApiKey="AIzaSyCYllTGDdyrOuGjVjOY6swftkR6m34N1ek">
      <GoogleMap
        mapContainerStyle={mapStyles}
        zoom={13}
        center={defaultCenter}
      />
    </LoadScript>
  );
};
export default DestinationMap;
