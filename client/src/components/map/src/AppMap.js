import React from 'react';
import { Route, Switch } from "react-router-dom";
import LandingPage from "./views/LandingPage";
import ITry from "./views/ITry";
import { useLocation, useState } from "react-router";
import {
  useLoadScript,
  Marker,
  GoogleMap
} from '@react-google-maps/api'
import GoogleMapReact from 'google-map-react';

import "./index.css"

function AppMap() {
  const location = useLocation();
    let locationId = location.state.location
    console.log(locationId)
    // googleMapURL="https://maps.googleapis.com/maps/api/js?key=AIzaSyALVjLwOIM1gf7EzdJJVmWLKdLP-yZGTcw&libraries=places"

    const { isLoaded } = useLoadScript({googleMapsApiKey: "AIzaSyDokhWHEeqZfrBHeQ18lQl5B2xvFlp55S4"})
    if(!isLoaded) return <div>Loading. . . </div>
    else return <Map/>
  // return (
  //     <ITry location={locationId} />
  // );
  //41bdf946490318959d10164b83f6cade
}

function Map(){

  const center = {lat: 49.988358, lng: 36.232845}
  const defaultProps = {
    center: {
      lat: 10.99835602,
      lng: 77.01502627
    },
    zoom: 11
  };
  const AnyReactComponent = ({ text }) => <div>{text}</div>;
  // googleMapURL="https://maps.googleapis.com/maps/api/js?key=AIzaSyALVjLwOIM1gf7EzdJJVmWLKdLP-yZGTcw&libraries=places"
  return <GoogleMap 
          zoom={10} 
          center={center} 
          mapContainerClassName='.map-container'
          
          // mapContainerClassName={map-container }
          >
              <Marker position={center}/>
          </GoogleMap>
  
}

export default AppMap;
