/** This file contains the map elements we will render for the webpages */
import React, { useState } from 'react';
import {
  GoogleMap,
  withScriptjs,
  withGoogleMap,
  Marker,
  InfoWindow
} from 'react-google-maps';

const CustomMap = function(props) {
  const [selectedLandmark, setSelectedLandmark] = useState(null);
  return (
    <GoogleMap defaultCenter={props.center} defaultZoom={props.zoom}>
      {props.markers.keys.map(id => (
        <Marker
          key={props.markers[id].name}
          position={props.markers[id].coord}
          title={props.markers[id].name}
          onClick={() => {
            setSelectedLandmark(props.markers[id]);
          }}
        />
      ))}
      {selectedLandmark && (
        <InfoWindow
          position={selectedLandmark.coord}
          onCloseClick={() => {
            setSelectedLandmark(null);
          }}>
          <div>
            <h2>{selectedLandmark.name}</h2>
            <p>{selectedLandmark.description}</p>
          </div>
        </InfoWindow>
      )}
    </GoogleMap>
  );
};

export default withScriptjs(withGoogleMap(CustomMap));
