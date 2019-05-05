import React, { Component } from "react";
import { Map, GoogleApiWrapper, Marker } from "google-maps-react";
import PropTypes from "prop-types";

function MapContainer(props) {
  // eslint-disable-next-line react/prop-types
  const { geopoint, google } = props;
  return (
    <div
      style={{
        width: "100%",
        height: 200,
        position: "relative",
        marginTop: 10
      }}
    >
      <Map
        google={google}
        zoom={16}
        initialCenter={{
          lat: geopoint.lat,
          lng: geopoint.lng
        }}
        center={{
          lat: geopoint.lat,
          lng: geopoint.lng
        }}
      >
        <Marker
          title="The marker`s title will appear as a tooltip."
          name="SOMA"
          position={{ lat: geopoint.lat, lng: geopoint.lng }}
        />
      </Map>
    </div>
  );
}
MapContainer.defaultProps = {
  geopoint: { lat: -32.89, lng: -68.83 }
};
MapContainer.propTypes = {
  geopoint: PropTypes.object
};
export default GoogleApiWrapper({
  apiKey: "AIzaSyBwtMuaAqAeHnd9Oyb4F9Ro1eXpvaSHf_s"
})(MapContainer);
